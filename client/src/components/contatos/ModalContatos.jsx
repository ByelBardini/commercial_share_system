/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import ListaContatos from "./ListaContatos.jsx";

function ModalContatos({ aparecer, setCarregando, setVendoContatos, contatos, setContatos }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed top-0 left-0 w-full h-full bg-black/70 z-[110] flex items-center justify-center ${aparecer}`}
      style={{ overflowY: "auto" }}
    >
      <div className="bg-white/90 glass w-full max-w-lg rounded-2xl border border-blue-200 shadow-2xl p-8">
        <div className="flex justify-center mb-2">
          <h2 className="text-2xl font-bold text-blue-800 text-center drop-shadow-sm select-none">
            Contatos
          </h2>
        </div>
        <div className="mb-2">
          <ListaContatos setCarregando={setCarregando} contatos={contatos} setContatos={setContatos} />
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="flex-1 max-w-[180px] cursor-pointer flex justify-center items-center bg-blue-700 hover:bg-blue-900 transition text-white font-bold px-8 py-3 rounded-xl text-xl shadow"
            onClick={() => setVendoContatos(false)}
          >
            OK
          </button>
        </div>
      </div>
      <style>
        {`
        .glass {
          backdrop-filter: blur(12px) saturate(120%);
          -webkit-backdrop-filter: blur(12px) saturate(120%);
        }
        `}
      </style>
    </motion.div>
  );
}

export default ModalContatos;
