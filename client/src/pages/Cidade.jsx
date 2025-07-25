/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Search, Funnel, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getAssociacoesPorCidade } from "../services/api/associacaoService.js";
import Loading from "../components/default/Loading.jsx";
import ModalRegistraAssociacoes from "../components/associacoes/ModalRegistraAssociacoes.jsx";
import ListaAssociacoes from "../components/associacoes/ListaAssociacoes.jsx";
import ModalVisualizaAssociacao from "../components/associacoes/ModalVisualizaAssociacao.jsx";
import ModalAviso from "../components/default/ModalAviso.jsx";

function Cidade() {
  const [cadastro, setCadastro] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [visualiza, setVisualiza] = useState(false);

  const [erro, setErro] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");

  const [associacoesRoot, setAssociacoesRoot] = useState([]);
  const [dadosAssociacao, setDadosAssociacao] = useState([]);

  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("");

  const navigate = useNavigate();

  async function sair() {
    localStorage.setItem("id_cidade", null);
    localStorage.setItem("nome_cidade", null);
    navigate("/home");
  }

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center p-6 overflow-x-hidden">
      <div className="animated-gradient" />
      {carregando && <Loading />}
      {erro && (
        <ModalAviso
          texto={erroMensagem}
          className="red"
          onClick={() => setErro(false)}
        />
      )}
      <AnimatePresence>
        {cadastro && (
          <ModalRegistraAssociacoes
            setCadastro={setCadastro}
            getAssociacoesPorCidade={getAssociacoesPorCidade}
            setCarregando={setCarregando}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {visualiza && (
          <ModalVisualizaAssociacao
            aparecer={`${visualiza ? "" : "hidden"}`}
            setVisualiza={setVisualiza}
            dadosAssociacao={dadosAssociacao}
            navigate={navigate}
            setCarregando={setCarregando}
            setErro={setErro}
            setErroMensagem={setErroMensagem}
          />
        )}
      </AnimatePresence>

      <div className="bg-blue-600/50  w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-8 glass shadow-lg backdrop-blur-md">
        <button
          className="flex gap-2 items-center text-gray-200 hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-100 font-bold"
          onClick={sair}
          title="Voltar"
        >
          <LogOut size={22} />
          <span className="text-base font-bold">Voltar</span>
        </button>
        <h1 className="text-gray-200 text-2xl font-bold text-center w-full tracking-tight select-none">
          Empresas de{" "}
          <span className="text-blue-300">
            {localStorage.getItem("nome_cidade")}
          </span>
        </h1>
        <div className="w-[70px]" />
      </div>

      <motion.button
        className="bg-green-500 p-3 h-16 rounded-2xl mt-32 shadow-xl text-white font-bold text-lg flex items-center gap-2 hover:bg-green-600 transition border-2 border-white"
        layout
        whileHover={{ scale: 1.06, y: -2 }}
        onClick={() => setCadastro(true)}
      >
        <Plus size={24} /> ADICIONAR EMPRESA
      </motion.button>

      <div className="w-full max-w-2xl mt-10 p-2 rounded-2xl bg-white/80 shadow-lg border flex items-center gap-3 glass">
        <div className="flex items-center bg-white/90 rounded-xl flex-1 px-4 shadow-inner border mr-1">
          <Search size={22} className="text-blue-400 mr-2" />
          <input
            type="text"
            placeholder="Pesquisar empresa..."
            id="pesquisa-associacao"
            className="w-full bg-transparent p-3 rounded-md text-lg outline-none border-none placeholder-gray-400"
            onChange={(event) => setPesquisa(event.target.value)}
          />
        </div>
        <div className="flex items-center bg-white/90 rounded-xl px-4 shadow-inner border ml-1">
          <Funnel size={20} className="text-blue-400 mr-2" />
          <select
            className="bg-transparent p-2 rounded-md text-lg outline-none border-none placeholder-gray-400 min-w-[90px]"
            onChange={(event) => setFiltro(event.target.value)}
          >
            <option value="" disabled selected hidden>
              Filtrar
            </option>
            <option value={1}>Clientes</option>
            <option value={0}>Outros</option>
            <option value={""}>Ambos</option>
          </select>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-10 rounded-2xl p-5 shadow-xl glass bg-white/70 border">
        <ListaAssociacoes
          pesquisa={pesquisa}
          filtroAtivo={filtro}
          setCarregando={setCarregando}
          associacoesRoot={associacoesRoot}
          setAssociacoesRoot={setAssociacoesRoot}
          setDadosAssociacao={setDadosAssociacao}
          setVisualiza={setVisualiza}
          navigate={navigate}
        />
      </div>
    </div>
  );
}
export default Cidade;
