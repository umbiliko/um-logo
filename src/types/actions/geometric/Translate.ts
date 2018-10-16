import { TRANSLATION } from 'src/actions/geometric/types';
import { Vector } from 'src/types';
import Change from '../Change';

type Translate = Change & {
    type: typeof TRANSLATION;
    vector: Vector;
};

export default Translate;