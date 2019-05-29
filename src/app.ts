import { calculateResponse } from './locations';

export const handler = async (locationsQueriesRaw: string[]) => {
  return await calculateResponse(locationsQueriesRaw);
}
