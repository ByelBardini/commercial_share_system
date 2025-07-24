/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { buscaContatos } from "../../services/api/contatoService.js";
import CampoContato from "./CampoContato.jsx";

function ListaContatos({
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
    const contatos = await buscaContatos(localStorage.getItem("associacao_id"));
    setContatos(contatos);
    console.log(contatos);
    setCarregando(false);
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
