function deepEqual(x, y) {
  if (x === y) return true;


  if (Number.isNaN(x) && Number.isNaN(y)) return true;

  if (typeof x !== 'object' || x === null || typeof y !== 'object' || y === null) {
    return false;
  }


  if (Array.isArray(x) !== Array.isArray(y)) return false;


  const keysX = Object.keys(x);
  const keysY = Object.keys(y);
  
  if (keysX.length !== keysY.length) return false;

  for (const key of keysX) {
    if (!Object.prototype.hasOwnProperty.call(y, key)) return false;
    
    if (!deepEqual(x[key], y[key])) return false;
  }

  return true;
};

module.exports = deepEqual;