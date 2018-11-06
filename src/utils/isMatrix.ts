import { Matrix } from 'src/types';
import isVector from './isVector';

export default ({ x, y, z}: Matrix): boolean =>
    (isVector(x) && isVector(y));