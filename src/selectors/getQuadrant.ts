import { IQuadrantProps, IRootState } from 'src/types';

const getQuadrant = (state: IRootState, props: IQuadrantProps) => {
    const { ordinal } = props;
    const { logo: { sphere: { alpha, matrix, opacity, quadrants: { [ordinal]: quadrant }, radio, split } } }  = state;
    const height = Math.sqrt(radio * radio - split * split);
    return { alpha, height, matrix, opacity, radio, split, ...quadrant };
};
export default getQuadrant;


