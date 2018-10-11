import { IVector } from 'src/types';
import arc from './arc';
import translate from './translate';

export default (ctx: CanvasRenderingContext2D, center: IVector, r: number) => {
    return arc(ctx, center, translate(center, { x: r, y: 0, z: 0 }), r, 0, 2 * Math.PI);
};