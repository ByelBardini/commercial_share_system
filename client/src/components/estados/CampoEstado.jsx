/* eslint-disable no-unused-vars */
import { ExternalLink, Star } from "lucide-react";
import { favoritarCidade } from "../../services/api/cidadeService.js";
import { motion } from "framer-motion";

function CampoEstado({
  estados,
  setCarregando,
  puxaEstados,
  navegaEstado,
  setErro,
  setErroMensagem,
  navigate,
}) {
  async function favoritar(id) {
    setCarregando(true);
    try {
      await favoritarCidade(id);
      await puxaEstados();
    } catch (err) {
      if (err.message.includes("inválida")) {
        setCarregando(false);
        setErroMensagem("Sessão inválida, realize o login");
        setErro(true);
        setTimeout(() => {
          setErro(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setCarregando(false);
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

  return (
    <div className="w-full">
      {estados.map((estado) => (
        <motion.div
          layout
          whileHover={{ scale: 1.025, y: -2 }}
          key={estado.cidade_id}
          className="bg-white/90 border border-blue-100 rounded-2xl px-6 py-4 my-3 flex justify-between items-center shadow-lg hover:shadow-xl transition group"
        >
          <span className="text-xl font-bold text-blue-700 tracking-tight drop-shadow-sm select-none">
            {estado.cidade_nome}
          </span>
          <div className="flex gap-4 items-center">
            <motion.button
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.98, rotate: -4 }}
              className="rounded-full p-2 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 shadow transition group"
              onClick={() => favoritar(estado.cidade_id)}
              title={
                estado.cidade_favorito ? "Remover dos favoritos" : "Favoritar"
              }
            >
              <Star
                size={26}
                className={
                  estado.cidade_favorito
                    ? "text-yellow-400 fill-yellow-300 drop-shadow"
                    : "text-gray-300 group-hover:text-yellow-400"
                }
                fill={estado.cidade_favorito ? "#fde047" : "none"}
                strokeWidth={2}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.98, rotate: -4 }}
              className="rounded-full bg-blue-100 group-hover:bg-blue-200 hover:bg-blue-300 transition-all px-3 py-2 shadow-md border border-blue-300 active:scale-95 active:bg-blue-400"
              onClick={() => navegaEstado(estado.cidade_id, estado.cidade_nome)}
              title="Acessar cidade"
            >
              <ExternalLink size={24} className="text-blue-600" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default CampoEstado;
