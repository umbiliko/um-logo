import { Action } from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import rootEpic from 'src/epics';
import { RootState } from 'src/types';

let epicMiddleware: EpicMiddleware<Action<any>, Action<any>, RootState, any>;

export function run() {
    epicMiddleware.run(rootEpic);
}

export default () => {
    epicMiddleware = createEpicMiddleware();

    return epicMiddleware;
}