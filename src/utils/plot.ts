
import { Vector } from 'src/typings';

export default (u: Vector, r: number): Vector => ({
    x: u.x * r,
    y: u.y * r,
    z: u.z * r
});
