import { INCREMENT } from './types';
import { Path } from 'src/types';
import actions from 'src/types/actions/arithmetic';

export default (path: Path, amount: number | undefined = undefined): actions[typeof INCREMENT] => ({
    amount,
    path,
    type: INCREMENT
});