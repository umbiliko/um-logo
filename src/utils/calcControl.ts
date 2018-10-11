import { IPoint, IVector } from 'src/types';

// point where lines context-midA and midB-ending intersects
export default (context: IVector, midA: IPoint, midB: IPoint, ending: IVector): IVector => {
    
    const xa = (context.x - midA.x);
    const xb = (midB.x - ending.x);
    const ya = (context.y - midA.y);
    const yb = (midB.y - ending.y);

    const d = xa * yb - ya * xb;
    const a = (context.x * midA.y - context.y * midA.x);
    const b = (midB.x * ending.y - midB.y * ending.x);

    return {
        x: (a * xb - xa * b) / d,
        y: (a * yb - ya * b) / d,
        z: context.z + (ending.z - context.z) / 2
    };
};