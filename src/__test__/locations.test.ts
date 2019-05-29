import mapApiMock from "./map-api-mock";
import { createPairsFromList } from "../utils";
import {
  _parseRawLocationQueries,
  _fetchLocations,
  _getLocationPairsWithDistances,
  _getClosestLocationPairsWithDistances,
  _formatFinalResult,
  calculateResponse
} from "../locations";


describe('locations.ts', () => {
  it('parseRawLocationQueries() should propertly parse user request data (list of locations)', () => {
    const data = ['San Francisco', 'New York', 'san francisco', 'new york    '];
    const result = ['new york', 'san francisco'];
    expect(_parseRawLocationQueries(data)).toEqual(result);
  })
})


describe('locations.ts', () => {
  const locationsQueryRaw = ['New York', '  MoScoW ', 'PhiladelphiA', 'Saint Petersburg', 'Nowhere'];

  let locationQueries;
  let locations;
  let locationPairs;
  let locationPairsWithDistances;
  let closestLocationPairsWithDistances;
  let formattedResult;

  it('_parseRawLocationQueries() should propertly parse raw data', () => {
    locationQueries = _parseRawLocationQueries(locationsQueryRaw);
    expect(locationQueries).toMatchSnapshot();
  });

  it('_fetchLocations() should fetch data with mock api', async () => {
    locations = await _fetchLocations(mapApiMock, locationQueries)
    expect(locations).toMatchSnapshot();
  });

  it('_getLocationPairsWithDistances() add distance for each location pair', async () => {
    locationPairs = createPairsFromList(locations);
    locationPairsWithDistances = _getLocationPairsWithDistances(locationPairs)
    expect(locationPairsWithDistances).toMatchSnapshot();
  });

  it('_getClosestLocationPairsWithDistances() should find closest pair for each location', async () => {
    closestLocationPairsWithDistances = _getClosestLocationPairsWithDistances(
      locations,
      locationPairsWithDistances
    )
    expect(closestLocationPairsWithDistances).toMatchSnapshot();
  });

  it('_formatFinalResult() should propertly format results', async () => {
    formattedResult = _formatFinalResult(
      locations,
      closestLocationPairsWithDistances
    )
    expect(formattedResult).toMatchSnapshot();
  });

  it('calculateResponse() should propertly transform raw locations queries to final result', async () => {
    const result = await calculateResponse(mapApiMock, locationsQueryRaw);
    expect(result).toMatchSnapshot();
  })

});
