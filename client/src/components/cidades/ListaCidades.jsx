/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { buscarCidades } from "../../services/api/cidadeService.js";
import CampoCidade from "./CampoCidade.jsx";

function ListaCidades({
  pesquisa,
  setUfs,
  navegaCidade,
  setCarregando,
  setErro,
  navigate,
  setErroMensagem,
  ufSelecionada,
}) {
  const [cidades, setCidades] = useState([]);

  const puxaCidades = async () => {
    setCarregando(true);
    try {
      const cidades = await buscarCidades();
      console.log(cidades);
      const cidadesFinal = cidades.filter(
        (cidade) =>
          cidade.cidade_nome.toLowerCase().includes(pesquisa.toLowerCase()) &&
          cidade.cidade_uf.includes(ufSelecionada)
      );
      const ufs = [...new Set(cidades.map((cidade) => cidade.cidade_uf))];
      setUfs(ufs);
      setCidades(cidadesFinal);
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
    puxaCidades();
  }, [pesquisa, ufSelecionada]);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <CampoCidade
        cidades={cidades}
        navegaCidade={navegaCidade}
        setCarregando={setCarregando}
        puxaCidades={puxaCidades}
        setErro={setErro}
        setErroMensagem={setErroMensagem}
      />
    </div>
  );
}

export default ListaCidades;
