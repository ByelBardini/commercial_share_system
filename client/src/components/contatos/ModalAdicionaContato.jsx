/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function formatarTelefone(valor) {
  let v = valor.replace(/\D/g, "");
  if (v.length <= 2) return `(${v}`;
  if (v.length <= 11) return `(${v.slice(0, 2)})${v.slice(2)}`;
  return `(${v.slice(0, 2)})${v.slice(2, 11)}`;
}

export default function ModalAdicionaContato({
  setEditando,
  setContatosModificados,
  contatosModificados = [],
  contatoAntigo = {},
}) {
  const [nome, setNome] = useState(contatoAntigo.contato_nome);
  const [tipo, setTipo] = useState(contatoAntigo.contato_tipo);
  const [contato, setContato] = useState(contatoAntigo.contato);

  useEffect(() => {
    setNome(contatoAntigo.contato_nome || "");
    setTipo(contatoAntigo.contato_tipo || "telefone");
    setContato(contatoAntigo.contato || "");
  }, [contatoAntigo]);

  function handleContatoChange(e) {
    const val = e.target.value;
    if (tipo === "telefone") {
      setContato(formatarTelefone(val));
    } else {
      setContato(val);
    }
  }

  function handleTipoChange(e) {
    const newTipo = e.target.value;
    setTipo(newTipo);
    setContato("");
  }

  function salvarContato() {
    const novoContato = {
      ...contatoAntigo,
      contato_nome: nome,
      contato_tipo: tipo,
      contato: contato,
    };

    let contatos;

    if (contatoAntigo && contatoAntigo.contato_id) {
      contatos = contatosModificados.map((c) =>
        c.contato_id === contatoAntigo.contato_id
          ? {
              ...c,
              ...novoContato,
              contato_alteracao: "modificado",
              contato_id: c.contato_id,
            }
          : c
      );
    } else {
      contatos = [
        ...contatosModificados,
        {
          ...novoContato,
          contato_id: Date.now(),
          contato_alteracao: "criado",
        },
      ];
    }
    setNome("");
    setTipo("telefone");
    setContato("");
    setContatosModificados(contatos);
    setEditando(false);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed top-0 left-0 w-full h-full bg-black/60 z-[200] flex items-center justify-center`}
      >
        <motion.div
          initial={{ scale: 0.95, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="bg-white w-2/6 p-8 rounded-2xl shadow-2xl flex flex-col gap-4 relative"
        >
          <button
            className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl"
            onClick={() => {
              setEditando(false);
            }}
            title="Fechar"
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold text-blue-800 text-center mb-2">
            {contatoAntigo.contato_id ? "Editar Contato" : "Novo Contato"}
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome do Contato
              <span className="text-red-600 ml-1">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 border text-lg focus:outline-blue-500"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoFocus
              maxLength={60}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-2/8">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tipo do Contato
              </label>
              <select
                className="w-full bg-gray-100 rounded-lg p-2 border text-lg focus:outline-blue-500 cursor-pointer"
                value={tipo}
                onChange={handleTipoChange}
              >
                <option value="telefone">Telefone</option>
                <option value="email">E-mail</option>
              </select>
            </div>
            <div className="w-4/6 flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Contato
                <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type={tipo === "telefone" ? "tel" : "email"}
                className="w-full bg-gray-100 rounded-lg p-2 border text-lg focus:outline-blue-500"
                placeholder={
                  tipo === "telefone" ? "(99)999999999" : "email@dominio.com"
                }
                value={contato}
                onChange={handleContatoChange}
                maxLength={tipo === "telefone" ? 13 : 60}
                inputMode={tipo === "telefone" ? "tel" : "email"}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className={`mt-6 w-full bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-xl shadow hover:bg-blue-900 transition disabled:opacity-40`}
              disabled={!nome || !contato}
              onClick={salvarContato}
            >
              Salvar
            </button>
            {contatoAntigo.contato_id ? (
              <button
                className={`mt-6 w-full bg-red-700 text-white font-bold px-8 py-3 rounded-lg text-xl shadow hover:bg-red-900 transition disabled:opacity-40`}
                onClick={() => {
                  setEditando(false);
                }}
              >
                Cancelar
              </button>
            ) : (
              ""
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
