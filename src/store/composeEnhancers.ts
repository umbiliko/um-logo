import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // /logOnlyInProduction
import createEpicMiddleware from './createEpicMiddleware';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const epicMiddleware = createEpicMiddleware();

const middleware = [
    epicMiddleware
];

export default () => composeEnhancers(
    applyMiddleware(...middleware)
    // other store enhancers if any
);