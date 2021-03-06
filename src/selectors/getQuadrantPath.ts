import { createSelector } from 'reselect';
import epsilon from 'src/constants/epsilon';
import { Matrix, IQuadrantProps, Vector, Path2D } from 'src/typings';
import calcControl from 'src/utils/calcControl';
import circlePlot from 'src/utils/circlePlot';
import angle from 'src/utils/angle';
import plot from 'src/utils/plot';
import splot from 'src/utils/splot';
import translate from 'src/utils/translate';
import getQuadrant from './getQuadrant';
import getQuadrantMatrix from './getQuadrantMatrix';
import getQuadrantNormal from './getQuadrantNormal';

const getQuadrantPath = createSelector([getQuadrant, getQuadrantMatrix, getQuadrantNormal], (quadrant: IQuadrantProps, matrix: Matrix, normal: Matrix): Path2D => {
    const { center, height: height, radio, split } = quadrant;
    const m = matrix;
    // const { x, y, z } = matrix;
    const path: Path2D = [];

    const mhu = Math.asin(split / radio);

    const c: Matrix = {
        x: translate(center, plot(normal.x, split)),
        y: translate(center, plot(normal.y, split)),
        z: translate(center, plot(normal.z, split))
    };

    const phi = { x: mhu, y: mhu, z: mhu };
    const rho = {
        x: Math.PI / 2 - mhu,
        y: Math.PI / 2 - mhu,
        z: Math.PI / 2 - mhu
    };

    const p = {
        x: translate(center, m.x),
        y: translate(center, m.y),
        z: translate(center, m.z)
    };

    if (m.x.z > 0 && m.y.z > 0 && m.z.z > 0) {
        // path.beginPath();
        moveTo(path, p.y.x, p.y.y);
        longArc(path, c.x, p.y, height, phi.x, rho.x, normal.y, normal.z);
        longArc(path, c.y, p.z, height, phi.y, rho.y, normal.z, normal.x);
        longArc(path, c.z, p.x, height, phi.z, rho.z, normal.x, normal.y);
        // path.closePath();
        // path.fill();
    }
    else {
        let axy = 0;
        let axz = 0;
        let ayx = 0;
        let ayz = 0;
        let azx = 0;
        let azy = 0;
        let pxy = p.x;
        let pxz = p.x;
        let pyx = p.y;
        let pyz = p.y;
        let pzx = p.z;
        let pzy = p.z;

        if (m.x.z < 0) {
            rho.y = Math.atan(-m.z.z / m.x.z);
            phi.z = Math.atan(-m.x.z / m.y.z);

            pxy = translate(c.y, splot(rho.y, height, normal.z, normal.x));
            pxz = translate(c.z, splot(phi.z, height, normal.x, normal.y));

            axz = angle(center, pxz);
            axy = angle(center, pxy);
        }

        if (m.y.z < 0) {
            phi.x = Math.atan(-m.y.z / m.z.z);
            rho.z = Math.atan(-m.x.z / m.y.z);

            pyx = translate(c.x, splot(phi.x, height, normal.y, normal.z));
            pyz = translate(c.z, splot(rho.z, height, normal.x, normal.y));

            ayx = angle(center, pyx);
            ayz = angle(center, pyz);
        }

        if (m.z.z < 0) {
            rho.x = Math.atan(-m.y.z / m.z.z);
            phi.y = Math.atan(-m.z.z / m.x.z);

            pzx = translate(c.x, splot(rho.x, height, normal.y, normal.z));
            pzy = translate(c.y, splot(phi.y, height, normal.z, normal.x));

            azx = angle(center, pzx);
            azy = angle(center, pzy);
        }

        if (m.x.z > 0 && m.y.z > 0) {
            moveTo(path, pzx.x, pzx.y);
            // path.beginPath();
            longArc(path, c.y, pzy, height, phi.y, rho.y, normal.z, normal.x);
            longArc(path, c.z, pxz, height, phi.z, rho.z, normal.x, normal.y);
            longArc(path, c.x, pyx, height, phi.x, rho.x, normal.y, normal.z);
            smallArc(path, center, pzx, radio, azx, azy);
            // path.closePath();
            // path.fill();
        } else if (m.y.z > 0 && m.z.z > 0) {
            moveTo(path, pxz.x, pxz.y);
            // path.beginPath();
            longArc(path, c.z, pxz, height, phi.z, rho.z, normal.x, normal.y);
            longArc(path, c.x, pyx, height, phi.x, rho.x, normal.y, normal.z);
            longArc(path, c.y, pzx, height, phi.y, rho.y, normal.z, normal.x);
            smallArc(path, center, pxy, radio, axy, axz);
            // path.closePath();
            // path.fill();
        } else if (m.z.z > 0 && m.x.z > 0) {
            moveTo(path, pyx.x, pyx.y);
            // path.beginPath();
            longArc(path, c.x, pyx, height, phi.x, rho.x, normal.y, normal.z);
            longArc(path, c.y, pzx, height, phi.y, rho.y, normal.z, normal.x);
            longArc(path, c.z, pxz, height, phi.z, rho.z, normal.x, normal.y);
            smallArc(path, center, pyz, radio, ayz, ayx);
            // path.closePath();
            // path.fill();
        } else if (m.x.z > 0) {
            moveTo(path, pzy.x, pzy.y);
            // path.beginPath();
            longArc(path, c.y, pzy, height, phi.y, rho.y, normal.z, normal.x);
            longArc(path, c.z, pxz, height, phi.z, rho.z, normal.x, normal.y);
            smallArc(path, center, pyz, radio, ayz, azy);
            // path.closePath();
            // path.fill();
        } else if (m.y.z > 0) {
            moveTo(path, pxz.x, pxz.y);
            // path.beginPath();
            longArc(path, c.z, pxz, height, phi.z, rho.z, normal.x, normal.y);
            longArc(path, c.x, pyx, height, phi.x, rho.x, normal.y, normal.z);
            smallArc(path, center, pzx, radio, azx, axz);
            // path.closePath();
            // path.fill();
        } else if (m.z.z > 0) {
            moveTo(path, pyx.x, pyx.y);
            // path.beginPath();
            longArc(path, c.x, pyx, height, phi.x, rho.x, normal.y, normal.z);
            longArc(path, c.y, pzy, height, phi.y, rho.y, normal.z, normal.x);
            smallArc(path, center, pxy, radio, axy, ayx);
            // path.closePath();
            // path.fill();
        }
    }

    return path;
});

export default getQuadrantPath;

const moveTo = (path: Path2D, x: number, y: number) => {
    path.push({ x, y});
}


const arc = (path: Path2D, center: Vector, context: Vector, r: number, a: number, b: number): Vector => {
    const ang = b - a;
    const accuracy = Math.PI / 16;
    const steps = Math.abs(Math.ceil(ang / accuracy));

    if (steps === 0) {
        return context;
    }

    const mhu = ang / steps;
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

        path.push(control);
        path.push(ending);

        phi = rho;
        context = ending;
    }

    return context;
};

const longArc = (path: Path2D, center: Vector, context: Vector, r: number, a: number, b: number, u: Vector, v: Vector): Vector => {
    const ang = b - a;
    const accuracy = Math.PI / 16;
    let steps = Math.abs(Math.ceil(ang / accuracy));
    steps = 10;
    const mhu = ang / steps;

    let phi = a;
    
    for (let i = 0; i < steps; i++) {

        const rho = phi + mhu;
        const ending = translate(center, splot(rho, r, u, v));

        const control = calcControl(context,
                translate(center, splot(phi + epsilon, r, u, v)),
                translate(center, splot(rho - epsilon, r, u, v)),
                ending);

        path.push(control);
        path.push(ending);

        phi = rho;
        context = ending;
    }

    return context;
};

const smallArc = (path: Path2D, center: Vector, context: Vector, r: number, a: number, b: number): Vector | null => {
    if (a === b) {
        return null;
    }
    if (a > b && a - b > Math.PI) {
        a = a - 2 * Math.PI;
    } else if (b > a && b - a > Math.PI) {
        b = b - 2 * Math.PI;
    }

    return arc(path, center, context, r, a, b);
};