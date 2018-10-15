import { Action } from 'redux';
import { combineEpics, Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { delay, filter, mapTo, mergeMap } from 'rxjs/operators';
import pingEpic from './pingEpic';
import rotateEpic from './rotateEpic';
import { IRootState } from 'src/types';

const epic$ = new BehaviorSubject(combineEpics(
    pingEpic,
    rotateEpic
));

const rootEpic = (action$: ActionsObservable<Action<any>>, state$: StateObservable<IRootState>) => epic$.pipe(
    mergeMap(epic => epic(action$, state$, null))
);

export function addEpic(epic: Epic<Action<any>, Action<any>, IRootState, any>) {
    epic$.next(epic);
}

export default rootEpic;