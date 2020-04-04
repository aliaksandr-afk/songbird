import { createStore } from 'redux';
import birdsRootReducer from './reducers/reducers';

const store = createStore(birdsRootReducer);

export default store;
