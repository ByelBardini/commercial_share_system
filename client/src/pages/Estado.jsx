/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validarSessao } from "../services/auth/authService.js";
import { Search, LogOut } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ModalAviso from "../components/default/ModalAviso.jsx";
import ListaEstados from "../components/estados/ListaEstados.jsx";
import Loading from "../components/default/Loading.jsx";

function Estado() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");

  const [pesquisa, setPesquisa] = useState("");

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

  function navegaEstado(id_cidade, nome_cidade) {
    localStorage.setItem("id_cidade", id_cidade);
    localStorage.setItem("nome_cidade", nome_cidade);
    localStorage.setItem("estado_lista", "associacoes");
    navigate("/cidade", { replace: true });
  }

  useEffect(() => {
    document.title = "Estados - Share Comercial";
    sessaoValida();
  }, []);

  return (
    <div className="relative min-h-screen w-screen flex flex-col justify-center items-center p-6 overflow-x-hidden">
      <div className="animated-gradient" />
      {carregando && <Loading />}
      <AnimatePresence>
        {erro && (
          <ModalAviso cor="vermelho" botao="hidden" texto={erroMensagem} />
        )}
      </AnimatePresence>
      <div className="bg-blue-600/65  w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-8 glass shadow-lg backdrop-blur-md">
        <div />
        <button
          className="flex gap-2 items-center text-gray-200 hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-100"
          title="Voltar"
          onClick={() => navigate("/home", { replace: true })}
        >
          <LogOut size={22} />
          <span className="text-base font-bold">Voltar</span>
        </button>
        <h1 className="text-gray-200 text-2xl font-bold text-center w-full tracking-tight select-none">
          Bem-vindo(a),{" "}
          <span className="text-blue-300">
            {localStorage.getItem("usuario_nome")}
          </span>
        </h1>
      </div>

      <div className="w-full max-w-2xl mt-32 p-2 rounded-2xl bg-white/80 shadow-lg border flex items-center gap-3 glass">
        <div className="flex items-center bg-white/90 rounded-xl flex-1 px-4 shadow-inner border mr-1">
          <Search size={22} className="text-blue-400 mr-2" />
          <input
            type="text"
            placeholder="Pesquisar estado..."
            id="pesquisa-cidade"
            className="w-full bg-transparent p-3 rounded-md text-lg outline-none border-none placeholder-gray-400"
            onChange={(event) => setPesquisa(event.target.value)}
          />
        </div>
      </div>

      <div className="w-full max-w-2xl mt-10 rounded-2xl p-5 shadow-xl glass bg-white/70 border">
        <ListaEstados
          navegaEstado={navegaEstado}
          pesquisa={pesquisa}
          setCarregando={setCarregando}
          setErro={setErro}
          navigate={navigate}
          setErroMensagem={setErroMensagem}
        />
      </div>
    </div>
  );
}

export default Estado;
