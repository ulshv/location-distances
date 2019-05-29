import axios from 'axios';
import { IMapApi } from "./typings";

const mapApi: IMapApi = {
  fetchLocation: async (locationQuery: string) => {
    try {
      const response = await axios.get(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        locationQuery + '.json?access_token=' + process.env.MAPBOX_API_TOKEN);

      const { features } = response.data;

      if (!features.length) {
        return null;
      } else {
        return {
          latitude: features[0].center[1],
          longitude: features[0].center[0],
          name: features[0].matching_text || features[0].text,
          query: locationQuery,
        }
      }
    } catch (e) {
      return null;
    }
  },
};

export default mapApi;
