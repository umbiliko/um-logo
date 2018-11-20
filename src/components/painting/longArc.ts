import epsilon from 'src/constants/epsilon';
import { Vector } from 'src/typings';
import calcControl from 'src/utils/calcControl';
import splot from 'src/utils/splot';
import translate from 'src/utils/translate';

export default (ctx: CanvasRenderingContext2D, center: Vector, context: Vector, r: number, a: number, b: number, u: Vector, v: Vector): Vector => {
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