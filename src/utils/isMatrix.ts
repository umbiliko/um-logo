import { Matrix } from 'src/typings';
import isVector from './isVector';

export default ({ x, y, z}: Matrix): boolean =>
    (isVector(x) && isVector(y));