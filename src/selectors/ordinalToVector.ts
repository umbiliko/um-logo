import { Vector, quadrant } from 'src/types';

export default (ordinal: quadrant): Vector => {
    const i = 7 - ordinal;
    // tslint:disable:no-bitwise
    return {
        x: ((i << 1) & 2) - 1,
        y: (i & 2) - 1,
        z: ((i >> 1) & 2) - 1
    };
}