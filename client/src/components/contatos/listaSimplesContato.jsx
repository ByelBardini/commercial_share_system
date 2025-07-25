import CampoSimplesContato from "./CampoContato.jsx";

function ListaSimplesContatos({
  contatos = [],
}) {

  return (
    <div className="rounded-xl min-h-30">
      <CampoSimplesContato
        contatos={contatos}
      />
    </div>
  );
}

export default ListaSimplesContatos;
