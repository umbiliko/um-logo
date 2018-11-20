import { Action } from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import rootEpic from 'src/epics';
import { RootState } from 'src/typings';

let epicMiddleware: EpicMiddleware<Action<any>, Action<any>, RootState, any>;

export function start() {
    epicMiddleware.run(rootEpic);
}

export default () => {
    epicMiddleware = createEpicMiddleware();

    return epicMiddleware;
}