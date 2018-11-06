import { Point } from 'src/types';
import point from './point';

export default (control: Point, ending: Point) => `Q${point(control)} ${point(ending)}`;