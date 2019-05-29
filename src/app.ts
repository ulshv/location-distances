import getDistance from 'geolib/es/getDistance';

import { ILocation } from "./typings";
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

  const locationPairsDistances = locationPairs.map(([from, to]) =>
    getDistance(
      { latitude: from.latitude, longitude: from.longitude },
      { latitude: to.latitude, longitude: to.longitude }
    )
  );

  return locationPairs.map((pair, index) => ({
    from: pair[0].name,
    to: pair[1].name,
    distance: (locationPairsDistances[index] / 1000).toFixed(2) + ' km',
  }))
}
