import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth/authService.js";
import { Search, Funnel } from "lucide-react";
import ModalTrocaSenha from "../components/usuarios/modalTrocaSenha.jsx";
import ListaCidades from "../components/cidades/ListaCidades.jsx";
import Loading from "../components/default/Loading.jsx";

function Main() {
  const navigate = useNavigate();

  const [novaSenha, setNovaSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [ufs, setUfs] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("usuario_troca_senha") == 1) {
      setNovaSenha(true);
    }
  }, []);

  async function sair() {
    setCarregando(true);
    await logout();
    setCarregando(false);
    localStorage.clear();
    navigate("/index");
  }

  function navegaCidade(id_cidade, nome_cidade){
    localStorage.setItem("id_cidade",id_cidade);
    localStorage.setItem("nome_cidade", nome_cidade)
    navigate("/cidade");
  }

  return (
    <div
      className="bg-gray-300 min-h-screen max-w-screen flex flex-col justify-center items-center p-6
        "
    >
      <Loading aparecer={`${carregando ? "" : "hidden"}`} />
      <ModalTrocaSenha
        aparecer={`${novaSenha ? "" : "hidden"}`}
        setNovaSenha={setNovaSenha}
        setCarregando={setCarregando}
      />
      <div className="w-screen h-16 bg-blue-800 fixed top-0 left-0 z-50 flex items-center justify-between px-4">
        <button
          className="cursor-pointer bg-red-400 rounded-xl text-xl font-bold px-4 py-1 text-white hover:bg-red-500 transition shadow-2xl"
          onClick={sair}
        >
          Sair
        </button>
        <h1 className="text-white text-2xl font-bold text-center w-full rounded shadow-2xl">{`Bem-vindo(a) ${localStorage.getItem(
          "usuario_nome"
        )}`}</h1>
      </div>
      <div className="w-9/10 p-2 h-24 rounded-xl bg-white mt-18 shadow-2xl items-center  flex gap-4">
        <div className="bg-gray-100 rounded-md h-16 w-7/8 flex items-center px-4 shadow ml-2">
          <Search size={28} color="#c0c0c0" className="mr-3" />
          <input
            type="text"
            placeholder="Pesquise o nome da cidade..."
            id="pesquisa-cidade"
            className="w-full bg-gray-100 p-3 focus:bg-gray-50 rounded-md text-xl outline-none border-none placeholder-gray-400"
            onChange={(event) => setPesquisa(event.target.value)}
          ></input>
        </div>
        <div className="bg-gray-100 rounded-md h-16 w-1/8 flex items-center px-4 shadow mr-2">
          <Funnel size={28} color="#c0c0c0" className="mr-3" />
          <select
            className="w-full bg-gray-100 p-3 focus:bg-gray-50 rounded-md text-xl outline-none border-none placeholder-gray-400"
            value={ufs}
            onChange={(e) => setUfs(e.target.value)}
          >
            <option value="" disabled selected hidden>
              UF
            </option>
            {ufs.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white w-9/10 mt-10 rounded-2xl p-5 shadow-2xl">
        <ListaCidades pesquisa={pesquisa} setUfs={setUfs} navegaCidade={navegaCidade} />
      </div>
    </div>
  );
}

export default Main;
