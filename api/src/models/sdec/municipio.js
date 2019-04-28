// Nota_Pagamento
export default function (sequelize, DataTypes) {
  const municipio = sequelize.define('municipio', {
    codigo_ibge: {
      type: DataTypes.STRING(7),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    underscored: true,
    tableName: 'municipio',
    freezeTableName: true,
    timestamps: false,
  });

  municipio.associate = (models) => {
    municipio.belongsTo(models.estado, { targetKey: 'sigla', foreignKey: { name: 'uf', allowNull: false } });
    municipio.belongsTo(models.regiao, { targetKey: 'regiao_id', foreignKey: { name: 'regiao_id', allowNull: false } });
  };

  return municipio;
}
