import { IVector } from 'src/types';
import translate from 'src/utils/translate';
import arc from './arc';

export default (ctx: CanvasRenderingContext2D, center: IVector, r: number) =>
    arc(ctx, center, translate(center, { x: r, y: 0, z: 0 }), r, 0, 2 * Math.PI);