import { api } from "../api.js";

export async function login(usuario_login, usuario_senha) {
  try {
    const response = await api.post(`/login`, {
      usuario_login, 
      usuario_senha 
    });

    return response.data;
  } catch (err) {
    if(err.response && err.response.status === 400){
      throw new Error(err.response.data?.error || "Preencha login e senha.");
    }
    else if(err.response && err.response.status === 401){
      throw new Error(err.response.data?.error || "Usuário ou senha incorretos.");
    }
    else if(err.response && err.response.status === 500){
      throw new Error(err.response.data?.error || "Erro interno. Tente novamente mais tarde.");
    }
  }
}

export async function logout() {
  try {
    const response = await api.get(`/logout`);

    if(response){
      localStorage.clear();
    }
  } catch (error) {
    console.error("Erro durante logout:", error);
  }
}

export async function validarSessao(){
  try{
    await api.get("/valida");
  }catch(err){
    console.error("Erro ao validar sessão: ", err);
  }
}