import { IVector } from 'src/types';

export default (phi: number, r: number): IVector => ({
    x: Math.sin(phi) * r,
    y: Math.cos(phi) * r,
    z: 0
});