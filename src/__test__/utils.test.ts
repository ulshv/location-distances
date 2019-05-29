import {
  getLowercasedList,
  getListWithUniqueItems,
  createPairsFromList
} from "../utils";

describe('utils.ts', () => {
  it('getLowercasedList() should return lowercased and trimmed array of strings', () => {
    const data = ['New York', 'San Francisco, CA', ' Moscow '];
    const result = ['new york', 'san francisco, ca', 'moscow'];
    expect(getLowercasedList(data)).toEqual(result);
  });

  it('getListWithUniqueItems() should return array of unique strings', () => {
    const data = ['new york', 'san francisco', 'new york'];
    const result = ['new york', 'san francisco'];
    expect(getListWithUniqueItems(data)).toEqual(result);
  });

  it('createPairsFromList() should propertly create array of pairs (tuples)', () => {
    const data = ['a', 'b', 'c', 'd'];
    const result = [['a','b'], ['a','c'], ['a','d'], ['b','c'], ['b','d'], ['c','d']];
    expect(createPairsFromList(data)).toEqual(result);
  })
})
