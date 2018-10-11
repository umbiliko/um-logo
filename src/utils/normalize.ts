import { IVector } from 'src/types';

export default (v: IVector): IVector => {
    const l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    v.x = v.x / l;
    v.y = v.y / l;
    v.z = v.z / l;
    return v;
};