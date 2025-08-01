import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

class Usuario extends Model {}

Usuario.init({
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  usuario_nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  usuario_login: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  usuario_senha: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  usuario_role: {
    type: DataTypes.ENUM("adm", "usuario"),
    allowNull: false,
  },
  usuario_troca_senha: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
  usuario_ativo: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
  usuario_refresh_token: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Usuario",
  tableName: "usuarios",
  timestamps: false,
});

export default Usuario;
