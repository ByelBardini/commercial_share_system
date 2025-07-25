/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { buscarCidades } from "../../services/api/cidadeService.js"
import CampoCidade from "./CampoCidade.jsx";

function ListaCidades({pesquisa, setUfs, navegaCidade, setCarregando}){
    
    const [cidades, setCidades] = useState([]);
    
    const puxaCidades = async () => {
        setCarregando(true);
        const cidades = await buscarCidades();
        const cidadesFinal = cidades.filter((cidade) =>
            cidade.cidade_nome.toLowerCase().includes(pesquisa.toLowerCase())
        );
        const ufs = [... new Set(cidades.map(cidade => cidade.cidade_uf))];
        setUfs(ufs)
        setCidades(cidadesFinal);
        setCarregando(false);
    }

    useEffect(() =>{
        puxaCidades();
    }, [pesquisa]);

    return(
        <div className="flex flex-col h-full w-full gap-2">
            <CampoCidade cidades= {cidades} navegaCidade={navegaCidade} setCarregando={setCarregando} puxaCidades={puxaCidades} />
        </div>
    )
}

export default ListaCidades;