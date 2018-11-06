import { CLEAR } from './types';
import { ArrayPath } from 'src/types';
import actions from 'src/types/actions';

export default (path: ArrayPath): actions[typeof CLEAR] => ({
    path,
    type: CLEAR
});