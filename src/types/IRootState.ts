import { Matrix } from 'src/types';

interface IRootState {
    interval: {
        [key: string]: number;
    }
    logo: {
        sphere: {
            alpha: number;
            matrix: Matrix;
            opacity: number;
            quadrants: Array<{
                color: string;
            }>,
            radio: number;
            split: number;
        }
    }
};

export default IRootState;