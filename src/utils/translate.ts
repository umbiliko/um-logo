import { Vector } from 'src/types';

export default (u: Vector, v: Vector): Vector => ({
    x: u.x + v.x,
    y: u.y + v.y,
    z: u.z + v.z
});