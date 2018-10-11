import { IVector } from 'src/types';
import normalize from './normalize';

export default (u: IVector, cos: number, sin: number): IVector => normalize({
    x: cos * u.x - sin * u.y,
    y: sin * u.x + cos * u.y,
    z: u.z
});