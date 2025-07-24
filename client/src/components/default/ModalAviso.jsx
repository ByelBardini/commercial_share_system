// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

function getIcon(className) {
  if (className?.includes("red"))
    return <AlertTriangle size={40} className="text-red-400 mb-2" />;
  if (className?.includes("green"))
    return <CheckCircle size={40} className="text-green-400 mb-2" />;
  if (className?.includes("blue"))
    return <Info size={40} className="text-blue-400 mb-2" />;
  return <Info size={40} className="text-gray-400 mb-2" />;
}

function ModalAviso({ aparecer, texto, className = "", botao = "", onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.18, type: "spring", bounce: 0.12 }}
      className={`fixed top-0 left-0 w-full h-full bg-black/70 z-[500] flex items-center justify-center ${aparecer}`}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.18, type: "spring", bounce: 0.13 }}
        className={`flex flex-col items-center gap-4 justify-center p-8 rounded-2xl shadow-2xl bg-white w-full max-w-sm mx-auto border-t-8 ${
          className.includes("red")
            ? "border-red-400"
            : className.includes("green")
            ? "border-green-400"
            : className.includes("blue")
            ? "border-blue-400"
            : className.includes("yellow")
            ? "border-yellow-400"
            : "border-gray-300"
        } ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {getIcon(className)}
        <h1 className="text-center text-gray-800 text-2xl font-bold mb-1">
          {texto}
        </h1>
        <button
          className={`cursor-pointer mt-2 bg-gray-100 text-gray-800 font-bold py-2 px-8 rounded-lg shadow hover:bg-gray-200 transition ${botao}`}
          onClick={onClick}
          autoFocus
        >
          OK
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ModalAviso;
