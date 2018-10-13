import { IPoint } from 'src/types';
import point from './point';
import quadraticCurveTo from './quadraticCurveTo';

export default (start: IPoint, control: IPoint, ending: IPoint) => `${point(start)} ${quadraticCurveTo(control, ending)}`;