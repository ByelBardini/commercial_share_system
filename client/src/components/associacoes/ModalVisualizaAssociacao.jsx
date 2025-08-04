/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Pencil, X, Phone } from "lucide-react";
import { useState } from "react";
import { buscaContatos } from "../../services/api/contatoService.js";
import ModalContatos from "../contatos/ModalContatos.jsx";

function ModalVisualizaAssociacao({
  setVisualiza,
  dadosAssociacao,
  navigate,
  setCarregando,
  setErro,
  setErroMensagem,
}) {
  const [vendoContatos, setVendoContatos] = useState(false);
  const [contatos, setContatos] = useState([]);

  function modificaAssociacao(id) {
    localStorage.setItem("associacao_id", id);
    navigate("/empresa");
  }

  async function carregaContatos() {
    setCarregando(true);
    try {
      const contatos = await buscaContatos(
        localStorage.getItem("associacao_id")
      );
      setContatos(contatos);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setErroMensagem("Sessão inválida, realize o login");
        setErro(true);
        setTimeout(() => {
          setErro(false);
          navigate("/");
        }, 1000);
      } else {
        setErro(
          "Não foi possível carregar os contatos. Tente novamente mais tarde."
        );
        setErroMensagem(
          "Não foi possível carregar os contatos. Tente novamente mais tarde."
        );
        setContatos([]);
      }
    } finally {
      setCarregando(false);
    }
  }

  async function abreModalContatos() {
    await carregaContatos();
    setVendoContatos(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center bg-black/70`}
      style={{ overflowY: "auto" }}
    >
      {vendoContatos && (
        <ModalContatos
          contatos={contatos}
          setContatos={setContatos}
          setVendoContatos={setVendoContatos}
        />
      )}

      <div
        className="relative w-full max-w-xl rounded-2xl flex flex-col gap-4 p-8 bg-white/90 glass shadow-2xl border border-blue-200 max-h-[90vh] overflow-y-auto pr-4 custom-modal-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold bg-white/90 rounded-full p-2 transition shadow"
          onClick={() => setVisualiza(false)}
          title="Fechar"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center drop-shadow-sm select-none">
          Visualizar{" "}
          {localStorage.getItem("estado_lista") == "associacoes"
            ? "Associação"
            : "Empresa"}
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tipo
            </label>
            <input
              className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
              value={
                localStorage.getItem("estado_lista") === "associacoes"
                  ? "Associação"
                  : dadosAssociacao.associacao_tipo === "empresa"
                  ? "Empresa"
                  : "Pessoa Física"
              }
              readOnly
            />
          </div>
          <div></div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome da{" "}
              {localStorage.getItem("estado_lista") == "associacoes"
                ? "Associação"
                : "Empresa"}
            </label>
            <input
              className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
              value={dadosAssociacao.associacao_nome || "N/A"}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome Fantasia
            </label>
            <input
              type="text"
              readOnly
              className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
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
              className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
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
              className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
              value={dadosAssociacao.associacao_cliente === 1 ? "Sim" : "Não"}
            />
          </div>
          {localStorage.getItem("estado_lista") != "associacoes" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Preço Instalação
              </label>
              <input
                type="text"
                readOnly
                className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
                value={`R$ ${
                  dadosAssociacao.associacao_preco_instalacao !== undefined &&
                  dadosAssociacao.associacao_preco_instalacao !== null
                    ? Number(
                        dadosAssociacao.associacao_preco_instalacao
                      ).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0,00"
                }`}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Preço por Placa
            </label>
            <input
              type="text"
              readOnly
              className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
              value={`R$ ${
                dadosAssociacao.associacao_preco_placa !== undefined &&
                dadosAssociacao.associacao_preco_placa !== null
                  ? Number(
                      dadosAssociacao.associacao_preco_placa
                    ).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0,00"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Observação
            </label>
            <textarea
              readOnly
              className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
              value={dadosAssociacao.associacao_observacao || ""}
            ></textarea>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Data do Último Contato
              </label>
              <input
                type="text"
                readOnly
                className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
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
                className="cursor-default w-full bg-white/95 rounded-lg p-3 border border-blue-100 font-semibold text-lg text-gray-800 shadow-inner"
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
            className="flex-1 flex justify-center items-center bg-green-500 hover:bg-green-600 transition text-white font-bold px-8 py-3 rounded-xl text-xl shadow"
            onClick={abreModalContatos}
          >
            <Phone className="mr-2" /> Contatos
          </button>
          <button
            className="flex-1 flex justify-center items-center bg-yellow-400 hover:bg-yellow-500 transition text-white font-bold px-8 py-3 rounded-xl text-xl shadow"
            onClick={() => modificaAssociacao(dadosAssociacao.associacao_id)}
          >
            <Pencil className="mr-2" /> Editar
          </button>
          <button
            className="flex-1 flex justify-center items-center bg-blue-700 hover:bg-blue-900 transition text-white font-bold px-8 py-3 rounded-xl text-xl shadow"
            onClick={() => setVisualiza(false)}
          >
            OK
          </button>
        </div>
      </div>
      <style>
        {`
        .glass {
          backdrop-filter: blur(12px) saturate(120%);
          -webkit-backdrop-filter: blur(12px) saturate(120%);
        }
        `}
      </style>
    </motion.div>
  );
}

export default ModalVisualizaAssociacao;
