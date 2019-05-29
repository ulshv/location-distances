import { calculateResponse } from './locations';
import defaultMapApi from './map-api';
import { IMapApi } from './typings';

export const handler = async (
  mapApi: IMapApi = defaultMapApi,
  locationsQueriesRaw: string[]
) => {
  return await calculateResponse(mapApi, locationsQueriesRaw);
}
