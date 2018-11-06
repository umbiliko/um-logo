import { CLEAR } from './types';
<<<<<<< HEAD
import { ArrayPath } from 'src/types';
import actions from 'src/types/actions';

export default (path: ArrayPath): actions[typeof CLEAR] => ({
=======
import { Path } from 'src/types';
import actions from 'src/types/actions';

export default (path: Path): actions[typeof CLEAR] => ({
>>>>>>> a93b9e83685275009b5ff948e43d2733e045b126
    path,
    type: CLEAR
});