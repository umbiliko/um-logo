import { Action } from 'redux';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { interval } from 'rxjs';
import { filter, mapTo, takeUntil, switchMap } from 'rxjs/operators';
import { INCREMENT } from 'src/actions/arithmetic/types';
import { INTERVAL, _END } from 'src/actions/reactive/types';
import { RootState } from 'src/types';
import { Interval } from 'src/types/actions/reactive';

const isStop = (stopAction: Action<string>, action: Action<string>): boolean =>
    (stopAction.type.length === (action.type.length + _END.length)) &&
    stopAction.type.startsWith(action.type) &&
    stopAction.type.endsWith(_END);

const intervalEpic = (action$: ActionsObservable<Action<any>>, state: StateObservable<RootState>)/*: ActionsObservable<Action<any>>*/ => action$.pipe(
    filter((startAction: Interval) => startAction.type === INTERVAL && !!state.value.interval[startAction.type]),
    switchMap((startAction: Interval) =>
        interval(startAction.duration || 100).pipe(
            // increment interval count
            mapTo({ type: INCREMENT, path: ['interval', startAction.callback.type ] }),
            mapTo(startAction.callback),
            takeUntil(action$.pipe(
                filter((stopAction: Action<any>) => isStop(stopAction, startAction.callback)),
                mapTo({ type: INCREMENT /*CLEAR*/, path: ['interval', startAction.callback.type ] }),
            )
        ))
    )
);

export default intervalEpic;