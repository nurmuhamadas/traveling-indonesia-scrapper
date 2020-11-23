const rp = require('request-promise');
const $ = require('cheerio');
require('dotenv').config();

const listUrl = `${process.env.BASE_URL}Daftar_tempat_wisata_di_Indonesia`;

class scrapperModel {
  static async getHtml () {
    this._html = await rp(listUrl);
  }

  static async getDestinationsList () {
    let listOfDestinations = [];
    const destinations = await $('.mw-parser-output ul li>a', this._html).toArray();
    destinations.forEach((destination, index) => {
      const { title: name, href } = destination.attribs;
      if (href.includes('/wiki/')) {
        listOfDestinations.push({
          name,
          href,
        });
      }
    });

    return listOfDestinations;
  }
}

module.exports = scrapperModel;