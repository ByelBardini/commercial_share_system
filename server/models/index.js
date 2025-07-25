import Cidade from "./cidades.js";
import Associacao from "./associacoes.js";
import Contato from "./contatos.js";
import Usuario from "./usuarios.js";
import Log from "./logs.js";

Cidade.hasMany(Associacao, {
  foreignKey: "associacao_cidade_id",
  sourceKey: "cidade_id",
  as: "associacoes"
});
Associacao.belongsTo(Cidade, {
  foreignKey: "associacao_cidade_id",
  targetKey: "cidade_id",
  as: "cidade"
});

Associacao.hasMany(Contato, {
  foreignKey: "contato_associacao_id",
  sourceKey: "associacao_id",
  as: "contatos"
});
Contato.belongsTo(Associacao, {
  foreignKey: "contato_associacao_id",
  targetKey: "associacao_id",
  as: "associacao",
  onDelete: "CASCADE"
});

Usuario.hasMany(Log, {
  foreignKey: "log_usuario_id",
  sourceKey: "usuario_id",
  as: "logs"
});
Log.belongsTo(Usuario, {
  foreignKey: "log_usuario_id",
  targetKey: "usuario_id",
  as: "usuario"
});

export {
  Cidade, Associacao, Contato, Usuario, Log
};
