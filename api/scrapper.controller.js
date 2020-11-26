const rp = require('request-promise');
const scrapperModel = require('../models/scrapper.model');
const mapboxModel = require('../models/mapbox.model');

class ScrapperController {
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

    for (let i = 0; i < 830 /* data total */; i += 1) {
      const detail = await this.getDestinationDetail(listOfDestination[i].href);
      await allDestinationDetail.push({
        id: listOfDestination[i].id,
        ...detail,
      });
      console.log({ id: listOfDestination[i].id, name: detail.name });
    }

    return await allDestinationDetail;
  }
}

module.exports = ScrapperController;