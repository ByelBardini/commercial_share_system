const URL = `http://localhost:3000`;

export async function login(usuario_login, usuario_senha) {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario_login, usuario_senha }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.status === 400) {
      throw new Error(data.error || "Preencha login e senha.");
    } else if (response.status === 401) {
      throw new Error(data.error || "Usuário ou senha incorretos.");
    } else if (response.status === 500) {
      throw new Error(
        data.error || "Erro interno. Tente novamente mais tarde."
      );
    } else if (!response.ok) {
      throw new Error(data.error || "Erro desconhecido.");
    }

    return data;
  } catch (error) {
    console.error("Erro durante login:", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch(`${URL}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Falha no logout");
    }

    localStorage.clear();
  } catch (error) {
    console.error("Erro durante logout:", error);
  }
}
