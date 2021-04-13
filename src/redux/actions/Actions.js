export const Actions = {
    SET_PESQUISAS: 'SET_PESQUISAS',
    SET_DB:"SET_DB",
    SET_PERGUNTAS: 'SET_PERGUNTAS',
    SELECT_PERGUNTA: 'SELECT_PERGUNTA',
    SET_RESPOSTAS: 'SET_RESPOSTAS',
}

export const ActionsFn = {
    setDb: (db) => ({type: Actions.SET_DB, payload: db}),
    setPesquisas: (pesquisas) => ({type: Actions.SET_PESQUISAS, payload: pesquisas}),
    setPerguntas: (perguntas) => ({type: Actions.SET_PERGUNTAS, payload: perguntas}),
    selectPergunta: (pergunta) => ({type: Actions.SELECT_PERGUNTA, payload: pergunta}),
    setRespostas: (respostas) => ({type: Actions.SET_RESPOSTAS, payload: respostas})
}