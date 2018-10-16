import { INCREMENT } from 'src/actions/arithmetic/types';
import Change from '../Change';

type Increment = Change & {
    amount?: number;
    type: typeof INCREMENT;
};

export default Increment;