import getDistance from 'geolib/es/getDistance';

import { ILocation, ILocationPairWithDistance } from "./typings";
import { parseRequestData, createPairsFromList } from "./utils";
import { getLocationDetailsMock } from "./api";

export const calculateResponseData = async (locationsQueriesRaw: string[]) => {
  const locationQueries = parseRequestData(locationsQueriesRaw);
  const locations: ILocation[] = [];

  for (let locationQuery of locationQueries) {
    const location = await getLocationDetailsMock(locationQuery);
    if (location) locations.push(location);
  }

  const locationPairs = createPairsFromList(locations);

  const locationPairsWithDistances: ILocationPairWithDistance[] = locationPairs.map(pair => ({
    pair,
    distance: getDistance(
      { latitude: pair[0].latitude, longitude: pair[0].longitude },
      { latitude: pair[1].latitude, longitude: pair[1].longitude }
    )
  }));

  const pairsRelatedToLocationByQuery: { [key: string]: ILocationPairWithDistance[] } = {};

  locations.forEach(location => {
    pairsRelatedToLocationByQuery[location.query] = [];
  });

  locationPairsWithDistances.forEach(pairWithDistance => {
    pairWithDistance.pair.forEach(location => {
      pairsRelatedToLocationByQuery[location.query].push(pairWithDistance);
    });
  });

  const closestLocationPairsWithDistances = locations.map(location =>
    pairsRelatedToLocationByQuery[location.query].sort((a, b) => a.distance - b.distance)[0]
  );

  return closestLocationPairsWithDistances.map((pairWithDistance, index) => {
    const from = pairWithDistance.pair.find(location => location === locations[index]);
    const to   = pairWithDistance.pair.find(location => location !== locations[index]);

    return ({
      from,
      to,
      distance: (pairWithDistance.distance / 1000).toFixed(2) + ' km',
    })
  })
}
