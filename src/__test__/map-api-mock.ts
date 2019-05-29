import { ILocation, IMapApi } from "../typings";

const locationsDetailsMock: { [key: string]: ILocation } = {
  'new york': {
    latitude: 40.7648,
    longitude: -73.9808,
    name: 'New York',
    query: 'new york',
  },
  'moscow': {
    latitude: 55.75583,
    longitude: 37.61778,
    name: 'Moscow',
    query: 'moscow',
  },
  'philadelphia': {
    latitude: 40.0115,
    longitude: -75.1327,
    name: 'Philadelphia',
    query: 'philadelphia',
  },
  'saint petersburg': {
    latitude: 59.95,
    longitude: 30.31667,
    name: 'Saint Petersburg',
    query: 'saint petersburg',
  }
}

const mapApiMock: IMapApi = {
  fetchLocation: async (locationQuery: string) => {
    return locationsDetailsMock[locationQuery];
  }
}

export default mapApiMock;
