
import { IVector } from 'src/types';

export default (u: IVector, r: number): IVector => ({
    x: u.x * r,
    y: u.y * r,
    z: u.z * r
});
