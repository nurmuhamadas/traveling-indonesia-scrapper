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

  static async getAllDestinationDetail () {
    let allDestinationDetail = [];
    const listOfDestination = await scrapperModel.getDestinationsList();

    for (let i = 0; i < listOfDestination.length; i += 1) {
      const detail = await this.getDestinationDetail(listOfDestination[i].href);
      await allDestinationDetail.push({
        id: listOfDestination[i].id,
        ...detail,
      });
    }

    return await allDestinationDetail;
  }
}

module.exports = scrapperController;