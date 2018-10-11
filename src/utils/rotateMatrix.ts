import { IMatrix, IVector } from 'src/types';
import plot from './plot';
import rotate from './rotate';
import translate from './translate';

export default (m: IMatrix, v: IVector, h: number, d: number): IMatrix => {
    const p = {
        x: plot(m.x, v.x),
        y: plot(m.y, v.y),
        z: plot(m.z, v.z)
    };
    
    const cos = Math.sqrt(2) / 2;
    const sin = cos * v.x * v.y * v.z;

    const w = {
        x: rotate(p.x, p.y, sin, cos),
        y: rotate(p.y, p.z, sin, cos),
        z: rotate(p.z, p.x, sin, cos)
    };

    return { 
        x: translate(plot(w.x, d / cos), plot(p.x, h)),
        y: translate(plot(w.y, d / cos), plot(p.y, h)),
        z: translate(plot(w.z, d / cos), plot(p.z, h))
    };
}