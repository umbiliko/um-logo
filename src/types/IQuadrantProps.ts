import { IMatrix, IPoint, IVector, quadrant } from 'src/types';

interface IQuadrantProps {
    alpha: number;
    center: IVector;
    color: string;
    height: number;
    matrix: IMatrix;
    opacity: number;
    ordinal: quadrant;
    path: IPoint[];
    split: number;
    radio: number;
}

export default IQuadrantProps;