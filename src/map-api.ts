import axios from 'axios';
import { IMapApi } from "./typings";
import redisClient from './redis';

const mapApi: IMapApi = {
  fetchLocation: async (locationQuery: string) => {
    const cachedLocationJson = await redisClient.get(locationQuery);

    if (cachedLocationJson) return JSON.parse(cachedLocationJson);

    try {
      const response = await axios.get(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        locationQuery + '.json?access_token=' + process.env.MAPBOX_API_TOKEN);

      const { features } = response.data;

      if (!features.length) {
        await redisClient.set(locationQuery, "null")
        return null;
      } else {
        const location = {
          latitude: features[0].center[1],
          longitude: features[0].center[0],
          name: features[0].matching_text || features[0].text,
          query: locationQuery,
        };
        redisClient.set(locationQuery, JSON.stringify(location));
        return location;
      }
    } catch (e) {
      return null;
    }
  },
};

export default mapApi;
