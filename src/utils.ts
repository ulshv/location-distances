import uniq from 'lodash/uniq';

export const getLowercasedSortedList = (items: string[]) => {
  return items.map(l => l.toLowerCase().trim()).sort()
};

export const getListWithUniqueItems = (items: string[]) => {
  return uniq(items);
}

export const parseRequestData = (locations: string[]) => {
  return getListWithUniqueItems(getLowercasedSortedList(locations));
}

export const createPairsFromList = <T>(items: T[]) => {
  const result = [];

  for (let i = 0; i < items.length - 1; i++) {
    for (let j = 1 + i; j < items.length; j++) {
      result.push([items[i], items[j]]);
    }
  }

  return result;
}
