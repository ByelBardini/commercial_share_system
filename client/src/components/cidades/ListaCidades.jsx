import { useState, useEffect } from "react";
import { buscarCidades } from "../../services/api/cidadeService.js"
import CampoCidade from "./CampoCidade.jsx";

function ListaCidades(){
    
    const [cidades, setCidades] = useState([]);
    
    const puxaCidades = async () => {
        const cidades = await buscarCidades();
        setCidades(cidades);
        console.log(cidades);
    }

    useEffect(() =>{
        puxaCidades();
    }, []);

    return(
        <div className="bg-white flex flex-col h-full w-full gap-2">
            <CampoCidade cidades= {cidades} />
        </div>
    )
}

export default ListaCidades;