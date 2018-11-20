import { REFLECTION, ROTATION, TRANSLATION } from 'src/actions/geometric/types';
import actions from 'src/types/actions/geometric';
import { State } from 'src/typings';
import $reflect from './reflect';
import $rotate from './rotate';
import $translate from './translate';

export default (state: State, action: actions[keyof actions]): State => {

    const { path } = action;

    switch (action.type) {

        case REFLECTION:
            return $reflect(path, state, action.vector);

        case ROTATION:
            return $rotate(path, state, action.vector);

        case TRANSLATION:
            return $translate(path, state, action.vector);
    }

    return state;
};