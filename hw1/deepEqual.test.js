const deepEqual = require('./deepEqual');

describe('test deepEqual function', () => {
  
  test('should return true for equal primitives', () => {
    expect(deepEqual(5, 5)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
  });

  test('should return true for equal simple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 2 };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('should handle deeply nested objects', () => {
    const obj1 = { a: 1, b: { c: 2, d: { e: 3 } } };
    const obj2 = { a: 1, b: { c: 2, d: { e: 3 } } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  test('should correctly compare arrays', () => {
    const arr1 = [1, 2, [3, 4]];
    const arr2 = [1, 2, [3, 4]];
    const arr3 = [1, 2, [4, 3]];
    
    expect(deepEqual(arr1, arr2)).toBe(true);
    expect(deepEqual(arr1, arr3)).toBe(false);
  });

  test('should return false if types differ (object vs array)', () => {
    const obj = { 0: 1, 1: 2, length: 2 };
    const arr = [1, 2];
    
    expect(deepEqual(obj, arr)).toBe(false);
  });

  test('should handle null and undefined correctly', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
    expect(deepEqual({ a: null }, { a: null })).toBe(true);
    expect(deepEqual({ a: null }, { a: undefined })).toBe(false);
  });

  test('should treat NaN as equal to NaN', () => {
    expect(deepEqual(NaN, NaN)).toBe(true);
    expect(deepEqual({ val: NaN }, { val: NaN })).toBe(true);
    expect(deepEqual(NaN, 5)).toBe(false);
  });
});