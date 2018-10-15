import { createStore } from 'redux';
import composeEnhancers from './composeEnhancers';
import reducer from './reducers';
import preloadedState from './initialState';

export default () => createStore(reducer, preloadedState, composeEnhancers());