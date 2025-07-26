import Cidade from "./cidades.js";
import Associacao from "./associacoes.js";
import Contato from "./contatos.js";
import Usuario from "./usuarios.js";
import Log from "./logs.js";

function transformaEmString(valor) {
  if (valor === null || valor === undefined || valor == "") return "-";
  if (valor instanceof Date) return valor.toISOString().slice(0, 10);
  if (typeof valor === "string" && /^\d{4}-\d{2}-\d{2}T/.test(valor))
    return valor.slice(0, 10);
  if (typeof valor === "object") return JSON.stringify(valor);
  return String(valor);
}

Cidade.hasMany(Associacao, {
  foreignKey: "associacao_cidade_id",
  sourceKey: "cidade_id",
  as: "associacoes",
});
Associacao.belongsTo(Cidade, {
  foreignKey: "associacao_cidade_id",
  targetKey: "cidade_id",
  as: "cidade",
});

Associacao.hasMany(Contato, {
  foreignKey: "contato_associacao_id",
  sourceKey: "associacao_id",
  as: "contatos",
});
Contato.belongsTo(Associacao, {
  foreignKey: "contato_associacao_id",
  targetKey: "associacao_id",
  as: "associacao",
  onDelete: "CASCADE",
});

Usuario.hasMany(Log, {
  foreignKey: "log_usuario_id",
  sourceKey: "usuario_id",
  as: "logs",
});
Log.belongsTo(Usuario, {
  foreignKey: "log_usuario_id",
  targetKey: "usuario_id",
  as: "usuario",
});

Associacao.afterCreate(async (instance, options) => {
  const usuario_id = options.usuario_id || null;

  await Log.create({
    log_usuario_id: usuario_id,
    log_operacao_realizada: "Criado Empresa",
    log_valor_antigo: "-",
    log_valor_novo: JSON.stringify(instance.toJSON()),
    log_data_alteracao: new Date(),
  });
});

Associacao.afterUpdate(async (instance, options) => {
  const usuario_id = options.usuario_id || null;
  if (!usuario_id) {
    console.log("Update sem usuario_id, log ignorado.");
    return;
  }

  const alterados = Array.from(instance._changed || []);
  for (const key of Object.keys(instance._changed)) {
    if (instance._changed[key]) alterados.push(key);
  }

  for (const campo of alterados) {
    const antigo = instance._previousDataValues[campo];
    const novo = instance.dataValues[campo];

    if (transformaEmString(antigo) == transformaEmString(novo)) {
      return;
    }

    await Log.create({
      log_usuario_id: usuario_id,
      log_operacao_realizada: `Alterado campo Empresa - ${campo}`,
      log_valor_antigo: transformaEmString(antigo),
      log_valor_novo: transformaEmString(novo),
      log_data_alteracao: new Date(),
    }).catch(console.error);
  }
});

Associacao.afterDestroy(async (instance, options) => {
  const usuario_id = options.usuario_id || null;

  await Log.create({
    log_usuario_id: usuario_id || null,
    log_operacao_realizada: "Empresa deletada",
    log_valor_antigo: JSON.stringify(instance.toJSON()),
    log_valor_novo: "-",
    log_data_alteracao: new Date(),
  }).catch(console.error);
});

export { Cidade, Associacao, Contato, Usuario, Log };
