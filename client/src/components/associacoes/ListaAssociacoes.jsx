/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getAssociacoesPorCidade } from "../../services/api/associacaoService.js";
import CampoAssociacao from "./CampoAssociacao.jsx";

function ListaAssociacoes({
  pesquisa,
  filtroAtivo,
  setCarregando,
  associacoesRoot,
  setAssociacoesRoot,
  setVisualiza,
  setDadosAssociacao,
  navigate,
  setErro,
  setErroMensagem,
}) {
  const [associacoes, setAssociacoes] = useState([]);

  const puxaAssociacoes = async () => {
    setCarregando(true);
    try {
      const associacoes = await getAssociacoesPorCidade(
        localStorage.getItem("id_cidade")
      );
      setAssociacoes(associacoes);
      setAssociacoesRoot(associacoes);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setErroMensagem("Sessão inválida, realize o login");
        setErro(true);
        setTimeout(() => {
          setErro(false);
          navigate("/");
        }, 1000);
      } else {
        setCarregando(false);
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

  async function aplicaPesquisa() {
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

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <CampoAssociacao
        puxaAssociacoes={puxaAssociacoes}
        associacoes={associacoes}
        navigate={navigate}
        setCarregando={setCarregando}
        setVisualiza={setVisualiza}
        setDadosAssociacao={setDadosAssociacao}
        setErro={setErro}
        setErroMensagem={setErroMensagem}
      />
    </div>
  );
}

export default ListaAssociacoes;
