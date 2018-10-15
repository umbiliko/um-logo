import { GEOMETRY_REFLECT_3D_MATRIX } from 'src/actions/types';
import { IVector } from 'src/types';
import Change from './Change';

type Reflect = Change & {
    type: typeof GEOMETRY_REFLECT_3D_MATRIX;
    vector: IVector;
};

export default Reflect;