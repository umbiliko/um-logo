import { INCREMENT } from './types';
<<<<<<< HEAD
import { ArrayPath } from 'src/typings';
import actions from 'src/types/actions/arithmetic';

export default (path: ArrayPath, amount: number | undefined = undefined): actions[typeof INCREMENT] => ({
=======
import { Path } from 'src/typings';
import actions from 'src/types/actions/arithmetic';

export default (path: Path, amount: number | undefined = undefined): actions[typeof INCREMENT] => ({
>>>>>>> a93b9e83685275009b5ff948e43d2733e045b126
    amount,
    path,
    type: INCREMENT
});