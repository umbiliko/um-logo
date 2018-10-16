import { DECREMENT, INCREMENT } from 'src/actions/arithmetic/types';
import actions from 'src/types/actions/arithmetic';
import { State } from 'src/types';
import $decrement from './decrement';
import $increment from './increment';

export default (state: State, action: actions[keyof actions]): State => {

    const { path } = action;

    switch (action.type) {

        case DECREMENT:
            return $decrement(path, state, action.amount);
        
        case INCREMENT:
            return $increment(path, state, action.amount);
    }

    return state;
};