/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Pen, Trash2 } from "lucide-react";

function CampoContato({
  contatos = [],
  deletando = false,
  editando = false,
  setAdicionando = () => {},
  setContatoModificado = () => {},
  setContatos = () => {},
  setEditando = () => {},
  setDeletando = () => {},
  setCorModal = () => {},
  setAviso = () => {},
  setOnSim = () => {},
  setModalAviso = () => {},
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
            whileHover={{ scale: 1.025, y: -2 }}
            key={contato.contato_id}
            className={`
              bg-white/90 border border-blue-100 rounded-2xl 
              px-6 py-4 my-3 flex justify-between items-center 
              shadow-lg hover:shadow-xl transition group
              ${deletando ? "border-red-200 bg-red-50" : ""}
            `}
          >
            <div>
              <h1 className="text-xl font-bold text-blue-800 p-1 select-none drop-shadow-sm">
                {contato.contato_nome}
              </h1>
              <span className="block text-base text-blue-500 font-semibold select-none pl-1">
                {contato.contato_tipo === "telefone" ? (
                  <span className="inline-flex items-center">
                    <Phone size={18} className="mr-1" /> {contato.contato}
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <Mail size={18} className="mr-1" /> {contato.contato}
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <AnimatePresence>
                {editando && (
                  <motion.button
                    key="edit"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => editaContato(contato)}
                    whileHover={{ scale: 1.15 }}
                    className="rounded-full bg-blue-100 hover:bg-blue-300 transition px-2 py-2 shadow border border-blue-200"
                  >
                    <Pen size={22} className="text-blue-700" />
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {deletando && (
                  <motion.button
                    key="delete"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.18 }}
                    whileHover={{ scale: 1.15 }}
                    onClick={() => confirmaExclusao(contato.contato_id)}
                    className="rounded-full bg-red-100 hover:bg-red-300 transition px-2 py-2 shadow border border-red-300"
                  >
                    <Trash2 size={22} className="text-red-600" />
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
