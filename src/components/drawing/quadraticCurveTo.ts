import { IPoint } from 'src/types';
import point from './point';

export default (control: IPoint, ending: IPoint) => `Q${point(control)} ${point(ending)}`;