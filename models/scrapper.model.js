const rp = require('request-promise');
const $ = require('cheerio');

class scrapperModel {
  static async getDestinationsList (url) {
    let listOfDestinations = [];
    const html = await rp(url);
    const destinations = await $('.mw-parser-output ul li>a', html).toArray();
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