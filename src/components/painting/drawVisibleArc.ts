import { Vector } from 'src/typings';
import longArc from './longArc';

export default (ctx: CanvasRenderingContext2D, center: Vector, context: Vector, r: number, u: Vector, v: Vector, color: string | CanvasGradient | CanvasPattern): Vector => {
    let phi = 0;
    let rho = 2 * Math.PI;

    if (v.z !== 0) {
        phi = Math.atan(-u.z / v.z);

        if (v.z < 0) {
            phi = phi + Math.PI;
        }

        if (phi < 0) {
            phi = 2 * Math.PI + phi;
        } else if (phi > 2 * Math.PI) {
            phi = phi - 2 * Math.PI;
        }
        rho = phi + Math.PI;
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    context = longArc(ctx, center, context, r, phi, rho, u, v);
    ctx.stroke();

    return context;
};