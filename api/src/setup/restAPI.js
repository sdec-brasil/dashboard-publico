// Imports
import mapRoutes from 'express-routes-mapper';
import childProcess from 'child_process';

// App Imports
import routes from '../routes';

import { hub, hubMiddleware } from './sseHub';

// Setup RestAPI
export default function (server) {
  console.info('SETUP - RestAPI & Routes...');

  // Get all our routes and pair them with our controllers
  const mappedRoutes = mapRoutes(routes, 'src/controllers/');

  // Subscribe to companies related events
  server.get('/v1/companies/events', hubMiddleware(hub), (req, res) => {
    res.sse.event('company:subscribed', Date.now());
  });

  // Subscribe to invoice related events
  server.get('/v1/invoice/events', hubMiddleware(hub), (req, res) => {
    res.sse.event('invoice:subscribed', Date.now());
  });

  // Simulator for debug
  server.get('/v1/simulator/:time', hubMiddleware(hub), (req, res) => {
    res.sse.event('simulator:started', `${Number(req.params.time) * 60} segundos`);

    let directory = __dirname.split('/');
    directory.splice(-3);
    directory = `${directory.join('/')}/simulator/src/main.js`;
    const simulator = childProcess.fork(directory, [Number(req.params.time)], { stdio: 'pipe' });

    simulator.stdout.on('data', (data) => {
      hub.event('simulator:log', data);
    });
  });

  // Map our rotes to the /v1 endpoint
  server.use('/v1', mappedRoutes);
}
