<<<<<<< HEAD
export { default as getIn } from './getIn';
export { default as isMatrix } from './isMatrix';
export { default as isMatrix3D } from './isMatrix';
export { default as isVector } from './isVector';
export { default as isVector3D } from './isVector3D';
export { default as omit } from './omit';
export { default as rotate } from './rotate';
export { default as setIn } from './setIn';
=======
export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as any
  );
}
>>>>>>> a93b9e83685275009b5ff948e43d2733e045b126
