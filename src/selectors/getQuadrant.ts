import { IQuadrantProps, RootState } from 'src/typings';

const getQuadrant = (state: RootState, props: IQuadrantProps) => {
    const { ordinal } = props;
    const { logo: { sphere: { alpha, matrix, opacity, quadrants: { [ordinal]: quadrant }, radio, split } } }  = state;
    const height = Math.sqrt(radio * radio - split * split);
    return { alpha, height, matrix, opacity, radio, split, ...quadrant };
};
export default getQuadrant;


