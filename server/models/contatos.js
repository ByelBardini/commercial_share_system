import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Contato extends Model {}

Contato.init({
  contato_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  contato_associacao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  contato_tipo: {
    type: DataTypes.ENUM("telefone","email"),
    allowNull: false,
  },
  contato_nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  contato: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "Contato",
  tableName: "contatos",
  timestamps: false,
});

export default Contato;