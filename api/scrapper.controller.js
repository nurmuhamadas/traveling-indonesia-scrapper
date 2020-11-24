const rp = require('request-promise');
const scrapperModel = require('../models/scrapper.model');
const mapboxModel = require('../models/mapbox.model');

class scrapperController {
  static async getDestinationDetail (url) {
    const html = await rp(url);
    const name = await scrapperModel.getName(html);
    const description = await scrapperModel.getDescription(html);
    const categories = await scrapperModel.getCategory(html);
    const images = await scrapperModel.getImages(html, url);
    const location = await mapboxModel.getDetailLocation(name);

    return {
      name,
      description,
      categories,
      location,
      images,
    }
  }
}

module.exports = scrapperController;