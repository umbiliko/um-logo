import { IVector } from 'src/types';
import arc from './arc';

export default (ctx: CanvasRenderingContext2D, center: IVector, context: IVector, r: number, a: number, b: number, color: string | CanvasGradient | CanvasPattern) => {
    ctx.strokeStyle = color;
    ctx.moveTo(context.x, context.y);
    ctx.beginPath();
    arc(ctx, center, context, r, a, b);
    ctx.stroke();
};