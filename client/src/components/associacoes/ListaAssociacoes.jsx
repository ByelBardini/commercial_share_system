
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getAssociacoesPorCidade } from "../../services/api/associacaoService.js";
import CampoAssociacao from "./CampoAssociacao.jsx"

function ListaAssociacoes({ pesquisa, filtroAtivo, setCarregando, associacoesRoot, setAssociacoesRoot }) {
  const [associacoes, setAssociacoes] = useState([]);

  const puxaAssociacoes = async () => {
    setCarregando(true)
    const associacoes = await getAssociacoesPorCidade(
      localStorage.getItem("id_cidade")
    );
    setAssociacoes(associacoes);
    setAssociacoesRoot(associacoes);
    setCarregando(false);
  };

  async function aplicaPesquisa(){
    const associacoesFinal = associacoesRoot.filter(
      (cidade) =>
        cidade &&
        cidade.associacao_nome_fantasia &&
        cidade.associacao_nome_fantasia
          .toLowerCase()
          .includes(pesquisa.toLowerCase()) &&
        (filtroAtivo ? String(cidade.associacao_cliente) === filtroAtivo : true)
    );
    setAssociacoes(associacoesFinal);
  }

  useEffect(() => {
    puxaAssociacoes();
  }, []);

  useEffect(() => {
    aplicaPesquisa();
  }, [pesquisa, filtroAtivo]);

  return <div className="bg-white flex flex-col h-full w-full gap-2">
    <CampoAssociacao associacoes={associacoes} />
  </div>;
}

export default ListaAssociacoes;
