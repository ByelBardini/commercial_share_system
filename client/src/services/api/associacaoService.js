const URL = `http://localhost:3000/associacao`

export async function getAssociacoesPorCidade(id_cidade){
    try{
        const response = await fetch(`${URL}/cidade/${id_cidade}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();
        return data;
    } catch(err){
        console.error("Erro ao buscar associação:", err);
    }
}

export async function postAssociacao(associacao_cidade_id, associacao_nome, associacao_nome_fantasia, associacao_cnpj, associacao_data_contato, associacao_data_fechamento, associacao_observacao,associacao_cliente) {
    try{
        const response = fetch(`${URL}`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({associacao_cidade_id, associacao_nome, associacao_nome_fantasia, associacao_cnpj, associacao_data_contato, associacao_data_fechamento, associacao_observacao,associacao_cliente}),
        });

        const data = (await response).json();
        return data;
    }catch(err){
        console.error("Erro ao buscar associação:", err);
    }
}