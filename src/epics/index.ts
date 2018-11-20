import { Action } from 'redux';
import { combineEpics, Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import intervalEpic from './intervalEpic';
import pingEpic from './pingEpic';
import rotateEpic from './rotateEpic';
import { RootState } from 'src/typings';

const epic$ = new BehaviorSubject(combineEpics(
    intervalEpic,
    pingEpic,
    rotateEpic
));

const rootEpic = (action$: ActionsObservable<Action<any>>, state$: StateObservable<RootState>) => epic$.pipe(
    mergeMap(epic => epic(action$, state$, null))
);

export function addEpic(epic: Epic<Action<any>, Action<any>, RootState, any>) {
    epic$.next(epic);
}

export default rootEpic;