// import { ofType } from 'redux-observable';
import { delay, filter, mapTo, mergeMap } from 'rxjs/operators';
import { Action } from 'redux';
import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { IRootState } from 'src/types';

const pingEpic = (action$: ActionsObservable<Action<any>>, state: StateObservable<IRootState>)/*: ActionsObservable<Action<any>>*/ => action$.pipe(
    filter((action: Action<any>) => action.type === 'PING'),
    delay(1000), // Asynchronously wait 1000ms then continue
    mapTo({ type: 'PONG' })
);

export default pingEpic;