import uniq from 'lodash/uniq';

export const getLowercasedList = (items: string[]) => {
  return items.map(l => l.toLowerCase().trim())
};

export const getListWithUniqueItems = (items: string[]) => {
  return uniq(items);
}

export const createPairsFromList = <T>(items: T[]) => {
  const result: Array<[T, T]> = [];

  for (let i = 0; i < items.length - 1; i++) {
    for (let j = 1 + i; j < items.length; j++) {
      result.push([items[i], items[j]]);
    }
  }

  return result;
}
