const URL = `http://localhost:3000/usuario`;

export async function trocaSenhaUsuario(nova_senha) {
  try {
    const response = await fetch(`${URL}/trocasenha`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nova_senha }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Falha ao trocar a senha");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao trocar senha:", error);
  }
}
