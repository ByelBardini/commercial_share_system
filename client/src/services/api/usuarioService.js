import { api, refresh } from "../api.js";

export async function trocaSenhaUsuario(nova_senha) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.put(`/usuario/trocasenha`, { nova_senha });

    return response.data;
  } catch (err) {
    console.error("Erro ao trocar senha:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao trocar senha");
  }
}

export async function buscaUsuarios() {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.get(`/usuario`);

    return response.data;
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao buscar usuários");
  }
}

export async function cadastraUsuario(
  usuario_nome,
  usuario_login,
  usuario_cadastrado_role
) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.post(`/usuario`, {
      usuario_nome,
      usuario_login,
      usuario_cadastrado_role,
    });

    if (response) {
      return {
        erro: false,
        mensagem: response.data?.message || "Usuário cadastrado com sucesso!",
      };
    }
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao cadastrar usuário");
  }
}

export async function resetaSenha(id) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.put(`/usuario/resetasenha/${id}`);

    if (response) {
      return {
        erro: false,
        mensagem: response.data?.message || "Senha resetada com sucesso!",
      };
    }
  } catch (err) {
    console.error("Erro ao resetar senha do usuário:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao resetar senha do usuário");
  }
}

export async function inativaUsuario(id) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.put(`/usuario/inativa/${id}`);

    if (response) {
      return {
        erro: false,
        mensagem: response.data?.message || "Senha resetada com sucesso!",
      };
    }
  } catch (err) {
    console.error("Erro ao ativar/inativar usuário:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao ativar/inativar usuário");
  }
}
