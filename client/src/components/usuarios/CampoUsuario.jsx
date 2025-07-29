/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Shield, UserRoundPen } from "lucide-react";

function CampoUsuario({ usuarios, setEditar, setCadastro, setUsuario }) {
  function editaUsuario(id, nome, login, role, status) {
    setEditar("editar");
    setUsuario({
      usuario_nome: nome,
      usuario_login: login,
      usuario_role: role,
      usuario_id: id,
      usuario_status: status,
    });
    setCadastro(true);
  }

  return (
    <div className="w-full">
      {usuarios.map((usuario) => (
        <motion.div
          layout
          whileHover={{ scale: 1.025, y: -2 }}
          key={usuario.usuario_id}
          className="bg-white/90 border border-blue-100 rounded-2xl px-6 py-4 my-3 flex justify-between items-center shadow-lg hover:shadow-xl transition group"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-blue-700 tracking-tight drop-shadow-sm select-none">
              {usuario.usuario_nome}
            </span>
            {usuario.usuario_role === "adm" && (
              <Shield size={18} className="text-blue-400" />
            )}
          </div>

          <div className="flex gap-2 items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`inline-block text-xs font-bold px-3 py-1 rounded-full align-middle shadow-sm tracking-wide border transition
                ${
                  usuario.usuario_ativo
                    ? "bg-green-100 border-green-300 text-green-700"
                    : "bg-red-100 border-red-300 text-red-700"
                }`}
            >
              {usuario.usuario_ativo ? "ATIVO" : "INATIVO"}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.15, rotate: 6 }}
              whileTap={{ scale: 0.95, rotate: -4 }}
              className="w-10 h-10 flex items-center justify-center rounded-full shadow-md border transition-all
             bg-blue-100 border-blue-200 hover:bg-blue-200 active:bg-blue-300"
              onClick={() =>
                editaUsuario(
                  usuario.usuario_id,
                  usuario.usuario_nome,
                  usuario.usuario_login,
                  usuario.usuario_role,
                  usuario.usuario_ativo
                )
              }
            >
              <UserRoundPen />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default CampoUsuario;
