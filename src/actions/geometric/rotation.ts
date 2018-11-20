import { ArrayPath, Vector } from 'src/typings';
import { ROTATION } from './types';
import Rotate from 'src/types/actions/geometric/Rotate';
import { getIn, rotate, setIn } from 'src/utils';

export default (path: ArrayPath, vector: Vector): Rotate => ({
    path,
    vector,
    type: ROTATION
});