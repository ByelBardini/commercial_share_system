/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { buscarEstados } from "../../services/api/cidadeService.js";
import CampoEstado from "./CampoEstado.jsx";

function ListaEstados({
  pesquisa,
  setCarregando,
  setErro,
  navigate,
  navegaEstado,
  setErroMensagem,
}) {
  const [estados, setEstados] = useState([]);

  const puxaEstados = async () => {
    setCarregando(true);
    try {
      const estados = await buscarEstados();
      const estadosFinal = estados.filter(
        (estado) =>
          estado.cidade_nome.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setEstados(estadosFinal);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setErroMensagem("Sessão inválida, realize o login");
        setErro(true);
        setTimeout(() => {
          setErro(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setErroMensagem(err.message);
        setErro(true);
        setTimeout(() => {
          setErro(false);
        }, 1000);
      }
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    puxaEstados();
  }, [pesquisa]);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <CampoEstado
        estados={estados}
        setCarregando={setCarregando}
        puxaEstados={puxaEstados}
        setErro={setErro}
        navegaEstado={navegaEstado}
        setErroMensagem={setErroMensagem}
      />
    </div>
  );
}

export default ListaEstados;
