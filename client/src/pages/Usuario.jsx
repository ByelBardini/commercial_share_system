/* eslint-disable no-unused-vars */
import { Search, Funnel, LogOut, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/default/Loading";
import ListaUsuarios from "../components/usuarios/ListaUsuarios.jsx";
import ModalCriaUsuario from "../components/usuarios/ModalUsuario.jsx";
import ModalAviso from "../components/default/ModalAviso.jsx";

function CidadeConfig() {
  const navigate = useNavigate();

  const [filtro, setFiltro] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  const [cadastro, setCadastro] = useState(false);
  const [editar, setEditar] = useState("");
  const [usuario, setUsuario] = useState([]);

  const [carregando, setCarregando] = useState(false);

  const [aviso, setAviso] = useState(false);
  const [avisoCor, setAvisoCor] = useState("");
  const [avisoTexto, setAvisoTexto] = useState("");

  function cadastrar(){
    setEditar("cadastro");
    setCadastro(true);
  }

  function voltar() {
    navigate("/home", { replace: true });
  }

  return (
    <div className="relative min-h-screen w-screen flex flex-col justify-center items-center p-6 overflow-x-hidden">
      {carregando && <Loading />}
      <AnimatePresence>
        {cadastro && (
          <ModalCriaUsuario
            setCadastro={setCadastro}
            setCarregando={setCarregando}
            setAviso={setAviso}
            setAvisoCor={setAvisoCor}
            setAvisoTexto={setAvisoTexto}
            navigate={navigate}
            modo={editar}
            nomeAntigo={usuario.usuario_nome}
            loginAntigo={usuario.usuario_login}
            roleAntigo={usuario.usuario_role}
            idAntigo={usuario.usuario_id}
            statusAntigo={usuario.usuario_status}
          />
        )}
      </AnimatePresence>
      {aviso && (
        <AnimatePresence>
          <ModalAviso
            cor={avisoCor}
            texto={avisoTexto}
            onClick={() => setAviso(false)}
          />
        </AnimatePresence>
      )}
      <div className="animated-gradient" />
      <div className="bg-blue-600/65  w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-8 glass shadow-lg backdrop-blur-md">
        <div />
        <button
          className="flex gap-2 items-center text-gray-200 hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-100 font-bold"
          title="Voltar"
          onClick={voltar}
        >
          <LogOut size={22} />
          <span className="text-base font-bold">Voltar</span>
        </button>
        <h1 className="text-gray-200 text-2xl font-bold text-center w-full tracking-tight select-none">
          Usuários
        </h1>
      </div>

      <motion.button
        className="bg-green-500 p-3 h-16 rounded-2xl mt-32 shadow-xl text-white font-bold text-lg flex items-center gap-2 hover:bg-green-600 transition border-2 border-white"
        layout
        whileHover={{ scale: 1.06, y: -2 }}
        onClick={cadastrar}
      >
        <Plus size={24} /> ADICIONAR USUÁRIO
      </motion.button>

      <div className="w-full max-w-2xl mt-32 p-2 rounded-2xl bg-white/80 shadow-lg border flex items-center gap-3 glass">
        <div className="flex items-center bg-white/90 rounded-xl flex-1 px-4 shadow-inner border mr-1">
          <Search size={22} className="text-blue-400 mr-2" />
          <input
            type="text"
            placeholder="Pesquisar usuário..."
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
            <option value={""}>Ambos</option>
            <option value={1}>Ativos</option>
            <option value={0}>Inativos</option>
          </select>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-10 rounded-2xl p-5 shadow-xl glass bg-white/70 border">
        <ListaUsuarios
          setCarregando={setCarregando}
          setAviso={setAviso}
          setAvisoCor={setAvisoCor}
          setAvisoTexto={setAvisoTexto}
          filtro={filtro}
          pesquisa={pesquisa}
          navigate={navigate}
          setEditar={setEditar}
          setCadastro={setCadastro}
          setUsuario={setUsuario}
        />
      </div>
    </div>
  );
}

export default CidadeConfig;
