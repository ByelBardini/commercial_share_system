/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { SquarePen, Eye } from "lucide-react";
import { getAssociacaoFull } from "../../services/api/associacaoService.js";

function CampoAssociacao({
  associacoes,
  setCarregando,
  setVisualiza,
  setDadosAssociacao,
  navigate
}) {
  function modificaAssociacao(id) {
    localStorage.setItem("associacao_id", id);
    navigate("/associacao");
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
            <span className="ml-3 text-base font-semibold text-blue-400">
              {associacao.associacao_cnpj && (
                <>CNPJ: {associacao.associacao_cnpj}</>
              )}
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
