import { Vector } from 'src/types';
import normalize from './normalize';

export default (u: Vector, cos: number, sin: number): Vector => normalize({
    x: cos * u.x + sin * u.z,
    y: u.y,
    z: cos * u.z - sin * u.x
});