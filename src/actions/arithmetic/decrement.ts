import { DECREMENT } from './types';
import { ArrayPath } from 'src/types';
import actions from 'src/types/actions/arithmetic';

export default (path: ArrayPath, amount: number | undefined = undefined): actions[typeof DECREMENT] => ({
    amount,
    path,
    type: DECREMENT
});