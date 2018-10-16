import { Matrix, IPoint, Vector, quadrant } from 'src/types';

interface IQuadrantProps {
    alpha: number;
    center: Vector;
    color: string;
    height: number;
    matrix: Matrix;
    opacity: number;
    ordinal: quadrant;
    path: IPoint[];
    split: number;
    radio: number;
}

export default IQuadrantProps;