import epsilon from 'src/constants/epsilon';
import { IVector } from 'src/types';
import calcControl from 'src/utils/calcControl';
import circlePlot from 'src/utils/circlePlot';
import translate from 'src/utils/translate';

export default (ctx: CanvasRenderingContext2D, center: IVector, context: IVector, r: number, a: number, b: number): IVector => {
    const angle = b - a;
    const accuracy = Math.PI / 16;
    const steps = Math.abs(Math.ceil(angle / accuracy));

    if (steps === 0) {
        return context;
    }

    const mhu = angle / steps;
    let phi = a;

    const eps = mhu < 0 ? -epsilon : epsilon;
    for (let i = 0; i < steps; i++) {

        const rho = phi + mhu;
        const ending = translate(center, circlePlot(rho, r));
        const control = calcControl(context,
            translate(center, circlePlot(phi + eps, r)),
            translate(center, circlePlot(rho - eps, r)),
            ending
        );

        ctx.quadraticCurveTo(control.x, control.y, ending.x, ending.y);

        phi = rho;
        context = ending;
    }

    return context;
};