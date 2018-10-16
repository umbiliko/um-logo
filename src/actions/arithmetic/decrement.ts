import { DECREMENT } from './types';
import { Path } from 'src/types';
import actions from 'src/types/actions/arithmetic';

export default (path: Path, amount: number | undefined = undefined): actions[typeof DECREMENT] => ({
    amount,
    path,
    type: DECREMENT
});