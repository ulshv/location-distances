import axios from 'axios';
import { IMapApi } from "./typings";
import { withRedisCache } from './redis';

const API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const fetchLocation = async (locationQuery: string) => {
  try {
    const url = `${API_URL}/${locationQuery}.json?access_token=${process.env.MAPBOX_API_TOKEN}`;
    const response = await axios.get(url);
    const { features } = response.data;

    if (!features.length) {
      return null;
    } else {
      return {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        name: features[0].matching_text || features[0].text,
        query: locationQuery,
      };
    }
  } catch (e) {
    return null;
  }
}

const mapApi: IMapApi = {
  fetchLocation: withRedisCache(fetchLocation)
};

export default mapApi;
