import { createSelector } from 'reselect';
import getQuadrant from './getQuadrant';
import getQuadrantNormal from './getQuadrantNormal';
import getQuadrantVector from './getQuadrantVector';
import { IMatrix, IQuadrantProps, IVector } from 'src/types';
import plot from 'src/utils/plot';
import rotate from 'src/utils/rotate';
import translate from 'src/utils/translate';

const getQuadrantMatrix = createSelector([getQuadrant, getQuadrantNormal, getQuadrantVector], (quadrant: IQuadrantProps, normal: IMatrix, vector: IVector): IMatrix => {
    const { height, split } = quadrant;

    const cos = Math.sqrt(2) / 2;
    const sin = cos * vector.x * vector.y * vector.z;
    
    const matrix: IMatrix= { 
        x: translate(plot(rotate(normal.x, normal.y, sin, cos), split / cos), plot(normal.x, height)),
        y: translate(plot(rotate(normal.y, normal.z, sin, cos), split / cos), plot(normal.y, height)),
        z: translate(plot(rotate(normal.z, normal.x, sin, cos), split / cos), plot(normal.z, height))
    };

    return matrix;
});

export default getQuadrantMatrix;