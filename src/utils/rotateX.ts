import { Vector } from 'src/typings';
import normalize from './normalize';

export default (u: Vector, cos: number, sin: number): Vector => normalize({
    x: u.x,
    y: cos * u.y - sin * u.z,
    z: sin * u.y + cos * u.z
});