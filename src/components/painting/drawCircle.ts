import { Vector } from 'src/typings';
import drawArc from './drawArc';

export default (ctx: CanvasRenderingContext2D, center: Vector, r: number, color: string | CanvasGradient | CanvasPattern) =>
    drawArc(ctx, center, { x: r, y: 0, z: 0 }, r, 0, 2 * Math.PI, color);