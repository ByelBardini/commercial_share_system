/* eslint-disable no-unused-vars */
import { ExternalLink } from 'lucide-react';
import { motion } from "framer-motion";

function CampoCidade({ cidades, navegaCidade }) {

  return (
    <div className="w-full">
      {cidades.map((cidade) => (
        <motion.div
          layout
          whileHover={{ scale: 1.01 }}
          key={cidade.cidade_id}
          className="bg-gray-100 rounded-md p-3 m-2 shadow-md flex justify-between items-center"
        >
          <h1 className="text-xl font-bold p-1">{cidade.cidade_nome} - {cidade.cidade_uf}</h1>
          <motion.button 
          layout
          whileHover={{ scale: 1.15 }}
          className='rounded-full cursor-pointer'
          onClick={() => navegaCidade(cidade.cidade_id, cidade.cidade_nome)}>
            <ExternalLink size={30} className='mr-2' />
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}

export default CampoCidade;
