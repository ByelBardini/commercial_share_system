// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { trocaSenhaUsuario } from "../../services/api/usuarioService.js";
import ModalAviso from "../default/ModalAviso.jsx";

function ModalTrocaSenha({ setNovaSenha, setCarregando }) {
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function confirmaTroca() {
    if (senha != confirmaSenha) {
      setErro(true);
    } else {
      setCarregando(true);
      const data = await trocaSenhaUsuario(senha);
      if (data) {
        setCarregando(false);
        setSucesso(true);
        setTimeout(() => {
          setSucesso(false);
          setNovaSenha(false);
          localStorage.setItem("usuario_troca_senha", 0);
        }, 500);
      }
      setCarregando(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70"
    >
      <AnimatePresence>
        {erro && (
          <ModalAviso
            texto="As duas senhas devem ser iguais!"
            cor="vermelho"
            onClick={() => setErro(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sucesso && (
          <ModalAviso
            texto="Senha trocada com sucesso!"
            cor="verde"
            botao="hidden"
          />
        )}
      </AnimatePresence>
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 relative animate-fade-in">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Nova senha</h1>
        <div className="w-full flex flex-col gap-2">
          <label className="text-lg font-semibold text-blue-800 mb-1">Senha</label>
          <input
            type="password"
            placeholder="Nova senha"
            className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
            onChange={(event) => setSenha(event.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-2 mt-2">
          <label className="text-lg font-semibold text-blue-800 mb-1">Confirme a senha</label>
          <input
            type="password"
            placeholder="Confirme a nova senha"
            className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
            onChange={(event) => setConfirmaSenha(event.target.value)}
          />
        </div>
        <button
          className="mt-6 w-full bg-blue-700 hover:bg-blue-900 transition text-white font-bold py-3 rounded-xl text-xl shadow-lg"
          onClick={confirmaTroca}
        >
          Trocar senha
        </button>
      </div>
    </motion.div>
  );
}

export default ModalTrocaSenha;
