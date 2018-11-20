import { Vector } from 'src/typings';

export default (phi: number, r: number): Vector => ({
    x: Math.sin(phi) * r,
    y: Math.cos(phi) * r,
    z: 0
});