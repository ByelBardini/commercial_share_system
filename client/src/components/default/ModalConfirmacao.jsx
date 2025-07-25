/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const bordaPorCor = {
  verde: "border-green-300",
  amarela: "border-yellow-300",
  vermelha: "border-red-300",
};

const bgPorCor = {
  verde: "bg-green-50",
  amarela: "bg-yellow-50",
  vermelha: "bg-red-50",
};

const btnPorCor = {
  verde: "bg-green-300 hover:bg-green-400 text-green-900",
  amarela: "bg-yellow-300 hover:bg-yellow-400 text-yellow-900",
  vermelha: "bg-red-300 hover:bg-red-400 text-red-900",
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
        className="fixed top-0 left-0 w-full h-full bg-black/60 z-[1000] flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 28 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 28 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className={`
            ${bgPorCor[cor] || bgPorCor.verde}
            backdrop-blur-lg border-2 ${bordaPorCor[cor] || bordaPorCor.verde}
            rounded-2xl w-full max-w-md flex flex-col gap-6 
            p-8 shadow-xl items-center
          `}
        >
          <h2 className="text-2xl font-bold text-blue-800 text-center drop-shadow-sm select-none">
            Atenção!
          </h2>
          <p className="text-lg text-gray-700 text-center font-medium select-none">
            {texto}
          </p>
          <div className="flex gap-3 justify-center w-full">
            <button
              onClick={onSim}
              className={`flex-1 px-6 py-3 font-bold rounded-lg transition-all shadow ${
                btnPorCor[cor] || btnPorCor.verde
              }`}
            >
              Sim
            </button>
            <button
              onClick={onNao}
              className="flex-1 px-6 py-3 font-bold rounded-lg transition-all shadow bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Não
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
