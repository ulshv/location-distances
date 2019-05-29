export type ILocation = {
  latitude  : number, // 60.000
  longitude : number, // 35.000
  name      : string, // "New York, NY"
  query     : string, // "new york, ny"
};

export type ILocationPair = [ILocation, ILocation];

export type ILocationPairWithDistance = {
  pair: ILocationPair,
  distance: number,
}

export interface IMapApi {
  fetchLocation: (locationQuery: string) => Promise<ILocation | null>
}
