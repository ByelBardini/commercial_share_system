import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Cidade extends Model {}

Cidade.init({
  cidade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  cidade_nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cidade_uf: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  cidade_favorito: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  modelName: "Cidade",
  tableName: "cidades",
  timestamps: false,
});

export default Cidade;