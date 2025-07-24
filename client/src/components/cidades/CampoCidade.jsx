/* eslint-disable no-unused-vars */
import { ExternalLink } from 'lucide-react';
import { motion } from "framer-motion";

function CampoCidade({ cidades, navegaCidade }) {
  return (
    <div className="w-full">
      {cidades.map((cidade) => (
        <motion.div
          layout
          whileHover={{ scale: 1.025, y: -2 }}
          key={cidade.cidade_id}
          className="bg-white/90 border border-blue-100 rounded-2xl px-6 py-4 my-3 flex justify-between items-center shadow-lg hover:shadow-xl transition group"
        >
          <span className="text-xl font-bold text-blue-700 tracking-tight drop-shadow-sm select-none">
            {cidade.cidade_nome}
            <span className="ml-2 text-lg font-semibold text-blue-400 drop-shadow-none">
              - {cidade.cidade_uf}
            </span>
          </span>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 6 }}
            whileTap={{ scale: 0.98, rotate: -4 }}
            className="rounded-full bg-blue-100 group-hover:bg-blue-200 hover:bg-blue-300 transition-all px-3 py-2 shadow-md border border-blue-300 active:scale-95 active:bg-blue-400"
            onClick={() => navegaCidade(cidade.cidade_id, cidade.cidade_nome)}
            title="Acessar cidade"
          >
            <ExternalLink size={24} className="text-blue-600" />
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}

export default CampoCidade;
