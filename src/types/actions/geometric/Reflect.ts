import { REFLECTION } from 'src/actions/geometric/types';
import { Vector } from 'src/typings';
import Change from '../Change';

type Reflect = Change & {
    type: typeof REFLECTION;
    vector: Vector;
};

export default Reflect;