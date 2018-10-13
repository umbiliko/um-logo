import { createSelector } from 'reselect';
import getQuadrant from './getQuadrant';
import { IQuadrantProps, IVector } from 'src/types';

const getQuadrantVector = createSelector([getQuadrant], (quadrant: IQuadrantProps): IVector => {
    const { ordinal } = quadrant;
    const i = 7 - ordinal;
    const vector: IVector = {
        // tslint:disable:no-bitwise
        x: ((i << 1) & 2) - 1,
        y: (i & 2) - 1,
        z: ((i >> 1) & 2) - 1
    };

    return vector;
});

export default getQuadrantVector;