import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth/authService.js";
import ModalAviso from "../components/default/ModalAviso.jsx";

function Login() {
  const navigate = useNavigate();

  const [usuario_login, setLogin] = useState("");
  const [usuario_senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);
  const [erro, setErro] = useState(false);

  async function logar(){
    if(!usuario_login || !usuario_senha) {
      setErro(true);
      return;
    }
    const data = await login(usuario_login, usuario_senha);
    if(data) {
      console.log(data)
      const { usuario_nome, usuario_troca_senha} = data;
      localStorage.setItem("usuario_nome", usuario_nome);
      if(usuario_troca_senha !=0){
        localStorage.setItem("usuario_troca_senha", usuario_troca_senha);
      }
      setLogado(true);
      setTimeout(() => {
        setLogado(false);
        navigate("/home");
      }, 500);
    }
  }

  return (
    <div className="bg-blue-700 min-h-screen w-screen flex justify-center items-center p-6">
      <ModalAviso texto="Necessário Login e Senha!" className="bg-red-600" aparecer={`${erro ? "" : "hidden"}`} onClick={()=> setErro(false)} />
      <ModalAviso texto="Login realizado com sucesso!" className="bg-green-600" aparecer={`${logado ? "" : "hidden"}`} botao={"hidden"} />
      <div className="bg-white w-1/3 max-h-[90vh] rounded-lg shadow-lg gap-2 overflow-auto p-2">
        <img
          src="./src/assets/empresa-logo.png"
          alt="Logo"
          className=" w-1/2 mx-auto mt-4 rounded-lg shadow-lg bg-transparent p-2 transition duration-300 ease-in-out hover:scale-105"
        />
        <div className="flex flex-col items-center justify-center h-full p-2">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <input
            type="text"
            placeholder="Usuário"
            id="usuario_login"
            className=" border-gray-500 border-2 w-11/12 rounded-md text-gray-800 px-4 py-2 text-2xl active:bg-gray-100 focus:outline-none focus:ring-0 mb-6"
            onChange={(event) => setLogin(event.target.value)}
          />
          <h1 className="text-2xl font-bold mb-4">Senha</h1>
          <input
            type="password"
            placeholder="Senha"
            id="usuario-senha"
            className=" border-gray-500 border-2 w-11/12 rounded-md text-gray-800 px-4 py-2 text-2xl active:bg-gray-100 focus:outline-none focus:ring-0 mb-6"
            onChange={(event) => setSenha(event.target.value)}
          />
          <button
            className="bg-blue-700 text-white font-bold px-6 py-2 rounded-md text-xl hover:bg-blue-900 transition duration-300 ease-in-out"
            onClick={logar}
          >
            Login
          </button>
          <h1 className="text-sm font-bold mb-4 text-center px-2">
            Para conseguir seu login e senha, entre em contato com o setor de TI
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Login;
