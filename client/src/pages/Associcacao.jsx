/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  getAssociacaoFull,
  putAssociacao,
  deletaAssociacao,
} from "../services/api/associacaoService.js";
import {
  buscaContatos,
  salvaContatos,
} from "../services/api/contatoService.js";
import Loading from "../components/default/Loading.jsx";
import ListaContatos from "../components/contatos/ListaContatos.jsx";
import ModalAdicionaContato from "../components/contatos/ModalAdicionaContato.jsx";
import ModalConfirmacao from "../components/default/ModalConfirmacao.jsx";

function Associacao() {
  const [carregando, setCarregando] = useState(false);
  const [deletando, setDeletando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [adicionando, setAdicionando] = useState(false);

  const [modalAviso, setModalAviso] = useState("");
  const [corModal, setCorModal] = useState("");
  const [onSim, setOnSim] = useState();
  const [aviso, setAviso] = useState(false);

  const [contatosOriginais, setContatosOriginais] = useState([]);
  const [contatoModificado, setContatoModificado] = useState([]);
  const [contatosModificados, setContatosModificados] = useState();

  const [nome, setNome] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cliente, setCliente] = useState("");
  const [obs, setObs] = useState("");
  const [dataContato, setDataContato] = useState("");
  const [dataFechamento, setDataFechamento] = useState("");

  const navigate = useNavigate();

  function clicaExcluir() {
    setCorModal("amarela");
    setModalAviso(true);
    setAviso("Você tem certeza que deseja excluir esta associação?");
    setOnSim(() => onConfirmaExclusao);
  }

  async function onConfirmaExclusao() {
    setModalAviso(false);
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setTimeout(() => {
        setCorModal("vermelha");
        setAviso("Você realmente tem certeza? Essa ação é IRREVERSÍVEL");
        setModalAviso(true);
      }, 400);
    }, 1000);
    setOnSim(() => deletarAssociacao);
  }

  async function confirmaSaida() {
    setModalAviso(true);
    setAviso("Você tem certeza que quer sair sem salvar?");
    setCorModal("amarela");
    setOnSim(() => sair);
  }

  async function confirmaSalvar() {
    setModalAviso(true);
    setAviso("Deseja manter as alterações?");
    setCorModal("verde");
    setOnSim(() => salvar);
  }

  async function salvar() {
    const associacao_id = localStorage.getItem("associacao_id");
    await salvaContatos(contatosOriginais, contatosModificados, associacao_id);
    await putAssociacao(
      nome,
      fantasia,
      cnpj,
      formatarParaInput(dataContato),
      formatarParaInput(dataFechamento),
      obs,
      cliente,
      associacao_id
    );
    navigate("/cidade");
    localStorage.setItem("associacao_id", null);
  }

  async function sair() {
    navigate("/cidade");
    localStorage.setItem("associacao_id", null);
  }

  async function deletarAssociacao() {
    setCarregando(true);
    await deletaAssociacao(localStorage.getItem("associacao_id"));
    setCarregando(false);
    navigate("/cidade");
  }

  async function carregaContatosOriginais() {
    setCarregando(true);
    const contatos = await buscaContatos(localStorage.getItem("associacao_id"));
    setContatosOriginais(contatos);
  }

  async function puxaDados() {
    setCarregando(true);
    const associacao = await getAssociacaoFull(
      localStorage.getItem("associacao_id")
    );
    console.log(associacao);
    setNome(associacao.associacao_nome);
    setFantasia(associacao.associacao_nome_fantasia);
    setCnpj(associacao.associacao_cnpj);
    setCliente(associacao.associacao_cliente);
    setObs(associacao.associacao_observacao);
    setDataContato(associacao.associacao_data_contato);
    setDataFechamento(associacao.associacao_data_fechamento);
    setCarregando(false);
  }

  function formatarParaInput(data) {
    if (!data) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) return data;
    const d = new Date(data);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  }

  useEffect(() => {
    puxaDados();
    carregaContatosOriginais();
  }, []);

  return (
    <div
      className="bg-gray-300 min-h-screen max-w-screen flex flex-col items-center p-6
        "
    >
      {carregando && <Loading />}
      <AnimatePresence>
        {modalAviso && (
          <ModalConfirmacao
            texto={aviso}
            onSim={onSim}
            onNao={() => setModalAviso(false)}
            cor={corModal}
          />
        )}
      </AnimatePresence>
      <ModalAdicionaContato
        aparecer={`${adicionando ? "" : "hidden"}`}
        contatosModificados={contatosModificados}
        setContatosModificados={setContatosModificados}
        setEditando={setAdicionando}
        contatoAntigo={contatoModificado}
      />
      <div className="w-screen h-16 bg-blue-800 fixed top-0 left-0 z-50 flex items-center justify-between px-4">
        <button
          className="bg-red-400 rounded-xl text-xl font-bold px-4 py-1 text-white cursor-pointer hover:bg-red-500 transition shadow-2xl"
          onClick={confirmaSaida}
        >
          Voltar
        </button>
        <h1 className="text-white text-2xl font-bold text-center w-full rounded shadow-2xl">{`Editando Associação`}</h1>
      </div>

      <div className="bg-white w-9/10 mt-18 rounded-2xl p-5 shadow-2xl">
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome da Associação
            </label>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 border text-lg text-gray-800"
              placeholder="Nome da associação"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome Fantasia
            </label>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 border text-lg text-gray-800"
              placeholder="Nome fantasia"
              value={fantasia}
              onChange={(event) => setFantasia(event.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <div className="w-5/6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              CNPJ
            </label>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 border text-lg text-gray-800"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
            />
          </div>

          <div className="w-1/6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Cliente
            </label>
            <select
              className="w-full bg-gray-100 rounded-lg p-2 border text-lg text-gray-800"
              onChange={(event) => setCliente(event.target.value)}
            >
              <option value={cliente} disabled hidden selected>
                {cliente == 1 ? "Sim" : "Não"}
              </option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Observação
          </label>
          <textarea
            className="w-full bg-gray-100 rounded-lg p-2 border text-lg text-gray-800"
            placeholder="Observações"
            value={obs}
            onChange={(event) => setObs(event.target.value)}
          ></textarea>
        </div>

        <div className="w-full flex justify-center gap-4 mt-4">
          <div className="w-1/6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Data de Contato
            </label>
            <input
              type="date"
              className="w-full bg-gray-100 rounded-lg p-2 border text-lg text-gray-800"
              value={formatarParaInput(dataContato)}
              onChange={(event) => setDataContato(event.target.value)}
            />
          </div>
          <div className="w-1/6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Data de Fechamento
            </label>
            <input
              type="date"
              className="w-full bg-gray-100 rounded-lg p-2 border text-lg text-gray-800"
              value={formatarParaInput(dataFechamento)}
              onChange={(event) => setDataFechamento(event.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex justify-center gap-4 mt-4">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contatos
            </label>
            <div className="bg-gray-100 w-full rounded-xl p-3">
              <ListaContatos
                setCarregando={setCarregando}
                deletando={deletando}
                editando={editando}
                setAdicionando={setAdicionando}
                setContatos={setContatosModificados}
                contatos={contatosModificados}
                setContatoModificado={setContatoModificado}
                setEditando={setEditando}
                setDeletando={setDeletando}
                setCorModal={setCorModal}
                setAviso={setAviso}
                setOnSim={setOnSim}
                setModalAviso={setModalAviso}
              />
              <div className="flex w-full justify-center gap-5 mt-6">
                <button
                  className="bg-green-400 rounded-xl p-2 text-gray-200 font-bold hover:bg-green-500 transition-transform"
                  onClick={() => {
                    setContatoModificado({});
                    setTimeout(() => setAdicionando(true), 0);
                  }}
                >
                  ADICIONAR
                </button>
                <button
                  className="bg-red-400 rounded-xl p-2 text-gray-200 font-bold hover:bg-red-500 transition-transform"
                  onClick={() => {
                    setEditando(false);
                    setDeletando(!deletando);
                  }}
                >
                  REMOVER
                </button>
                <button
                  className="bg-yellow-400 rounded-xl p-2 text-gray-200 font-bold hover:bg-yellow-500 transition-transform"
                  onClick={() => {
                    setDeletando(false);
                    setEditando(!editando);
                  }}
                >
                  EDITAR
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-6 gap-5">
          <button
            className="bg-blue-600 p-4 text-xl font-bold text-gray-200 rounded-xl hover:bg-blue-800 transition"
            onClick={confirmaSalvar}
          >
            FINALIZAR
          </button>
          <button
            className="bg-red-600 p-4 text-xl font-bold text-gray-200 rounded-xl hover:bg-red-800 transition"
            onClick={confirmaSaida}
          >
            CANCELAR
          </button>
        </div>
        <motion.button whileHover={{ scale: 1.2 }} onClick={clicaExcluir}>
          <Trash2 size={36} color="#c0c0c0" className="place-self-end " />
        </motion.button>
      </div>
    </div>
  );
}

export default Associacao;
