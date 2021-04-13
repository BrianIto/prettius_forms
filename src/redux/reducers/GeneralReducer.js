import {Actions} from "../actions/Actions";

const initialState = {
    pesquisas: [],
    perguntas: [],
    selectedPergunta: {_id: ''},
    db: null,
}

const GeneralReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case Actions.SET_DB:
            return {...state, db: payload};
        case Actions.SET_PESQUISAS:
            return {...state, pesquisas: payload};
        case Actions.SET_PERGUNTAS:
            return {...state, perguntas: payload};
        case Actions.SELECT_PERGUNTA:
            return {...state, selectedPergunta: payload};
        default:
            return state;
    }
}

export default GeneralReducer;