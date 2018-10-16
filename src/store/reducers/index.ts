import { CLEAR } from 'src/actions/types';
import { State } from 'src/types';
import actions from 'src/types/actions';
import $clear from './clear';
import arithmetic from './arithmetic';
import geometric from './arithmetic';

export default (state: State, action: actions[keyof actions]): State => {

    const { path } = action;

    switch (action.type) {
        case CLEAR:
            return $clear(path, state);

        default:
            state = arithmetic(state, action as any);
            state = geometric(state, action as any);
            break;
    }

    return state;
};