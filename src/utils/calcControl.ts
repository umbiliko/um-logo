<<<<<<< HEAD
import { Point, Vector } from 'src/typings';

// point where lines context-midA and midB-ending intersects
export default (context: Vector, midA: Point, midB: Point, ending: Vector): Vector => {
=======
import { IPoint, Vector } from 'src/typings';

// point where lines context-midA and midB-ending intersects
export default (context: Vector, midA: IPoint, midB: IPoint, ending: Vector): Vector => {
>>>>>>> a93b9e83685275009b5ff948e43d2733e045b126
    
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