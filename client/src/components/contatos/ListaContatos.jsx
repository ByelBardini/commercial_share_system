/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { buscaContatos } from "../../services/api/contatoService.js";
import CampoContato from "./CampoContato.jsx";

function ListaContatos({
  navigate,
  contatos = [],
  deletando = false,
  editando = false,
  setAdicionando = false,
  setCarregando = () => {},
  setContatos = () => {},
  setContatoModificado = () => {},
  setEditando = () => {},
  setDeletando = () => {},
  setCorModal = () => {},
  setAviso = () => {},
  setOnSim = () => {},
  setModalAviso = () => {},
}) {
  async function carregaContatos() {
    setCarregando(true);
    try {
      const contatos = await buscaContatos(
        localStorage.getItem("associacao_id")
      );
      setContatos(contatos);
      console.log(contatos);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setModalAviso("Sessão inválida, realize o login");
        setCorModal("red");
        setContatos([]);
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/");
        }, 1000);
      } else {
        setModalAviso(err.message);
        setCorModal("red");
        setContatos([]);
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
        }, 1000);
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregaContatos();
  }, []);

  return (
    <div className="rounded-xl min-h-30">
      <CampoContato
        contatos={contatos}
        deletando={deletando}
        editando={editando}
        setAdicionando={setAdicionando}
        setContatos={setContatos}
        setContatoModificado={setContatoModificado}
        setEditando={setEditando}
        setDeletando={setDeletando}
        setCorModal={setCorModal}
        setAviso={setAviso}
        setOnSim={setOnSim}
        setModalAviso={setModalAviso}
      />
    </div>
  );
}

export default ListaContatos;
