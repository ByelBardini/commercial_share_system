import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth/authService.js";
import ModalTrocaSenha from "../components/usuarios/modalTrocaSenha.jsx";
import ListaCidades from "../components/cidades/ListaCidades.jsx";
import Loading from "../components/default/Loading.jsx";

function Main(){
    const navigate = useNavigate();

    const [novaSenha, setNovaSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);

    useEffect(() =>{
        if(localStorage.getItem("usuario_troca_senha") == 1){
            setNovaSenha(true);
        }
    }, []);

    async function sair(){
        setCarregando(true);
        await logout();
        setCarregando(false);
        localStorage.clear();
        navigate("/");
    }

    return(
        <div className="bg-gray-300 min-h-screen max-w-screen flex flex-col justify-center items-center p-6
        ">
            <Loading aparecer={`${carregando ? "" : "hidden"}`} />
            <ModalTrocaSenha aparecer={`${novaSenha ? "" : "hidden"}`} setNovaSenha={setNovaSenha} setCarregando={setCarregando} />
            <div className="w-screen h-16 bg-blue-800 fixed top-0 left-0 z-50 flex items-center justify-between px-4">
                <button className="bg-red-400 rounded-xl text-xl font-bold px-4 py-1 text-white hover:bg-red-500 transition shadow-2xl" onClick={sair}>Sair</button>
                <h1 className="text-white text-2xl font-bold text-center w-full rounded shadow-2xl">{`Bem-vindo(a) ${localStorage.getItem("usuario_nome")}`}</h1>
            </div>
            <div className="w-9/10 h-16 rounded-xl bg-white mt-18 shadow-2xl">

            </div>
            <div className="bg-white w-9/10 mt-10 rounded-2xl p-5 shadow-2xl">
             <ListaCidades />
            </div>
        </div>
    )
}

export default Main;