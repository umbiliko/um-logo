<<<<<<< HEAD
import { Matrix, Point, Vector, quadrant } from 'src/typings';
=======
import { Matrix, IPoint, Vector, quadrant } from 'src/typings';
>>>>>>> a93b9e83685275009b5ff948e43d2733e045b126

interface IQuadrantProps {
    alpha: number;
    center: Vector;
    color: string;
    height: number;
    matrix: Matrix;
    opacity: number;
    ordinal: quadrant;
    path: Point[];
    split: number;
    radio: number;
}

export default IQuadrantProps;