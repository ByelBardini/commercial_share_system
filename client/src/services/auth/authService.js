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

    if (!response.ok) {
      throw new Error("Falha no login");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro durante login:", error);
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
