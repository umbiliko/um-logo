import { Action } from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import rootEpic from 'src/epics';
import { IRootState } from 'src/types';

let epicMiddleware: EpicMiddleware<Action<any>, Action<any>, IRootState, any>;

export function run() {
    epicMiddleware.run(rootEpic);
}

export default () => {
    epicMiddleware = createEpicMiddleware();

    return epicMiddleware;
}