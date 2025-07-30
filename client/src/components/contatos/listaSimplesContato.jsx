import CampoSimplesContato from "./CampoContato.jsx";

// Tanto esse quanto o "CampoSimples" foram criados porque não estava dando certo usar o mesmo campo pra editar empresa e pro modal
// Erro especialmente devidoàs funções que o campo da edição de empresas tem, de editar, remover, etc

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
