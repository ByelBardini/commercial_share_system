/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { SquarePen, Eye } from "lucide-react";
import { getAssociacaoFull } from "../../services/api/associacaoService.js"

function CampoAssociacao({ associacoes, setCarregando, setVisualiza, setDadosAssociacao, navigate }) {

    async function visualizaAssociacao(id){
        console.log("clicado", id);
        setCarregando(true);
        const dados = await getAssociacaoFull(id);
        console.log(dados);
        setDadosAssociacao(dados);
        setCarregando(false);
        setVisualiza(true);
    }

  return (
    <div className="w-full">
      {associacoes.map((associacao) => (
        <motion.div
          layout
          whileHover={{ scale: 1.01 }}
          key={associacao.associacao_id}
          className="bg-gray-100 rounded-md p-3 m-2 shadow-md flex justify-between items-center"
        >
          <h1 className="text-xl font-bold p-1">
            {associacao.associacao_nome_fantasia}
          </h1>
          <div className="flex gap-6 items-center">
            <h1
              className={`font-bold text-xl text-white bg-green-600 rounded-xl p-2 ${
                associacao.associacao_cliente ? "" : "hidden"
              }`}
            >
              CLIENTE
            </h1>
            <motion.button
              layout
              whileHover={{ scale: 1.15 }}
              className="cursor-pointer"
              onClick={() => visualizaAssociacao(associacao.associacao_id)}
            >
              <Eye size={34} />
            </motion.button>
            <motion.button
              layout
              whileHover={{ scale: 1.15 }}
              className="cursor-pointer mr-4"
            >
              <SquarePen size={30} />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default CampoAssociacao;
