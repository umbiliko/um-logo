// import { ofType } from 'redux-observable';
import { delay, filter, mapTo, mergeMap } from 'rxjs/operators';
import { Action } from 'redux';
import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { GEOMETRY_ROTATE_3D_MATRIX } from 'src/actions/types';
import { IRootState } from 'src/types';

const rotateEpic /*: Epic<Action, IRootState>*/ = (action$: ActionsObservable<Action<any>>, state: StateObservable<IRootState>)/*: ActionsObservable<Action<any>>*/ =>
    action$.pipe(
        filter((action: Action<any>) => action.type === GEOMETRY_ROTATE_3D_MATRIX),
        delay(1000) // Asynchronously wait 1000ms then continue
    // .mapTo({ type: GEOMETRY_ROTATE_3D_MATRIX });
    /* .mergeMap((action: WeatherAction) =>
      getWeather(action.params.lat, action.params.lng)
        .map(payload => weatherSetAction(payload))
    ) */);

  export default rotateEpic;