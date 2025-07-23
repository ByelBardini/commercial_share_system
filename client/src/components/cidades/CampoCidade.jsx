function CampoCidade({ cidades }) {
  return (
    <div className="w-full">
      {cidades.map((cidade) => (
        <div
          key={cidade.cidade_id}
          className="bg-gray-100 rounded-md p-3 m-2 shadow-md"
        >
          <h1 className="text-xl font-bold p-1">{cidade.cidade_nome} - {cidade.cidade_uf}</h1>
        </div>
      ))}
    </div>
  );
}

export default CampoCidade;
