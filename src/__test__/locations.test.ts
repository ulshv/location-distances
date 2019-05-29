import { _parseRawLocationQueries } from "../locations";

describe('locations.ts', () => {
  it('parseRawLocationQueries() should propertly parse user request data (list of locations)', () => {
    const data = ['San Francisco', 'New York', 'san francisco', 'new york    '];
    const result = ['new york', 'san francisco'];
    expect(_parseRawLocationQueries(data)).toEqual(result);
  })
})
