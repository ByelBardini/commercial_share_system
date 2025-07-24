/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Pen, Trash2 } from "lucide-react";

function CampoContato({
  contatos = [],
  deletando = false,
  editando = false,
  setAdicionando,
  setContatoModificado,
  setContatos,
  setEditando,
  setDeletando,
  setCorModal,
  setAviso,
  setOnSim,
  setModalAviso,
}) {
  function confirmaExclusao(id) {
    setCorModal("vermelha");
    setAviso("Você tem certeza que deseja excluir esse contato?");
    setOnSim(() => () => {
      excluirContato(id);
      setModalAviso(false);
    });
    setModalAviso(true);
  }

  function editaContato(contato) {
    setContatoModificado(contato);
    setEditando(false);
    setAdicionando(true);
  }

  function excluirContato(contatoId) {
    setContatos((prev) =>
      prev.map((contato) =>
        contato.contato_id === contatoId
          ? { ...contato, contato_alteracao: "excluido" }
          : contato
      )
    );
    setDeletando(false);
  }

  return (
    <div className="w-full">
      {contatos
        .filter((contato) => contato.contato_alteracao !== "excluido")
        .map((contato) => (
          <motion.div
            layout
            whileHover={{ scale: 1.01 }}
            key={contato.contato_id}
            animate={{
              backgroundColor: deletando ? "#fee2e2" : "#f3f4f6",
              boxShadow: deletando
                ? "0 0 0 2px #f87171"
                : "0 4px 24px -8px #00000022",
            }}
            transition={{ duration: 0.2 }}
            className="bg-gray-100 rounded-md p-3 m-2 shadow-md flex justify-between items-center"
          >
            <div>
              <h1 className="text-xl font-bold p-1">{contato.contato_nome}</h1>
            </div>
            <div className="flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={deletando || editando ? "icon-on" : "icon-off"}
                  initial={{ x: deletando ? 16 : 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: deletando || editando ? 16 : 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center"
                >
                  {contato.contato_tipo === "telefone" ? (
                    <Phone size={20} />
                  ) : (
                    <Mail size={20} />
                  )}
                  <span className="text-xl font-bold p-1">
                    {contato.contato}
                  </span>
                </motion.span>
              </AnimatePresence>

              <AnimatePresence>
                {editando && (
                  <motion.button
                    key="trash"
                    className="cursor-pointer ml-3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => editaContato(contato)}
                    whileHover={{ scale: 1.2 }}
                  >
                    <Pen size={22} />
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {deletando && (
                  <motion.button
                    key="trash"
                    className="cursor-pointer ml-3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => confirmaExclusao(contato.contato_id)}
                  >
                    <Trash2 size={22} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
    </div>
  );
}

export default CampoContato;
