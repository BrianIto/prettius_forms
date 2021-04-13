export const AppId = 'prettiuzapp-hhexx';

export const collections = {
    pesquisas: "forms_pesquisa",
    perguntas: "forms_perguntas",
    respostas: "forms_respostas",
}

export const setCollections = (mongoClient) => {
    return mongoClient.db('prettius');
}

export const floatToReais = (num) => {
    return "R$ " + num.toFixed(2).toString().replace('.', ',');
}