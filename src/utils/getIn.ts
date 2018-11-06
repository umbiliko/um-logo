import { Map, List } from 'immutable';
import { ArrayPath, Identifier, State } from 'src/types';

const getIn = (arrPath: ArrayPath, state: State | Map<Identifier, any> | List<any>): any => {
    
    if (typeof state !== 'object' || state === null || !arrPath || !arrPath.length) {
        return;
    }
    
    if (List.isList(state) || Map.isMap(state)) {
        return state.getIn(arrPath);
    }

    let { [0]: key } = arrPath;
    
    if (Array.isArray(state)) {
        if (typeof key !== 'number') {
            key = parseInt(key);

            if (typeof key !== 'number') {
                return;
            }
        }
    }
    
    const child = state[key];

    if (arrPath.length === 1) {
        return child;
    }

    return getIn(arrPath.slice(1), child);
};

export default getIn;