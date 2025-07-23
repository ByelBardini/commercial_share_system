// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function ModalAviso({ aparecer, texto, className, botao, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed top-0 left-0 w-full h-full bg-black/80 z-50 flex flex-col items-center justify-center ${aparecer}`}
    >
      <div
        className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-auto ${className}`}
      >
        <h1 className="text-center text-white text-2xl font-bold mb-4">
          {texto}
        </h1>
        <button className={`cursor-pointer mt-4 bg-red-300 text-red-700 font-bold py-2 px-6 rounded shadow-md hover:bg-red-400 transition duration-200 ${botao}`} onClick={onClick}>
          OK
        </button>
      </div>
    </motion.div>
  );
}

export default ModalAviso;
