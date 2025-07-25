/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

function CampoSimplesContato({ contatos }) {
  return (
    <div className="w-full">
      {contatos.map((contato) => (
        <motion.div
          layout
          whileHover={{ scale: 1.02, y: -1 }}
          key={contato.contato_id}
          className={`
    bg-white/90 border border-blue-100 rounded-2xl 
    px-4 py-2 my-2 flex justify-between items-center 
    shadow-lg hover:shadow-xl transition group
    }`}
        >
          <div>
            <h1 className="text-lg font-bold text-blue-800 p-0.5 select-none drop-shadow-sm">
              {contato.contato_nome}
            </h1>
            <span className="block text-sm text-blue-500 font-semibold select-none pl-1">
              {contato.contato_tipo === "telefone" ? (
                <span className="inline-flex items-center">
                  <Phone size={15} className="mr-1" /> {contato.contato}
                </span>
              ) : (
                <span className="inline-flex items-center">
                  <Mail size={15} className="mr-1" /> {contato.contato}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-2"></div>
        </motion.div>
      ))}
    </div>
  );
}

export default CampoSimplesContato;
