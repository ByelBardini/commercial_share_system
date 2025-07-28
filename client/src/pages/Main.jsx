/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, validarSessao } from "../services/auth/authService.js";
import { Search, Funnel, LogOut } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ModalAviso from "../components/default/ModalAviso.jsx";
import ModalTrocaSenha from "../components/usuarios/modalTrocaSenha.jsx";
import ListaCidades from "../components/cidades/ListaCidades.jsx";
import Loading from "../components/default/Loading.jsx";

function Main() {
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");

  const [pesquisa, setPesquisa] = useState("");
  const [ufs, setUfs] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("usuario_troca_senha") == 1) setNovaSenha(true);
    document.title = "Cidades - Share Comercial";
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
    }finally {
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
      <AnimatePresence>
        {erro && (
          <ModalAviso cor="vermelho" botao="hidden" texto={erroMensagem} />
        )}
      </AnimatePresence>

      <div className="bg-blue-600/65  w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-8 glass shadow-lg backdrop-blur-md">
        <div />
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

      <div className="w-full max-w-2xl mt-32 p-2 rounded-2xl bg-white/80 shadow-lg border flex items-center gap-3 glass">
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
        <div className="flex items-center bg-white/90 rounded-xl px-4 shadow-inner border ml-1">
          <Funnel size={20} className="text-blue-400 mr-2" />
          <select
            className="bg-transparent p-2 rounded-md text-lg outline-none border-none placeholder-gray-400 min-w-[70px]"
            value={ufs}
            onChange={(e) => setUfs(e.target.value)}
          >
            <option value="" disabled defaultValue={"Filtrar"} hidden>
              UF
            </option>
            {ufs.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-10 rounded-2xl p-5 shadow-xl glass bg-white/70 border">
        <ListaCidades
          pesquisa={pesquisa}
          setUfs={setUfs}
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
