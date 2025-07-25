/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { SquarePen, Eye, Star } from "lucide-react";
import { getAssociacaoFull, favoritarAssociacao } from "../../services/api/associacaoService.js";

function CampoAssociacao({
  associacoes,
  setCarregando,
  puxaAssociacoes,
  setVisualiza,
  setDadosAssociacao,
  navigate
}) {
  async function favoritar(id){
    setCarregando(true);
    await favoritarAssociacao(id);
    await puxaAssociacoes();
    setCarregando(false);
  }

  function modificaAssociacao(id) {
    localStorage.setItem("associacao_id", id);
    navigate("/empresa");
  }

  async function visualizaAssociacao(id) {
    setCarregando(true);
    const dados = await getAssociacaoFull(id);
    localStorage.setItem("associacao_id", id);
    setDadosAssociacao(dados);
    setCarregando(false);
    setVisualiza(true);
  }

  return (
    <div className="w-full">
      {associacoes.map((associacao) => (
        <motion.div
          layout
          whileHover={{ scale: 1.025, y: -2 }}
          key={associacao.associacao_id}
          className="bg-white/90 border border-blue-100 rounded-2xl px-6 py-4 my-3 flex justify-between items-center shadow-lg hover:shadow-xl transition group"
        >
          <div>
            <span className="text-xl font-bold text-blue-700 tracking-tight drop-shadow-sm select-none">
              {associacao.associacao_nome_fantasia}
            </span>
            {associacao.associacao_cliente ? (
              <span className="ml-4 inline-block bg-green-100 border border-green-300 text-green-700 text-xs font-bold px-3 py-1 rounded-full align-middle shadow-sm tracking-wide">
                CLIENTE
              </span>
            ) : null}
          </div>
          <div className="flex gap-2 items-center">
            <motion.button
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.98, rotate: -4 }}
              className="rounded-full p-2 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 shadow transition group"
              onClick={() => favoritar(associacao.associacao_id)}
              title={associacao.associacao_favorito ? "Remover dos favoritos" : "Favoritar"}
            >
              <Star
                size={26}
                className={associacao.associacao_favorito
                  ? "text-yellow-400 fill-yellow-300 drop-shadow"
                  : "text-gray-300 group-hover:text-yellow-400"
                }
                fill={associacao.associacao_favorito ? "#fde047" : "none"}
                strokeWidth={2}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.98, rotate: -4 }}
              className="rounded-full bg-blue-100 group-hover:bg-blue-200 hover:bg-blue-300 transition-all px-3 py-2 shadow-md border border-blue-300 active:scale-95 active:bg-blue-400"
              onClick={() => visualizaAssociacao(associacao.associacao_id)}
              title="Visualizar associação"
            >
              <Eye size={22} className="text-blue-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.98, rotate: -4 }}
              className="rounded-full bg-yellow-100 group-hover:bg-yellow-200 hover:bg-yellow-300 transition-all px-3 py-2 shadow-md border border-yellow-300 active:scale-95 active:bg-yellow-400"
              onClick={() => modificaAssociacao(associacao.associacao_id)}
              title="Editar associação"
            >
              <SquarePen size={20} className="text-yellow-700" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default CampoAssociacao;
