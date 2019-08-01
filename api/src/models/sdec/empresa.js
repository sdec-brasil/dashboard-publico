// Empresa
export default function (sequelize, DataTypes) {
  const empresa = sequelize.define('empresa', {
    cnpj: {
      type: DataTypes.STRING(14),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    razaoSocial: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false,
    },
    nomeFantasia: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    enderecoEmpresa: {
      type: DataTypes.STRING(125),
      allowNull: false,
    },
    numeroEndereco: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    complementoEndereco: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    bairroEndereco: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    cidadeEndereco: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    unidadeFederacao: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    paisEndereco: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    underscored: false,
    tableName: 'empresa',
    freezeTableName: true,
    timestamps: false,
  });

  empresa.associate = (models) => {
    empresa.belongsToMany(models.emissor, { as: 'Emissores', through: 'emissoresEmpresa' });
    empresa.belongsTo(models.emissor, { targetKey: 'address', foreignKey: { name: 'dono', allowNull: false } });
  };

  return empresa;
}
