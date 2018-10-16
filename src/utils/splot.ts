import { Vector } from 'src/types';

// To get a parametric equation follow this procedure.
// 1. Let N be a unit normal vector for the plane.
// 2. Let C be the circle center, and let R be the radius.
// 3. Let U be a unit vector from C toward a point on the circle.
// 4. Let V = N x U.
// 5. Let t be the paramter.
// 6. A point P is on the circle if...
// P = C + R cos(t) U + R sin(t) V
export default (rho: number, r: number, u: Vector, v: Vector): Vector => {
    const x = r * Math.cos(rho);
    const y = r * Math.sin(rho);

    return {
        x: x * u.x + y * v.x,
        y: x * u.y + y * v.y,
        z: x * u.z + y * v.z
    };
};