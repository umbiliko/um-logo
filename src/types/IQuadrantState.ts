import IVector from './IVector';
import quadrant from './quadrant';

interface IQuadrantState {
    alpha: number;
    baseColor: string;
    fillColor: string;
    opacity: number;
    ordinal: quadrant;
    quadrant: IVector;
}

export default IQuadrantState;