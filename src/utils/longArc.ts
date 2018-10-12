import epsilon from 'src/constants/epsilon';
import { IVector } from 'src/types';
import calcControl from './calcControl';
import splot from './splot';
import translate from './translate';

export default (ctx: CanvasRenderingContext2D, center: IVector, context: IVector, r: number, a: number, b: number, u: IVector, v: IVector): IVector => {
    const angle = b - a;
    const accuracy = Math.PI / 16;
    let steps = Math.abs(Math.ceil(angle / accuracy));
    steps = 10;
    const mhu = angle / steps;

    let phi = a;

    for (let i = 0; i < steps; i++) {

        const rho = phi + mhu;
        const ending = translate(center, splot(rho, r, u, v));

        const control = calcControl(context,
                translate(center, splot(phi + epsilon, r, u, v)),
                translate(center, splot(rho - epsilon, r, u, v)), ending);

        ctx.quadraticCurveTo(control.x, control.y, ending.x, ending.y);

        phi = rho;
        context = ending;
    }

    return context;
};