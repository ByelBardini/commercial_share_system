/* eslint-disable react-hooks/exhaustive-deps */
import CampoUsuario from "./CampoUsuario.jsx";
import { useState, useEffect } from "react";
import { buscaUsuarios } from "../../services/api/usuarioService.js";

function ListaUsuarios({
  setCarregando,
  setAviso,
  setAvisoCor,
  setAvisoTexto,
  filtro,
  pesquisa,
  navigate,
  setEditar,
  setCadastro,
  setUsuario,
}) {
  const [usuarios, setUsuarios] = useState([]);

  const puxaUsuarios = async () => {
    setCarregando(true);
    try {
      const usuarios = await buscaUsuarios();
      const usuariosFinal = Array.isArray(usuarios)
        ? usuarios.filter(
            (usuario) =>
              usuario.usuario_nome
                .toLowerCase()
                .includes(pesquisa.toLowerCase()) &&
              (filtro ? String(usuario.usuario_ativo) === filtro : true)
          )
        : [];
      setUsuarios(usuariosFinal);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setAvisoTexto("Sessão inválida, realize o login");
        setAvisoCor("vermelho");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setAvisoTexto(err.message);
        setAvisoCor("vermelho");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
        }, 1000);
      }
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    puxaUsuarios();
  }, [pesquisa, filtro]);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <CampoUsuario
        usuarios={usuarios}
        setCarregando={setCarregando}
        setAviso={setAviso}
        setAvisoCor={setAvisoCor}
        setAvisoTexto={setAvisoTexto}
        setEditar={setEditar}
        setCadastro={setCadastro}
        setUsuario={setUsuario}
      />
    </div>
  );
}

export default ListaUsuarios;
