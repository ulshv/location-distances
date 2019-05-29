import {
  getLowercasedSortedList,
  getListWithUniqueItems,
  createPairsFromList
} from "../utils";

describe('utils.ts', () => {
  it('getLowercasedSortedList() should return sorted, lowercased and trimmed array of strings', () => {
    const data = ['New York', 'San Francisco, CA', ' Moscow '];
    const result = ['moscow', 'new york', 'san francisco, ca'];
    expect(getLowercasedSortedList(data)).toEqual(result);
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
