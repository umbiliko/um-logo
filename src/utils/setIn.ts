import { Map, List } from 'immutable';
import { ArrayPath, Identifier, State } from 'src/typings';

const setIn = (arrPath: ArrayPath, state: State | Map<Identifier, any> | List<any>, value: any): any => {
    
    if (typeof state !== 'object' || state === null || !arrPath || !arrPath.length) {
        return;
    }
    
    if (List.isList(state) || Map.isMap(state)) {
        return state.setIn(arrPath, value);
    }

    let { [0]: key } = arrPath;
    
    if (Array.isArray(state)) {
        if (typeof key !== 'number') {
            key = parseInt(key);

            if (typeof key !== 'number') {
                // TODO: report error
                return;
            }
        }

        if (arrPath.length === 1) {
            const next = [ ...state, [key] ];
            next[key] = value;

            return next;
        }

        const { [key]: current } = state;
        
        const item = setIn(arrPath.slice(1), current, value);

        if (typeof item !== 'object') {
            // TODO: report error
            return;
        }
        
        const next = [ ...state, [key] ];
        next[key] = item;

        return next;
    }
    
    if (arrPath.length === 1) {
        return { ...state, [key]: value };
    }

    const { [key]: current } = state;

    const next = setIn(arrPath.slice(1), current, value);

    if (typeof next !== 'object') {
        // TODO: report error
        return;
    }

    return { ...state, [key]: next };
};

export default setIn;