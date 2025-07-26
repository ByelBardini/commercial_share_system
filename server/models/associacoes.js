import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Associacao extends Model {}

Associacao.init({
  associacao_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  associacao_cidade_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  associacao_nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  associacao_nome_fantasia: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
  },
  associacao_cnpj: {
    type: DataTypes.STRING(50), 
    allowNull: true,
    defaultValue: null,
  },
  associacao_data_contato: {
    type: DataTypes.DATE, 
    allowNull: true,
    defaultValue: null,
  },
  associacao_data_fechamento: {
    type: DataTypes.DATE, 
    allowNull: true,
    defaultValue: null,
  },
  associacao_preco_instalacao: {
    type: DataTypes.DOUBLE, 
    allowNull: true,
    defaultValue: null,
  },
  associacao_preco_placa: {
    type: DataTypes.DOUBLE, 
    allowNull: true,
    defaultValue: null,
  },
  associacao_observacao: {
    type: DataTypes.TEXT, 
    allowNull: true,
    defaultValue: null,
  },
  associacao_cliente: {
    type: DataTypes.TINYINT, 
    allowNull: false,
    defaultValue: 0,
  },
  associacao_favorito: {
    type: DataTypes.TINYINT, 
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: "Associacao",
  tableName: "associacoes",
  timestamps: false,
});

export default Associacao;