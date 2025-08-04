/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, validarSessao } from "../services/auth/authService.js";
import { Search, Funnel, LogOut, UsersRound, Building } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { buscarUfs } from "../services/api/cidadeService.js";
import ModalAviso from "../components/default/ModalAviso.jsx";
import ModalTrocaSenha from "../components/usuarios/modalTrocaSenha.jsx";
import ListaCidades from "../components/cidades/ListaCidades.jsx";
import Loading from "../components/default/Loading.jsx";

function Main() {
  const role = localStorage.getItem("usuario_role");

  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");

  const [pesquisa, setPesquisa] = useState("");
  const [ufs, setUfs] = useState([]);
  const [ufSelecionada, setUfSelecionada] = useState("");

  const [pesquisar, setPesquisar] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("usuario_troca_senha") == 1) setNovaSenha(true);
    document.title = "Cidades - Share Comercial";
    puxaUfs();
    sessaoValida();
  }, []);

  async function sessaoValida() {
    setCarregando(true);
    try {
      await validarSessao();
    } catch (err) {
      if (err.message.includes("inválida")) {
        setErroMensagem("Sessão inválida, realize o login");
        setErro(true);
        setTimeout(() => {
          setErro(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setErroMensagem(err.message);
        setErro(true);
        setTimeout(() => {
          setErro(false);
        }, 1000);
      }
    } finally {
      setCarregando(false);
    }
  }

  async function puxaUfs(){
    
    setCarregando(true);
    try {
      const ufs = await buscarUfs();

      setUfs(ufs);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setErroMensagem("Sessão inválida, realize o login");
        setErro(true);
        setTimeout(() => {
          setErro(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setErroMensagem(err.message);
        setErro(true);
        setTimeout(() => {
          setErro(false);
        }, 1000);
      }
    } finally {
      setCarregando(false);
    }
  }

  async function sair() {
    setCarregando(true);
    await logout();
    setCarregando(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  function navegaCidade(id_cidade, nome_cidade) {
    localStorage.setItem("id_cidade", id_cidade);
    localStorage.setItem("nome_cidade", nome_cidade);
    localStorage.setItem("estado_lista", "empresas");
    navigate("/cidade", { replace: true });
  }

  return (
    <div className="relative min-h-screen w-screen flex flex-col justify-center items-center p-6 overflow-x-hidden">
      <div className="animated-gradient" />
      {carregando && <Loading />}
      <AnimatePresence>
        {novaSenha && (
          <ModalTrocaSenha
            setNovaSenha={setNovaSenha}
            setCarregando={setCarregando}
            setErro={setErro}
            setErroMensagem={setErroMensagem}
            navigate={navigate}
          />
        )}
      </AnimatePresence>
      {erro && (
        <ModalAviso cor="vermelho" botao="hidden" texto={erroMensagem} />
      )}
      <div className="bg-blue-600/65  w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-8 glass shadow-lg backdrop-blur-md">
        <div />
        {role == "adm" && (
          <button
            className="text-white p-2 rounded-full hover:bg-blue-200 transition hover:text-blue-500"
            onClick={() => navigate("/usuario", { replace: true })}
          >
            <UsersRound size={30} />
          </button>
        )}
        <h1 className="text-gray-200 text-2xl font-bold text-center w-full tracking-tight select-none">
          Bem-vindo(a),{" "}
          <span className="text-blue-300">
            {localStorage.getItem("usuario_nome")}
          </span>
        </h1>
        <button
          className="flex gap-2 items-center text-gray-200 hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-100"
          onClick={sair}
          title="Sair"
        >
          <LogOut size={22} />
          <span className="text-base font-bold">Sair</span>
        </button>
      </div>

      <motion.button
        className="bg-green-500 p-3 h-16 rounded-2xl mt-32 shadow-xl text-white font-bold text-lg flex items-center gap-2 hover:bg-green-600 transition border-2 border-white"
        layout
        whileHover={{ scale: 1.06, y: -2 }}
        onClick={() => navigate("/estado", { replace: true })}
      >
        <Building size={24} /> ASSOCIAÇÕES POR ESTADO
      </motion.button>

      <div className="w-full max-w-4xl mt-10 p-4 rounded-2xl bg-white/80 shadow-xl border flex items-center gap-3 glass">
        <div className="flex items-center bg-white/90 rounded-xl flex-1 px-4 shadow-inner border mr-1">
          <Search size={22} className="text-blue-400 mr-2" />
          <input
            type="text"
            placeholder="Pesquisar cidade..."
            id="pesquisa-cidade"
            className="w-full bg-transparent p-3 rounded-md text-lg outline-none border-none placeholder-gray-400"
            onChange={(event) => setPesquisa(event.target.value)}
          />
        </div>

        <div className="flex items-center bg-white rounded-xl px-3 h-12 shadow-inner border min-w-[100px] transition focus-within:ring-2 focus-within:ring-blue-400">
          <Funnel size={20} className="text-blue-400 mr-2" />
          <select
            className="bg-transparent text-base outline-none w-full"
            value={ufSelecionada}
            onChange={(e) => setUfSelecionada(e.target.value)}
          >
            <option value="" disabled hidden>
              UF
            </option>
            <option value="">Todos</option>
            {ufs.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>

        <button
          className="h-12 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-md transition"
          onClick={() => setPesquisar(1)}
        >
          Pesquisar
        </button>
      </div>

      <div className="w-full max-w-2xl mt-10 rounded-2xl p-5 shadow-xl glass bg-white/70 border">
        <ListaCidades
          pesquisa={pesquisa}
          pesquisar={pesquisar}
          setPesquisar={setPesquisar}
          ufSelecionada={ufSelecionada}
          navegaCidade={navegaCidade}
          setCarregando={setCarregando}
          setErro={setErro}
          navigate={navigate}
          setErroMensagem={setErroMensagem}
        />
      </div>
    </div>
  );
}
export default Main;
