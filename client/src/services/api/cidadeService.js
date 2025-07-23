const URL = `http://localhost:3000/cidade`;

export async function buscarCidades() {
    try{
        const response = await fetch(`${URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            });
        if (!response.ok) {
            throw new Error("Falha ao buscar cidades");
        }
        
        const data = await response.json();
        return data;
    }catch(err){
        console.error("Erro ao buscar cidades:", err);
    }
}