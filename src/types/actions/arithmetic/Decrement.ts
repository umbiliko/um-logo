import { DECREMENT } from 'src/actions/arithmetic/types';
import Change from '../Change';

type Decrement = Change & {
    amount?: number;
    type: typeof DECREMENT;
};

export default Decrement;