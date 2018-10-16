import { CLEAR } from 'src/actions/types';
import Change from './Change';

type Clear = Change & {
    type: typeof CLEAR;
};

export default Clear;