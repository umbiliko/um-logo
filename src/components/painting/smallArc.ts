import { IVector } from 'src/types';
import arc from './arc';

export default (ctx: CanvasRenderingContext2D, center: IVector, context: IVector, r: number, a: number, b: number): IVector | null => {
    if (a === b) {
        return null;
    }
    if (a > b && a - b > Math.PI) {
        a = a - 2 * Math.PI;
    } else if (b > a && b - a > Math.PI) {
        b = b - 2 * Math.PI;
    }

    return arc(ctx, center, context, r, a, b);
};