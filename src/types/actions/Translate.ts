import { GEOMETRY_TRANSLATE_3D_MATRIX } from 'src/actions/types';
import { IVector } from 'src/types';
import Change from './Change';

type Translate = Change & {
    type: typeof GEOMETRY_TRANSLATE_3D_MATRIX;
    vector: IVector;
};

export default Translate;