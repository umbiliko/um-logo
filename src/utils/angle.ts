import { Point } from 'src/typings';

export default (center: Point, point: Point): number => {
    const x = point.x - center.x;
    const y = point.y - center.y;
    let phi = Math.atan(Math.abs(x / y));

    if (x < 0 && y < 0) {
        phi = Math.PI + phi;
    } else if (x < 0) {
        phi = 2 * Math.PI - phi;
    } else if (y < 0) {
        phi = Math.PI - phi;
    }

    return phi;
};