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
        const {
          id,
          text_id,
          place_name: full_address,
          context: address,
          center: coordinates
        } = locations

        return {
          id,
          text_id,
          full_address,
          village: !!address[0]? address[0].text : '',
          distric: !!address[2]? address[2].text : '',
          city: !!address[3]? address[3].text : '',
          region: !!address[4]? address[4].text : '',
          post_code: !!address[1]? address[1].text : '',
          coordinates
        }
      }

      return {
        id: '',
        text_id: '',
        full_address: '',
        village: '',
        distric: '',
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