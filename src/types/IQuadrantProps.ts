import quadrant from './quadrant';
import IMatrix from './IMatrix';
import IPoint from './Ipoint';
import IVector from './IVector';

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