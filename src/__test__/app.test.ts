import { testFn } from "../app";

describe('app', () => {
  it('should return true', () => {
    expect(testFn()).toBe(true);
  })
})
