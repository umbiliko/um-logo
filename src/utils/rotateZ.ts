import { Vector } from 'src/typings';
import normalize from './normalize';

export default (u: Vector, cos: number, sin: number): Vector => normalize({
    x: cos * u.x - sin * u.y,
    y: sin * u.x + cos * u.y,
    z: u.z
});