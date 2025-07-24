/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import ListaContatos from "./ListaContatos.jsx";

function ModalContatos({ aparecer, setCarregando, setVendoContatos, contatos, setContatos }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed top-0 left-0 w-full h-full bg-black/80 z-[100] flex items-center justify-center ${aparecer}`}
    >
      <div className="bg-white w-1/3 rounded-xl shadow-xl p-3">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
            Contatos
          </h2>
        </div>
        <ListaContatos setCarregando={setCarregando} contatos={contatos} setContatos={setContatos} />
        <div className="flex justify-center">
          <button
            className="mt-6 max-w-1/3 cursor-pointer flex-1 flex justify-center items-center bg-blue-700 hover:bg-blue-900 transition text-white font-bold px-8 py-3 rounded-lg text-xl shadow"
            onClick={() => setVendoContatos(false)}
          >
            OK
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ModalContatos;
