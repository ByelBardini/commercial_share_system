/* eslint-disable no-unused-vars */
import { ExternalLink } from 'lucide-react';
import { motion } from "framer-motion";

function CampoCidade({ cidades, navegaCidade }) {
  return (
    <div className="w-full">
      {cidades.map((cidade) => (
        <motion.div
          layout
          whileHover={{ scale: 1.03, y: -2 }}
          key={cidade.cidade_id}
          className="bg-white/90 border border-slate-200 rounded-xl p-4 my-2 flex justify-between items-center shadow-sm hover:shadow-lg transition"
        >
          <span className="text-lg font-semibold text-slate-700 tracking-tight">
            {cidade.cidade_nome} <span className="text-blue-400 font-normal">- {cidade.cidade_uf}</span>
          </span>
          <motion.button
            whileHover={{ scale: 1.15 }}
            className="rounded-full bg-blue-100 hover:bg-blue-300 transition px-2 py-2 shadow"
            onClick={() => navegaCidade(cidade.cidade_id, cidade.cidade_nome)}
            title="Acessar cidade"
          >
            <ExternalLink size={22} className="text-blue-600" />
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
export default CampoCidade;
