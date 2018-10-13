import * as Colour from 'color';
import { createSelector } from 'reselect';
import transformColor from './color';
import getQuadrant from './getQuadrant';
import { Color } from 'src/types';

const getQuadrantSolidColor = createSelector([getQuadrant], (quadrant): Color => {
    const { alpha, color, opacity } = quadrant;
    return Colour(color).lighten(opacity).opaquer(alpha).array();
});

export default getQuadrantSolidColor;


