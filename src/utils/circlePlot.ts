import { Vector } from 'src/types';

export default (phi: number, r: number): Vector => ({
    x: Math.sin(phi) * r,
    y: Math.cos(phi) * r,
    z: 0
});