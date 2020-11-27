const { default: Axios } = require('axios');
const removeSpacing = require('../utils/removeSpacing');

require('dotenv').config();

const apiEndpoint = process.env.MAPBOX_GEOCODE_ENDPOINT;
const accessToken = process.env.MAPBOX_API_KEY;

class MapboxModel {
  static async _getLocation(locationName) {
    const name = removeSpacing(locationName);

    try {
      const { data } = await Axios.get(`${apiEndpoint}${name}.json?language=id&access_token=${accessToken}`);
      if (!!data.features) {
        return data.features[0];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  static async getDetailLocation (locationName) {
    try {
      const locations = await this._getLocation(locationName);

      if (await !!locations) {
        let address = {};
        const {
          id,
          text_id,
          place_name: full_address,
          context,
          center: coordinates
        } = locations;

        context.forEach(({ id, text }) => {
          if (id.includes('neighborhood')) address = { ...address, village: text || '', };
          else if (id.includes('locality')) address = { ...address, district: text || '', };
          else if (id.includes('place')) address = { ...address, city: text || '', };
          else if (id.includes('region')) address = { ...address, region: text || '', };
          else if (id.includes('postcode')) address = { ...address, post_code: text || '', };
        });

        return {
          id,
          text_id,
          full_address,
          ...address,
          coordinates
        }
      }

      return {
        id: '',
        text_id: '',
        full_address: '',
        village: '',
        district: '',
        city: '',
        region: '',
        post_code: '',
        coordinates: [],
      };

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MapboxModel;