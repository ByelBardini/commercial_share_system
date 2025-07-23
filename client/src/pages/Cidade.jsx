/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Search, Funnel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAssociacoesPorCidade } from "../services/api/associacaoService.js";
import Loading from "../components/default/Loading.jsx";
import ModalRegistraAssociacoes from "../components/associacoes/ModalRegistraAssociacoes.jsx";
import ListaAssociacoes from "../components/associacoes/ListaAssociacoes.jsx";

function Cidade() {
  const [cadastro, setCadastro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [associacoesRoot, setAssociacoesRoot] = useState([]);

  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("");

  const navigate = useNavigate();

  async function sair() {
    localStorage.setItem("id_cidade", null);
    localStorage.setItem("nome_cidade", null);
    navigate("/home");
  }

  return (
    <div
      className="bg-gray-300 min-h-screen max-w-screen flex flex-col items-center p-6
        "
    >
      <Loading aparecer={`${carregando ? "" : "hidden"}`} />
      <ModalRegistraAssociacoes
        aparecer={`${cadastro ? "" : "hidden"}`}
        setCadastro={setCadastro}
        getAssociacoesPorCidade={getAssociacoesPorCidade}
      />
      <div className="w-screen h-16 bg-blue-800 fixed top-0 left-0 z-50 flex items-center justify-between px-4">
        <button
          className="bg-red-400 rounded-xl text-xl font-bold px-4 py-1 text-white cursor-pointer hover:bg-red-500 transition shadow-2xl"
          onClick={sair}
        >
          Voltar
        </button>
        <h1 className="text-white text-2xl font-bold text-center w-full rounded shadow-2xl">{`Associações de ${localStorage.getItem(
          "nome_cidade"
        )}`}</h1>
      </div>
      <motion.button
        className="bg-green-400 p-2 h-16 rounded-md mt-18 shadow-xl text-white font-bold text-2xl cursor-pointer hover:bg-green-500 transition"
        layout
        whileHover={{ scale: 1.05 }}
        onClick={() => setCadastro(true)}
      >
        ADICIONAR ASSOCIAÇÃO
      </motion.button>
      <div className="w-9/10 p-2 h-24 rounded-xl bg-white mt-10 shadow-2xl items-center  flex gap-4">
        <div className="bg-gray-100 rounded-md h-16 w-7/8 flex items-center px-4 shadow ml-2">
          <Search size={28} color="#c0c0c0" className="mr-3" />
          <input
            type="text"
            placeholder="Pesquise o nome da cidade..."
            id="pesquisa-cidade"
            className="w-full bg-gray-100 p-3 focus:bg-gray-50 rounded-md text-xl outline-none border-none placeholder-gray-400"
            onChange={(event) => setPesquisa(event.target.value)}
          ></input>
        </div>
        <div className="bg-gray-100 rounded-md h-16 w-1/8 flex items-center px-4 shadow mr-2">
          <Funnel size={28} color="#c0c0c0" className="mr-3" />
          <select
            className="w-full bg-gray-100 p-3 focus:bg-gray-50 rounded-md text-xl outline-none border-none placeholder-gray-400"
            onChange={(event) => setFiltro(event.target.value)}
          >
            <option value="" disabled selected hidden>
              Filtrar
            </option>
            <option value={1}>Ativos</option>
            <option value={0}>Inativos</option>
            <option value={""}>Ambos</option>
          </select>
        </div>
      </div>
      <div className="bg-white w-9/10 mt-10 rounded-2xl p-5 shadow-2xl">
        <ListaAssociacoes
          pesquisa={pesquisa}
          filtroAtivo={filtro}
          setCarregando={setCarregando}
          associacoesRoot={associacoesRoot}
          setAssociacoesRoot={setAssociacoesRoot}
          navigate={navigate}
        />
      </div>
    </div>
  );
}

export default Cidade;
