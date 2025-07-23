const URL = `http://localhost:3000`;

export async function login(usuario_login, usuario_senha) {
    try {
        const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario_login, usuario_senha }),
        });
    
        if (!response.ok) {
            throw new Error("Login failed");
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro durante login:", error);
    }
}