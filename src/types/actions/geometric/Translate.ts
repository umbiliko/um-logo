import { TRANSLATION } from 'src/actions/geometric/types';
import { Vector } from 'src/typings';
import Change from '../Change';

type Translate = Change & {
    type: typeof TRANSLATION;
    vector: Vector;
};

export default Translate;