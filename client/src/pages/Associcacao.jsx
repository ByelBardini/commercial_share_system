/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, LogOut } from "lucide-react";
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
    setAviso("Você tem certeza que deseja excluir esta empresa?");
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
    const dataContatoFormatada = formatarParaInput(dataContato) || null;
    const dataFechamentoFormatada = formatarParaInput(dataFechamento) || null;
    await salvaContatos(contatosOriginais, contatosModificados, associacao_id);
    await putAssociacao(
      nome,
      fantasia,
      cnpj,
      dataContatoFormatada,
      dataFechamentoFormatada,
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
    <div className="relative min-h-screen w-screen flex flex-col items-center p-6 overflow-x-hidden">
      <div className="animated-gradient" />

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

      <div className="bg-blue-600/50 w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-8 glass shadow-lg backdrop-blur-md">
        <button
          className="flex gap-2 items-center text-gray-200 hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-100"
          onClick={confirmaSaida}
          title="Voltar"
        >
          <LogOut size={22} />
          <span className="text-base font-bold">Voltar</span>
        </button>
        <h1 className="text-gray-200 text-2xl font-bold text-center w-full tracking-tight select-none">
          Editando Empresa
        </h1>
        <div />
      </div>

      <div className="relative w-full max-w-3xl mt-32 rounded-2xl p-7 shadow-2xl border bg-white/90 glass">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Nome da Empresa
            </label>
            <input
              type="text"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              placeholder="Nome da associação"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Nome Fantasia
            </label>
            <input
              type="text"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              placeholder="Nome fantasia"
              value={fantasia}
              onChange={(event) => setFantasia(event.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-4/6">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              CNPJ
            </label>
            <input
              type="text"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(event) => setCnpj(event.target.value)}
            />
          </div>
          <div className="w-2/6">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Cliente
            </label>
            <select
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
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
          <label className="block text-sm font-semibold text-blue-800 mb-1">
            Observação
          </label>
          <textarea
            className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
            placeholder="Observações"
            value={obs}
            onChange={(event) => setObs(event.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <div className="w-1/3">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Data do Último Contato
            </label>
            <input
              type="date"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              value={formatarParaInput(dataContato)}
              onChange={(event) => setDataContato(event.target.value)}
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Data de Fechamento
            </label>
            <input
              type="date"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              value={formatarParaInput(dataFechamento)}
              onChange={(event) => setDataFechamento(event.target.value)}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-blue-800 mb-1">
            Contatos
          </label>
          <div className="bg-blue-50/50 w-full rounded-xl p-4">
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
                className="bg-green-500/90 hover:bg-green-600 active:bg-green-700 shadow-md transition font-bold text-white px-7 py-3 rounded-2xl text-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-green-300"
                onClick={() => {
                  setContatoModificado({});
                  setTimeout(() => setAdicionando(true), 0);
                }}
              >
                ADICIONAR
              </button>
              <button
                className={`bg-red-500/90 hover:bg-red-600 active:bg-red-700 shadow-md transition font-bold text-white px-7 py-3 rounded-2xl text-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-red-300`}
                onClick={() => {
                  setEditando(false);
                  setDeletando(!deletando);
                }}
              >
                REMOVER
              </button>
              <button
                className="bg-yellow-400/90 hover:bg-yellow-500 active:bg-yellow-600 shadow-md transition font-bold text-white px-7 py-3 rounded-2xl text-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-yellow-200"
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

        <div className="w-full flex justify-center mt-6 gap-5">
          <button
            className="bg-blue-600/90 hover:bg-blue-700 active:bg-blue-800 shadow-lg transition font-bold text-white px-10 py-4 rounded-2xl text-xl tracking-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={confirmaSalvar}
          >
            FINALIZAR
          </button>
          <button
            className="bg-red-500/90 hover:bg-red-600 active:bg-red-700 shadow-lg transition font-bold text-white px-10 py-4 rounded-2xl text-xl tracking-tight focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={confirmaSaida}
          >
            CANCELAR
          </button>
        </div>
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={clicaExcluir}
          className="absolute bottom-6 right-7 bg-transparent hover:bg-blue-100 rounded-full transition p-2 shadow"
          title="Excluir associação"
        >
          <Trash2 size={32} className="text-blue-400" />
        </motion.button>
      </div>
    </div>
  );
}

export default Associacao;
