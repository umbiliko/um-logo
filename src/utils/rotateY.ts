import { IVector } from 'src/types';
import normalize from './normalize';

export default (u: IVector, cos: number, sin: number): IVector => normalize({
    x: cos * u.x + sin * u.z,
    y: u.y,
    z: cos * u.z - sin * u.x
});