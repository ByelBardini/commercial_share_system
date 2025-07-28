/* eslint-disable no-unused-vars */
import { postAssociacao } from "../../services/api/associacaoService.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ModalAviso from "../default/ModalAviso";

function ModalRegistraAssociacoes({
  setCadastro,
  setCarregando,
  setErro,
  setErroMensagem,
  navigate,
}) {
  const [concluido, setConcluido] = useState(false);

  const [nome, setNome] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cliente, setCliente] = useState("");
  const [obs, setObs] = useState("");
  const [dataContato, setDataContato] = useState("");
  const [dataFechamento, setDataFechamento] = useState("");

  function verificaDataValida(data, setData) {
    const hoje = new Date();
    const hojeStr = hoje.toISOString().slice(0, 10);

    if (data > hojeStr) {
      setErroMensagem("A data não pode ser no futuro!");
      setData(hojeStr);
      setErro(true);
    } else {
      setData(data);
    }
  }

  async function cadastra() {
    if (!nome.trim() || !cliente.trim()) {
      setErro(true);
      setErroMensagem("Insira os dados obrigatórios!");
      return;
    }

    setCarregando(true);

    const id_cidade = localStorage.getItem("id_cidade");
    try {
      await postAssociacao(
        id_cidade,
        nome,
        fantasia !== "" ? fantasia : nome,
        cnpj !== "" ? cnpj : null,
        dataContato !== "" ? dataContato : null,
        dataFechamento !== "" ? dataFechamento : null,
        obs !== "" ? obs : null,
        cliente
      );

      setConcluido(true);
      setTimeout(() => {
        setConcluido(false);
        setCadastro(false);
        window.location.reload();
      }, 500);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setErroMensagem("Sessão inválida, realize o login");
        setErro(true);
        setTimeout(() => {
          setErro(false);
          navigate("/");
        }, 1000);
      } else {
        setErroMensagem(err.message);
        setErro(true);
        return;
      }
    }finally {
      setCarregando(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setCadastro(false)}
      className={`fixed top-0 left-0 w-full h-full bg-black/80 z-[100] flex items-center justify-center`}
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl flex flex-col gap-4 p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {concluido && (
            <ModalAviso
              texto="Associação Cadastrada com Sucesso!"
              cor="verde"
              botao={"hidden"}
            />
          )}
        </AnimatePresence>
        <button
          className="cursor-pointer absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          onClick={() => setCadastro(false)}
          title="Fechar"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Registrar Empresa
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-gray-700">
                Nome da Empresa
                <span className="text-red-600 ml-1">*</span>
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 100 Caracteres)
              </label>
            </div>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
              placeholder="Nome da associação"
              onChange={(event) => setNome(event.target.value)}
            />
          </div>

          <div>
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-gray-700">
                Nome Fantasia
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 100 Caracteres)
              </label>
            </div>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
              placeholder="Nome fantasia"
              onChange={(event) => setFantasia(event.target.value)}
            />
          </div>

          <div>
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-gray-700">
                CNPJ
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 30 Caracteres)
              </label>
            </div>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
              placeholder="00.000.000/0000-00"
              onChange={(event) => setCnpj(event.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Cliente
              <span className="text-red-600 ml-1">*</span>
            </label>
            <select
              className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
              onChange={(event) => setCliente(event.target.value)}
            >
              <option value="" disabled selected hidden>
                Selecione
              </option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>

          <div>
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-gray-700">
                Observação
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 200 Caracteres)
              </label>
            </div>
            <textarea
              className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
              placeholder="Observações"
              onChange={(event) => setObs(event.target.value)}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700">
                Data do último Contato
              </label>
              <input
                type="date"
                value={dataContato}
                className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
                onChange={(event) =>
                  verificaDataValida(event.target.value, setDataContato)
                }
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700">
                Data de Fechamento
              </label>
              <input
                type="date"
                value={dataFechamento}
                className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
                onChange={(event) =>
                  verificaDataValida(event.target.value, setDataFechamento)
                }
              />
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          <span className="text-red-600">*</span> Campos obrigatórios
        </p>

        <button
          className="cursor-pointer mt-6 bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-xl hover:bg-blue-900 transition shadow"
          onClick={cadastra}
        >
          Salvar
        </button>
      </div>
    </motion.div>
  );
}

export default ModalRegistraAssociacoes;
