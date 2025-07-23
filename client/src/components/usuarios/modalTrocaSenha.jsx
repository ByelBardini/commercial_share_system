// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { trocaSenhaUsuario } from "../../services/auth/usuarioService.js";
import ModalAviso from "../default/ModalAviso.jsx"

function ModalTrocaSenha({ aparecer, setNovaSenha }) {

    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [erro, setErro] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    async function confirmaTroca() {
        if( senha != confirmaSenha){
            setErro(true);
        }else{
            const data = await trocaSenhaUsuario(senha);
            if(data){
                setSucesso(true);
                setTimeout(() => {
                    setSucesso(false);
                    setNovaSenha(false);
                    localStorage.setItem("usuario_troca_senha", 0);
                }, 500);
            }
        }
    }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed top-0 left-0 w-full h-full bg-black/80 z-100 flex flex-col items-center justify-center ${aparecer}`}
    >
    <ModalAviso texto="As duas senhas devem ser iguais!" className="bg-red-600" aparecer={`${erro ? "" : "hidden"}`} onClick={()=> setErro(false)}  />
    <ModalAviso texto="Senha trocada com sucesso!" className="bg-green-600" aparecer={`${sucesso ? "" : "hidden"}`} botao="hidden" />
        <div
        className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg w-1/3 h-2/3 overflow-auto bg-white`}
      >
        <h1 className="text-3xl font-bold">Insira a nova senha</h1>
        <h1 className="text-2xl font-bold mt-10">Senha</h1>
        <input
          type="password"
          placeholder="Nova Senha"
          id="usuario_login"
          className=" border-gray-500 border-2 w-11/12 rounded-md text-gray-800 px-4 py-2 text-2xl active:bg-gray-100 focus:outline-none focus:ring-0 mb-6"
          onChange={(event) => setSenha(event.target.value)}
        />
        <h1 className="text-2xl font-bold mt-5">Confirme sua Senha</h1>
        <input
          type="password"
          placeholder="Confirme a Nova Senha"
          id="usuario_login"
          className=" border-gray-500 border-2 w-11/12 rounded-md text-gray-800 px-4 py-2 text-2xl active:bg-gray-100 focus:outline-none focus:ring-0 mb-6"
          onChange={(event) => setConfirmaSenha(event.target.value)}
        />

        <button className="bg-blue-700 text-white font-bold px-6 py-2 rounded-md text-xl hover:bg-blue-900 transition duration-300 ease-in-out"
        onClick={confirmaTroca}>
          OK
        </button>
      </div>
    </motion.div>
  );
}

export default ModalTrocaSenha;
