import getDistance from "geolib/es/getDistance";

import { ILocation, ILocationPair, ILocationPairWithDistance, IMapApi } from "./typings";
import { getListWithUniqueItems, getLowercasedSortedList, createPairsFromList } from "./utils";


export const _parseRawLocationQueries = (locationQueriesRaw: string[]) => {
  return getListWithUniqueItems(getLowercasedSortedList(locationQueriesRaw));
}


export const _fetchLocations = async (mapApi: IMapApi, locationQueries: string[]) => {
  const locations: ILocation[] = [];

  for (let locationQuery of locationQueries) {
    const location = await mapApi.fetchLocation(locationQuery);
    if (location) locations.push(location);
  }

  return locations;
};


export const _getLocationPairsWithDistances = (locationPairs: ILocationPair[]) => (
  locationPairs.map(pair => ({
    pair,
    distance: getDistance(
      { latitude: pair[0].latitude, longitude: pair[0].longitude },
      { latitude: pair[1].latitude, longitude: pair[1].longitude }
    )
  }))
);


export const _getClosestLocationPairsWithDistances = (
  locations: ILocation[],
  locationPairsWithDistances: ILocationPairWithDistance[]
) => {
  const pairsRelatedToLocationByQuery: { [key: string]: ILocationPairWithDistance[] } = {};

  locations.forEach(location => {
    pairsRelatedToLocationByQuery[location.query] = [];
  });

  locationPairsWithDistances.forEach(pairWithDistance => {
    pairWithDistance.pair.forEach(location => {
      pairsRelatedToLocationByQuery[location.query].push(pairWithDistance);
    });
  });

  return locations.map(location =>
    pairsRelatedToLocationByQuery[location.query].sort((a, b) => a.distance - b.distance)[0]
  );
}


export const _formatFinalResult = (
  locations: ILocation[],
  closestLocationPairsWithDistances: ILocationPairWithDistance[]
) => (
  closestLocationPairsWithDistances.map((pairWithDistance, index) => {
    const from = pairWithDistance.pair.find(location => location === locations[index]);
    const to   = pairWithDistance.pair.find(location => location !== locations[index]);

    return ({
      from,
      to,
      distance: (pairWithDistance.distance / 1000).toFixed(2) + ' km',
    })
  })
);


export const calculateResponse = async (mapApi: IMapApi, locationsQueriesRaw: string[]) => {
  const locationQueries = _parseRawLocationQueries(locationsQueriesRaw);
  const locations = await _fetchLocations(mapApi, locationQueries);
  const locationPairs = createPairsFromList(locations);
  const locationPairsWithDistances = _getLocationPairsWithDistances(locationPairs);
  const closestLocationPairsWithDistances = _getClosestLocationPairsWithDistances(
    locations,
    locationPairsWithDistances
  );
  const formattedResult = _formatFinalResult(locations, closestLocationPairsWithDistances);
  return formattedResult
};
