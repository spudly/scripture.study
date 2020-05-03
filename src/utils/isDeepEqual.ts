import isObject from './isObject';

const isDeepEqual = <T>(x: T, y: T) => {
  if (x === y) {
    return true;
  }
  if (isObject(x) && isObject(y)) {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    }
    for (const prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!isDeepEqual(x[prop], y[prop])) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
  return false;
};

export default isDeepEqual;
