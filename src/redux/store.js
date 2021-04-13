import { createStore, combineReducers } from 'redux';
import GeneralReducer from './reducers/GeneralReducer';

const Store = createStore(combineReducers({
    general: GeneralReducer,
}))

export default Store;