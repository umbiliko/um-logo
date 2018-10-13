import { createSelector } from 'reselect';
import getQuadrant from './getQuadrant';
import getQuadrantVector from './getQuadrantVector';
import { IMatrix, IQuadrantProps, IVector } from 'src/types';
import plot from 'src/utils/plot';

const getQuadrantNormal = createSelector([getQuadrant, getQuadrantVector], (quadrant: IQuadrantProps, vector: IVector): IMatrix => {
    const { matrix } = quadrant;

    const normal: IMatrix = {
        x: plot(matrix.x, vector.x),
        y: plot(matrix.y, vector.y),
        z: plot(matrix.z, vector.z)
    };

    return normal;
});

export default getQuadrantNormal;