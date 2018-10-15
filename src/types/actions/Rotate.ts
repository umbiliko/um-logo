import { GEOMETRY_ROTATE_3D_MATRIX } from 'src/actions/types';
import { IVector } from 'src/types';
import Change from './Change';

type Rotate = Change & {
    type: typeof GEOMETRY_ROTATE_3D_MATRIX;
    vector: IVector;
};

export default Rotate;