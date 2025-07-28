import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth/authService.js";
import ModalAviso from "../components/default/ModalAviso.jsx";
import Loading from "../components/default/Loading.jsx";

function Login() {
  const navigate = useNavigate();

  const [usuario_login, setLogin] = useState("");
  const [usuario_senha, setSenha] = useState("");

  const [logado, setLogado] = useState(false);
  const [erro, setErro] = useState(false);
  const [erroMensagem, setErroMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    document.title = "Login - Share Comercial";
  }, []);

  async function logar() {
    if (!usuario_login || !usuario_senha) {
      setErroMensagem("Login e senha obrigatórios!");
      setErro(true);
      return;
    }
    setCarregando(true);
    try {
      const data = await login(usuario_login, usuario_senha);

      const { usuario_nome, usuario_troca_senha } = data;
      localStorage.setItem("usuario_nome", usuario_nome);
      if (usuario_troca_senha != 0) {
        localStorage.setItem("usuario_troca_senha", usuario_troca_senha);
      }
      setCarregando(false);
      setLogado(true);
      setTimeout(() => {
        setLogado(false);
        navigate("/home", { replace: true });
      }, 500);
    } catch (error) {
      if (error.message.includes("obrigatórios")) {
        setErroMensagem("Você precisa preencher todos os campos.");
        setErro(true);
      } else if (error.message.includes("incorretos")) {
        setErroMensagem("Usuário ou senha inválidos.");
        setErro(true);
      } else if (error.message.includes("interno")) {
        setErroMensagem("Ocorreu um erro no servidor. Tente mais tarde.");
        setErro(true);
      } else {
        setErroMensagem(error.message);
        setErro(true);
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="relative min-h-screen w-screen flex justify-center items-center p-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-36 -left-32 w-[450px] h-[450px] rounded-full bg-blue-500 opacity-40 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[220px] h-[220px] rounded-full bg-cyan-600 opacity-30 blur-2xl animate-pulse delay-500" />
        <div className="absolute -bottom-24 right-0 w-[420px] h-[420px] rounded-full bg-blue-900 opacity-30 blur-3xl animate-pulse" />
        <div className="absolute top-16 right-36 w-[180px] h-[180px] rounded-full bg-indigo-500 opacity-20 blur-2xl animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 via-blue-500/60 to-blue-300/80 z-0" />
      </div>

      {carregando && <Loading />}
      {erro && (
        <ModalAviso
          texto={erroMensagem}
          cor="vermelho"
          onClick={() => setErro(false)}
        />
      )}
      {logado && (
        <ModalAviso
          texto="Login realizado com sucesso!"
          cor="verde"
          botao={"hidden"}
        />
      )}

      <div className="relative z-10 bg-white/70 backdrop-blur-2xl w-full max-w-md rounded-3xl shadow-2xl flex flex-col gap-3 p-10 items-center border border-blue-200">
        <img
          src="./src/assets/empresa-logo.png"
          alt="Logo"
          className="w-42 h-26 object-contain mx-auto mt-2 rounded-full shadow-lg"
        />
        <h1 className="text-4xl font-extrabold text-blue-800 mb-7 mt-2 tracking-tight drop-shadow-sm">
          Login
        </h1>
        <div className="flex flex-col w-full gap-2">
          <input
            type="text"
            placeholder="Usuário"
            id="usuario_login"
            className="border border-blue-100 bg-white/60 focus:bg-white transition rounded-xl text-gray-800 px-4 py-3 text-lg font-semibold focus:outline-blue-400 shadow-sm mb-2"
            onChange={(event) => setLogin(event.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Senha"
            id="usuario-senha"
            className="border border-blue-100 bg-white/60 focus:bg-white transition rounded-xl text-gray-800 px-4 py-3 text-lg font-semibold focus:outline-blue-400 shadow-sm mb-3"
            onChange={(event) => setSenha(event.target.value)}
          />
        </div>
        <button
          className="w-full cursor-pointer bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl text-xl shadow-lg hover:bg-blue-900 active:scale-95 transition duration-200"
          onClick={logar}
        >
          Entrar
        </button>
        <p className="text-xs font-semibold text-gray-500 mt-3 text-center px-2">
          Para conseguir seu login e senha, entre em contato com o setor de TI.
        </p>
      </div>
    </div>
  );
}

export default Login;
