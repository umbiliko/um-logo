import { Vector } from 'src/typings';

export default ({ x, y, z}: Vector): boolean =>
    (typeof x === 'number' && typeof y === 'number');