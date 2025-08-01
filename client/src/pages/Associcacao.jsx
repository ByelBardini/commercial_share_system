/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, LogOut } from "lucide-react";
import {
  getAssociacaoFull,
  putAssociacao,
  deletaAssociacao,
} from "../services/api/associacaoService.js";
import {
  buscaContatos,
  salvaContatos,
} from "../services/api/contatoService.js";
import Loading from "../components/default/Loading.jsx";
import ListaContatos from "../components/contatos/ListaContatos.jsx";
import ModalAdicionaContato from "../components/contatos/ModalAdicionaContato.jsx";
import ModalConfirmacao from "../components/default/ModalConfirmacao.jsx";
import ModalAviso from "../components/default/ModalAviso.jsx";

function formatarDataParaInput(data) {
  if (!data) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) return data;
  const d = new Date(data);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function formatarValorBancoParaInput(valor) {
  if (valor === null || valor === undefined) return "";
  const valorCentavos = Math.round(Number(valor) * 100);
  return (valorCentavos / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatarRealDinamico(valor) {
  valor = valor.replace(/\D/g, "");
  if (!valor) return "R$ 0,00";
  valor = (parseInt(valor, 10) / 100).toFixed(2);
  valor = valor.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${valor}`;
}

function limparRealParaDouble(valor) {
  if (!valor) return 0;
  return parseFloat(valor.replace(/\D/g, "").replace(/^0+/, "") || "0") / 100;
}

function formatarCNPJ(cnpj) {
  const numeros = cnpj.replace(/\D/g, "");
  return numeros.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
    "$1.$2.$3/$4-$5"
  );
}

function Associacao() {
  const [carregando, setCarregando] = useState(false);
  const [deletando, setDeletando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [adicionando, setAdicionando] = useState(false);

  const [modalOpcoes, setModalOpcoes] = useState("");
  const [corOpcoes, setCorOpcoes] = useState("");
  const [onSim, setOnSim] = useState();
  const [opcoesMensagem, setOpcoesMensagem] = useState(false);

  const [aviso, setAviso] = useState(false);
  const [avisoCor, setAvisoCor] = useState("");
  const [avisoMensagem, setAvisoMensagem] = useState("");
  const [botaoAviso, setBotaoAviso] = useState("");

  const [contatosOriginais, setContatosOriginais] = useState([]);
  const [contatoModificado, setContatoModificado] = useState([]);
  const [contatosModificados, setContatosModificados] = useState();

  const [nome, setNome] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cliente, setCliente] = useState("");
  const [obs, setObs] = useState("");
  const [dataContato, setDataContato] = useState("");
  const [dataFechamento, setDataFechamento] = useState("");
  const [precoInstalacao, setPrecoInstalacao] = useState("");
  const [precoPorPlaca, setPrecoPorPlaca] = useState("");

  const navigate = useNavigate();

  function verificaDataValida(data, setData) {
    const hoje = new Date();
    const hojeStr = hoje.toISOString().slice(0, 10);

    if (data > hojeStr) {
      setAvisoMensagem("A data não pode ser no futuro!");
      setAvisoCor("vermelho");
      setData(hojeStr);
      setAviso(true);
    } else {
      setData(data);
    }
  }

  function clicaExcluir() {
    setCorOpcoes("amarela");
    setModalOpcoes(true);
    setOpcoesMensagem("Você tem certeza que deseja excluir esta empresa?");
    setOnSim(() => onConfirmaExclusao);
  }

  async function onConfirmaExclusao() {
    setModalOpcoes(false);
    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      setTimeout(() => {
        setCorOpcoes("vermelha");
        setOpcoesMensagem(
          "Você realmente tem certeza? Essa ação é IRREVERSÍVEL"
        );
        setModalOpcoes(true);
      }, 400);
    }, 1000);
    setOnSim(() => deletarAssociacao);
  }

  async function confirmaSaida() {
    setModalOpcoes(true);
    setOpcoesMensagem("Você tem certeza que quer sair sem salvar?");
    setCorOpcoes("amarela");
    setOnSim(() => sair);
  }

  async function confirmaSalvar() {
    setModalOpcoes(true);
    setOpcoesMensagem("Deseja manter as alterações?");
    setCorOpcoes("verde");
    setOnSim(() => salvar);
  }

  async function salvar() {
    setModalOpcoes(false);
    if (!nome || cliente === "") {
      setAviso(true);
      setAvisoCor("vermelho");
      setBotaoAviso("");
      setAvisoMensagem(
        "Todos os campos marcados como obrigatórios devem ser preenchidos"
      );
      return;
    }
    setCarregando(true);
    const fantasiaFinal = fantasia || nome
    const associacao_id = localStorage.getItem("associacao_id");
    const dataContatoFormatada = formatarDataParaInput(dataContato) || null;
    const dataFechamentoFormatada =
      formatarDataParaInput(dataFechamento) || null;

    try {
      const errosContatos = await salvaContatos(
        contatosOriginais,
        contatosModificados,
        associacao_id
      );

      if (errosContatos && errosContatos.length > 0) {
        setCarregando(false);
        setAviso(true);
        setAvisoCor("vermelho");
        setBotaoAviso("");
        setAvisoMensagem(
          "Erro ao salvar contatos: \n" +
            errosContatos.map((e) => e.mensagem).join("\n")
        );
        return;
      }
    } catch (err) {
      if (err.message.includes("inválida")) {
        setCarregando(false);
        setAvisoCor("vermelho");
        setAvisoMensagem("Sessão inválida, realize o login");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setCarregando(false);
        setAvisoCor("vermelho");
        setAvisoMensagem(err.message);
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
        }, 1000);
      }
    }
    try {
      await putAssociacao(
        nome,
        fantasiaFinal,
        cnpj,
        dataContatoFormatada,
        dataFechamentoFormatada,
        obs,
        limparRealParaDouble(precoPorPlaca),
        limparRealParaDouble(precoInstalacao),
        cliente,
        associacao_id
      );
      setCarregando(false);

      setAviso(true);
      setAvisoMensagem("Empresa alterada com sucesso!");
      setAvisoCor("verde");
      setBotaoAviso("hidden");
      setTimeout(() => {
        setAviso(false);
        localStorage.setItem("associacao_id", null);
        navigate("/cidade", { replace: true });
      }, 500);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setCarregando(false);
        setAvisoCor("vermelho");
        setAvisoMensagem("Sessão inválida, realize o login");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setCarregando(false);
        setAvisoCor("vermelho");
        setAvisoMensagem(err.message);
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
        }, 1000);
      }
    }
  }

  async function sair() {
    navigate("/cidade", { replace: true });
    localStorage.setItem("associacao_id", null);
  }

  async function deletarAssociacao() {
    setModalOpcoes(false);
    setCarregando(true);
    try {
      await deletaAssociacao(localStorage.getItem("associacao_id"));
    } catch (err) {
      if (err.message.includes("inválida")) {
        setAvisoCor("vermelho");
        setAvisoMensagem("Sessão inválida, realize o login");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setAvisoCor("vermelho");
        setAvisoMensagem(err.message);
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
        }, 1000);
      }
    } finally {
      setCarregando(false);
    }

    setAviso(true);
    setAvisoMensagem("Empresa Excluída com sucesso!");
    setAvisoCor("verde");
    setBotaoAviso("hidden");
    setTimeout(() => {
      setAviso(false);
      localStorage.setItem("associacao_id", null);
      navigate("/cidade", { replace: true });
    }, 500);
  }

  async function carregaContatosOriginais() {
    setCarregando(true);
    try {
      const contatos = await buscaContatos(
        localStorage.getItem("associacao_id")
      );
      setContatosOriginais(contatos);
    } catch (err) {
      if (err.message.includes("inválida")) {
        setAvisoCor("vermelho");
        setAvisoMensagem("Sessão inválida, realize o login");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setAvisoCor("vermelho");
        setAvisoMensagem(err.message);
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
        }, 1000);
      }
    } finally {
      setCarregando(false);
    }
  }

  async function puxaDados() {
    setCarregando(true);
    try {
      const associacao = await getAssociacaoFull(
        localStorage.getItem("associacao_id")
      );
      setNome(associacao.associacao_nome);
      setFantasia(associacao.associacao_nome_fantasia);
      setCnpj(associacao.associacao_cnpj);
      setCliente(associacao.associacao_cliente);
      setObs(associacao.associacao_observacao);
      setDataContato(associacao.associacao_data_contato);
      setDataFechamento(associacao.associacao_data_fechamento);
      setPrecoInstalacao(
        formatarRealDinamico(
          formatarValorBancoParaInput(associacao.associacao_preco_instalacao)
        )
      );
      setPrecoPorPlaca(
        formatarRealDinamico(
          formatarValorBancoParaInput(associacao.associacao_preco_placa)
        )
      );
    } catch (err) {
      if (err.message.includes("inválida")) {
        setAvisoCor("vermelho");
        setAvisoMensagem("Sessão inválida, realize o login");
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setAvisoCor("vermelho");
        setAvisoMensagem(err.message);
        setAviso(true);
        setTimeout(() => {
          setAviso(false);
        }, 1000);
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    puxaDados();
    carregaContatosOriginais();
    document.title = "Editar Empresa - Share Comercial";
  }, []);

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center p-6 overflow-x-hidden">
      <div className="animated-gradient" />
      <AnimatePresence>
        {aviso && (
          <ModalAviso
            texto={avisoMensagem}
            cor={avisoCor}
            onClick={() => setAviso(false)}
            botao={botaoAviso}
          />
        )}
      </AnimatePresence>
      {carregando && <Loading />}
      <AnimatePresence>
        {modalOpcoes && (
          <ModalConfirmacao
            texto={opcoesMensagem}
            onSim={onSim}
            onNao={() => setModalOpcoes(false)}
            cor={corOpcoes}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {adicionando && (
          <ModalAdicionaContato
            contatosModificados={contatosModificados}
            setContatosModificados={setContatosModificados}
            setEditando={setAdicionando}
            contatoAntigo={contatoModificado}
          />
        )}
      </AnimatePresence>

      <div className="bg-blue-600/50 w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between px-8 glass shadow-lg backdrop-blur-md">
        <button
          className="flex gap-2 items-center text-gray-200 hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-100"
          onClick={confirmaSaida}
          title="Voltar"
        >
          <LogOut size={22} />
          <span className="text-base font-bold">Voltar</span>
        </button>
        <h1 className="text-gray-200 text-2xl font-bold text-center w-full tracking-tight select-none">
          Editando Empresa
        </h1>
        <div />
      </div>

      <div className="relative w-full max-w-3xl mt-32 rounded-2xl p-7 shadow-2xl border bg-white/90 glass">
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-blue-800">
                Nome da Empresa
                <span className="text-red-600 ml-1">*</span>
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 100 Caracteres)
              </label>
            </div>
            <input
              type="text"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              placeholder="Nome da associação"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>
          <div className="w-1/2">
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-blue-800">
                Nome Fantasia
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 100 Caracteres)
              </label>
            </div>
            <input
              type="text"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              placeholder="Nome fantasia"
              value={fantasia}
              onChange={(event) => setFantasia(event.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-4/6">
            <div className="place-content-between flex">
              <label className="block text-sm font-semibold text-blue-800">
                CNPJ
              </label>
              <label className="block text-sm font-semibold text-gray-400">
                (Máximo de 30 Caracteres)
              </label>
            </div>
            <input
              type="text"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(event) => setCnpj(formatarCNPJ(event.target.value))}
            />
          </div>
          <div className="w-2/6">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Cliente
            </label>
            <select
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              onChange={(event) => setCliente(event.target.value)}
            >
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div className="place-content-between flex">
            <label className="block text-sm font-semibold text-blue-800">
              Observação
            </label>
            <label className="block text-sm font-semibold text-gray-400">
              (Máximo de 200 Caracteres)
            </label>
          </div>
          <textarea
            className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
            placeholder="Observações"
            value={obs}
            onChange={(event) => setObs(event.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <div className="w-1/3">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Data do Último Contato
            </label>
            <input
              type="date"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              value={formatarDataParaInput(dataContato)}
              onChange={(event) =>
                verificaDataValida(event.target.value, setDataContato)
              }
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Data de Fechamento
            </label>
            <input
              type="date"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              value={formatarDataParaInput(dataFechamento)}
              onChange={(event) =>
                verificaDataValida(event.target.value, setDataFechamento)
              }
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Preço Instalação
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              placeholder="R$ 0,00"
              value={precoInstalacao}
              onChange={(e) => {
                setPrecoInstalacao(formatarRealDinamico(e.target.value));
              }}
              maxLength={16}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold text-blue-800 mb-1">
              Preço por Placa
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="w-full bg-blue-50/50 rounded-lg p-3 border text-lg text-blue-900 focus:outline-blue-400"
              placeholder="R$ 0,00"
              value={precoPorPlaca}
              onChange={(e) => {
                setPrecoPorPlaca(formatarRealDinamico(e.target.value));
              }}
              maxLength={16}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold text-blue-800 mb-1">
            Contatos
          </label>
          <div className="bg-blue-50/50 w-full rounded-xl p-4">
            <ListaContatos
              setCarregando={setCarregando}
              deletando={deletando}
              editando={editando}
              setAdicionando={setAdicionando}
              setContatos={setContatosModificados}
              contatos={contatosModificados}
              setContatoModificado={setContatoModificado}
              setEditando={setEditando}
              setDeletando={setDeletando}
              setCorModal={setCorOpcoes}
              setAviso={setOpcoesMensagem}
              setOnSim={setOnSim}
              setModalAviso={setModalOpcoes}
              navigate={navigate}
            />
            <div className="flex w-full justify-center gap-5 mt-6">
              <button
                className="bg-green-500/90 hover:bg-green-600 active:bg-green-700 shadow-md transition font-bold text-white px-7 py-3 rounded-2xl text-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-green-300"
                onClick={() => {
                  setContatoModificado({});
                  setTimeout(() => setAdicionando(true), 0);
                }}
              >
                ADICIONAR
              </button>
              <button
                className={`bg-red-500/90 hover:bg-red-600 active:bg-red-700 shadow-md transition font-bold text-white px-7 py-3 rounded-2xl text-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-red-300`}
                onClick={() => {
                  setEditando(false);
                  setDeletando(!deletando);
                }}
              >
                REMOVER
              </button>
              <button
                className="bg-yellow-400/90 hover:bg-yellow-500 active:bg-yellow-600 shadow-md transition font-bold text-white px-7 py-3 rounded-2xl text-lg tracking-tight focus:outline-none focus:ring-2 focus:ring-yellow-200"
                onClick={() => {
                  setDeletando(false);
                  setEditando(!editando);
                }}
              >
                EDITAR
              </button>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-6 gap-5">
          <button
            className="bg-blue-600/90 hover:bg-blue-700 active:bg-blue-800 shadow-lg transition font-bold text-white px-10 py-4 rounded-2xl text-xl tracking-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={confirmaSalvar}
          >
            FINALIZAR
          </button>
          <button
            className="bg-red-500/90 hover:bg-red-600 active:bg-red-700 shadow-lg transition font-bold text-white px-10 py-4 rounded-2xl text-xl tracking-tight focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={confirmaSaida}
          >
            CANCELAR
          </button>
        </div>
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={clicaExcluir}
          className="absolute bottom-6 right-7 bg-transparent hover:bg-blue-100 rounded-full transition p-2 shadow"
          title="Excluir associação"
        >
          <Trash2 size={32} className="text-blue-400" />
        </motion.button>
        <p className="mt-4 text-sm text-gray-500">
          <span className="text-red-600">*</span> Campos obrigatórios
        </p>
      </div>
    </div>
  );
}

export default Associacao;
