import { IVector } from 'src/types';

export default (u: IVector, v: IVector): IVector => ({
    x: u.x + v.x,
    y: u.y + v.y,
    z: u.z + v.z
});