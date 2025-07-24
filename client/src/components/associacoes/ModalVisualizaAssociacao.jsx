/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Pencil, X, Phone } from "lucide-react";
import ModalContatos from "../contatos/ModalContatos.jsx";
import { useState } from "react";

function ModalVisualizaAssociacao({
  aparecer,
  setVisualiza,
  dadosAssociacao,
  navigate,
  setCarregando,
}) {
  const [vendoContatos, setVendoContatos] = useState(false);
  const [contatos, setContatos] = useState([]);

  function modificaAssociacao(id) {
    localStorage.setItem("associacao_id", id);
    navigate("/associacao");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed top-0 left-0 w-full h-full bg-black/80 z-[100] flex items-center justify-center ${aparecer}`}
    >
      <ModalContatos
        aparecer={`${vendoContatos ? "" : "hidden"}`}
        setVendoContatos={setVendoContatos}
        setCarregando={setCarregando}
        contatos={contatos}
        setContatos={setContatos}
      />
      <div
        className="bg-white w-full max-w-xl rounded-2xl flex flex-col gap-4 p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          onClick={() => setVisualiza(false)}
          title="Fechar"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Visualizar Associação
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome da Associação
            </label>
            <input
              className="cursor-default w-full bg-gray-100 rounded-lg p-2 border font-semibold text-lg text-gray-800"
              value={dadosAssociacao.associacao_nome || "N/A"}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome Fantasia
            </label>
            <input
              type="text"
              readOnly
              className="cursor-default w-full bg-gray-100 rounded-lg p-2 border font-semibold text-lg text-gray-800"
              value={dadosAssociacao.associacao_nome_fantasia || "N/A"}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              CNPJ
            </label>
            <input
              type="text"
              readOnly
              className="cursor-default w-full bg-gray-100 rounded-lg p-2 border font-semibold text-lg text-gray-800"
              value={dadosAssociacao.associacao_cnpj || "N/A"}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Cliente
            </label>
            <input
              type="text"
              readOnly
              className="cursor-default w-full bg-gray-100 rounded-lg p-2 border font-semibold text-lg text-gray-800"
              value={dadosAssociacao.associacao_cliente === 1 ? "Sim" : "Não"}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Observação
            </label>
            <textarea
              readOnly
              className="cursor-default w-full bg-gray-100 rounded-lg p-2 border font-semibold text-lg text-gray-800"
              value={dadosAssociacao.associacao_observacao}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Data de Contato
              </label>
              <input
                type="text"
                readOnly
                className="cursor-default w-full bg-gray-100 rounded-lg p-2 border font-semibold text-lg text-gray-800"
                value={
                  dadosAssociacao.associacao_data_contato
                    ? new Date(
                        dadosAssociacao.associacao_data_contato
                      ).toLocaleDateString("pt-BR")
                    : "N/A"
                }
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Data de Fechamento
              </label>
              <input
                type="text"
                readOnly
                className="cursor-default w-full bg-gray-100 rounded-lg p-2 border font-semibold text-lg text-gray-800"
                value={
                  dadosAssociacao.associacao_data_fechamento
                    ? new Date(
                        dadosAssociacao.associacao_data_fechamento
                      ).toLocaleDateString("pt-BR")
                    : "N/A"
                }
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            className="cursor-pointer flex-1 flex justify-center items-center bg-green-500 hover:bg-green-600 transition text-white font-bold px-8 py-3 rounded-lg text-xl shadow"
            onClick={() => setVendoContatos(true)}
          >
            <Phone className="mr-2" /> Contatos
          </button>
          <button
            className="cursor-pointer flex-1 flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 transition text-white font-bold px-8 py-3 rounded-lg text-xl shadow"
            onClick={() => modificaAssociacao(dadosAssociacao.associacao_id)}
          >
            <Pencil className="mr-2" /> Editar
          </button>
          <button
            className="cursor-pointer flex-1 flex justify-center items-center bg-blue-700 hover:bg-blue-900 transition text-white font-bold px-8 py-3 rounded-lg text-xl shadow"
            onClick={() => setVisualiza(false)}
          >
            OK
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ModalVisualizaAssociacao;
