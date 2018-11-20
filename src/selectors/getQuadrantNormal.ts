import { createSelector } from 'reselect';
import getQuadrant from './getQuadrant';
import getQuadrantVector from './getQuadrantVector';
import { Matrix, IQuadrantProps, Vector } from 'src/typings';
import plot from 'src/utils/plot';

const getQuadrantNormal = createSelector([getQuadrant, getQuadrantVector], (quadrant: IQuadrantProps, vector: Vector): Matrix => {
    const { matrix } = quadrant;

    const normal: Matrix = {
        x: plot(matrix.x, vector.x),
        y: plot(matrix.y, vector.y),
        z: plot(matrix.z, vector.z)
    };

    return normal;
});

export default getQuadrantNormal;