/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const bordaPorCor = {
  verde: "border-green-600",
  amarela: "border-yellow-400",
  vermelha: "border-red-600",
};

export default function ModalConfirmacao({
  texto = "Tem certeza?",
  onSim,
  onNao,
  cor = "verde",
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed top-0 left-0 w-full h-full bg-black/70 z-[1000] flex items-center justify-center`}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 240, damping: 20 }}
          className={`bg-white w-full max-w-md rounded-2xl flex flex-col gap-6 p-8 shadow-2xl items-center border-4 ${bordaPorCor[cor] || bordaPorCor.verde}`}
        >
          <h2 className="text-2xl font-bold text-blue-800 text-center">
            Atenção!
          </h2>
          <p className="text-lg text-gray-700 text-center">{texto}</p>
          <div className="flex gap-4 justify-center w-full">
            <button
              onClick={onSim}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition shadow"
            >
              Sim
            </button>
            <button
              onClick={onNao}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition shadow"
            >
              Não
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
