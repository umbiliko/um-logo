import { IVector } from 'src/types';
import normalize from './normalize';

export default (u: IVector, cos: number, sin: number): IVector => normalize({
    x: u.x,
    y: cos * u.y - sin * u.z,
    z: sin * u.y + cos * u.z
});