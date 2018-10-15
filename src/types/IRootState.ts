import { IMatrix } from 'src/types';

interface IRootState {
    logo: {
        sphere: {
            alpha: number;
            matrix: IMatrix;
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