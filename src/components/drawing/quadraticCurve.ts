import { Point } from 'src/types';
import point from './point';
import quadraticCurveTo from './quadraticCurveTo';

export default (start: Point, control: Point, ending: Point) => `${point(start)} ${quadraticCurveTo(control, ending)}`;