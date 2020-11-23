const { default: Axios } = require('axios');
const removeSpacing = require('../utils/removeSpacing');

require('dotenv').config();

const apiEndpoint = process.env.MAPBOX_GEOCODE_ENDPOINT;
const accessToken = process.env.MAPBOX_API_KEY;

class mapboxModel {
  static async _getLocation(locationName) {
    const name = removeSpacing(locationName);

    try {
      const { data } = await Axios.get(`${apiEndpoint}${name}.json?language=id&access_token=${accessToken}`);
      return data.features[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async getDetailLocation (locationName) {
    try {
      const {
        id,
        text_id,
        place_name: full_address,
        context: address,
        center: coordinates
      } = await this._getLocation(locationName);

      return {
        id,
        text_id,
        full_address,
        village: address[0].text,
        distric: address[2].text,
        city: address[3].text,
        region: address[4].text,
        post_code: address[1].text,
        coordinates
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = mapboxModel;