import { GEOMETRY_REFLECT_3D_MATRIX, GEOMETRY_ROTATE_3D_MATRIX, GEOMETRY_TRANSLATE_3D_MATRIX } from 'src/actions/types';
import actions from 'src/types/actions';
import { IState } from 'src/types';
import $reflect from './reflect';
import $rotate from './rotate';
import $translate from './translate';

export default (state: IState, action: actions[keyof actions]): IState => {

    const { path } = action;

    switch (action.type) {

        case GEOMETRY_REFLECT_3D_MATRIX:
            return $reflect(path, state, action.vector);

        case GEOMETRY_ROTATE_3D_MATRIX:
            return $rotate(path, state, action.vector);

        case GEOMETRY_TRANSLATE_3D_MATRIX:
            return $translate(path, state, action.vector);
    }

    return state;
};