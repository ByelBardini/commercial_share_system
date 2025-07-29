/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  cadastraUsuario,
  resetaSenha,
  inativaUsuario,
} from "../../services/api/usuarioService.js";
import ModalConfirmacao from "./../default/ModalConfirmacao.jsx";

function ModalCriaUsuario({
  setCadastro,
  setCarregando,
  setAviso,
  setAvisoCor,
  setAvisoTexto,
  navigate,
  nomeAntigo,
  loginAntigo,
  roleAntigo,
  statusAntigo,
  idAntigo,
  modo,
}) {
  const [confirmacao, setConfirmacao] = useState(false);
  const [textoConfirmacao, setTextoConfirmacao] = useState("");
  const [onSim, setOnSim] = useState("");

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    console.log(modo);
    setNome(nomeAntigo);
    setLogin(loginAntigo);
    setRole(roleAntigo);
  }, []);

  function resetarSenha() {
    setTextoConfirmacao("Você tem certeza que deseja resetar a senha?");
    setOnSim(() => confirmaResetarSenha);
    setConfirmacao(true);
  }

  function inativarUsuario() {
    setTextoConfirmacao("Você tem certeza que deseja inativar o usuário?");
    setOnSim(() => confirmaInativacao);
    setConfirmacao(true);
  }

  function ativarUsuario() {
    setTextoConfirmacao("Você tem certeza que deseja ativar o usuário?");
    setOnSim(() => confirmaInativacao);
    setConfirmacao(true);
  }

  async function confirmaInativacao() {
    setCarregando(true);
    try {
      await inativaUsuario(idAntigo);
      setAvisoCor("verde");
      setAvisoTexto(`Usuário inativado/ativado com sucesso!`);
      setAviso(true);
      setTimeout(() => {
        setAviso(false);
        setCadastro(false);
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setAvisoCor("vermelho");
        setAvisoTexto("Sessão inválida, realize o login");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setAvisoCor("vermelho");
        setAvisoTexto(err.message);
        setAviso(true);
        return;
      }
    } finally {
      setCarregando(false);
    }
  }

  async function confirmaResetarSenha() {
    setCarregando(true);
    try {
      await resetaSenha(idAntigo);
      setAvisoCor("verde");
      setAvisoTexto(`Senha resetada para "12345"`);
      setAviso(true);
      setTimeout(() => {
        setAviso(false);
        setCadastro(false);
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setAvisoCor("vermelho");
        setAvisoTexto("Sessão inválida, realize o login");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setAvisoCor("vermelho");
        setAvisoTexto(err.message);
        setAviso(true);
        return;
      }
    } finally {
      setCarregando(false);
    }
  }

  async function salvar() {
    setCarregando(true);
    if (nome == "" || login == "" || role == "") {
      setCarregando(false);
      setAvisoCor("vermelho");
      setAvisoTexto("Insira todos os dados obrigatórios");
      setAviso(true);
      return;
    }
    try {
      await cadastraUsuario(nome, login, role);
      setAvisoCor("verde");
      setAvisoTexto("Usuário cadastrado com sucesso! \nSenha: 12345");
      setAviso(true);
      setTimeout(() => {
        setAviso(false);
        setCadastro(false);
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setAvisoCor("vermelho");
        setAvisoTexto("Sessão inválida, realize o login");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setAvisoCor("vermelho");
        setAvisoTexto(err.message);
        setAviso(true);
        return;
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setCadastro(false)}
      className={`fixed top-0 left-0 w-full h-full bg-black/80 z-[100] flex items-center justify-center`}
    >
      {confirmacao && (
        <ModalConfirmacao
          texto={textoConfirmacao}
          onSim={onSim}
          cor={"amarela"}
          onNao={() => setConfirmacao(false)}
        />
      )}
      <div
        className="bg-white w-full max-w-xl rounded-2xl flex flex-col gap-4 p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="cursor-pointer absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
          onClick={() => setCadastro(false)}
          title="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
          Registrar Usuário
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-gray-700">
                Nome do Usuário
                <span className="text-red-600 ml-1">*</span>
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 100 Caracteres)
              </label>
            </div>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
              placeholder="Nome do Usuário"
              onChange={(event) => setNome(event.target.value)}
              disabled={modo === "editar"}
              value={nome}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-gray-700">
                Login do Usuário
                <span className="text-red-600 ml-1">*</span>
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 100 Caracteres)
              </label>
            </div>
            <input
              type="text"
              className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
              placeholder="Login no Sistema"
              onChange={(event) => setLogin(event.target.value)}
              disabled={modo === "editar"}
              value={login}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Cargo
            <span className="text-red-600 ml-1">*</span>
          </label>
          <select
            className="w-full bg-gray-100 rounded-lg p-2 mt-1 border focus:outline-blue-500"
            onChange={(event) => setRole(event.target.value)}
            disabled={modo === "editar"}
            value={role}
          >
            <option value="" disabled selected hidden>
              Selecione
            </option>
            <option value="adm">Administrador</option>
            <option value="usuario">Usuário</option>
          </select>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          <span className="text-red-600">*</span> Campos obrigatórios
        </p>

        {modo == "cadastro" && (
          <button
            className="cursor-pointer mt-6 bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-xl hover:bg-blue-900 transition shadow"
            onClick={salvar}
          >
            Salvar
          </button>
        )}

        {modo == "editar" && (
          <div className="flex w-full gap-5">
            <button
              className="w-1/2 cursor-pointer mt-6 bg-yellow-500 text-white font-bold px-8 py-3 rounded-lg text-xl hover:bg-yellow-700 transition shadow"
              onClick={resetarSenha}
            >
              Resetar Senha
            </button>
            {statusAntigo ? (
              <button
                className="w-1/2 cursor-pointer mt-6 bg-red-600 text-white font-bold px-8 py-3 rounded-lg text-xl hover:bg-red-800 transition shadow"
                onClick={inativarUsuario}
              >
                Inativar
              </button>
            ) : (
              <button
                className="w-1/2 cursor-pointer mt-6 bg-green-600 text-white font-bold px-8 py-3 rounded-lg text-xl hover:bg-green-800 transition shadow"
                onClick={ativarUsuario}
              >
                Ativar
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ModalCriaUsuario;
