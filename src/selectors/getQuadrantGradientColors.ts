import * as Colour from 'color';
import { createSelector } from 'reselect';
import getQuadrant from './getQuadrant';
import { Color, Gradient, IQuadrantProps } from 'src/typings';
import getQuadrantSolidColor from './getQuadrantSolidColor';

const getQuadrantCanvasGradient = createSelector([getQuadrant, getQuadrantSolidColor], (quadrant: IQuadrantProps, solidColor: Color): Gradient => {
    let color = Colour(solidColor);
    return [
        { stop: 0, color: color.lighten(.2).array() },
        { stop: .5, color: solidColor },
        { stop: 1, color: color.darken(.2).array() }
    ];
});

export default getQuadrantCanvasGradient;