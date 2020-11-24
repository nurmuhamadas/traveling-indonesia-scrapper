const rp = require('request-promise');
const $ = require('cheerio');
const urlParser = require('../utils/urlParser');
const contains = require('../utils/arrayChecker');

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

  static async getDestinationDetails (url) {
    this._url = url;
    const html = await rp(url);
    const descriptions = await this._getCategory(html);
    console.log(descriptions);
  }

  static async _getImages (html) {
    let images = [];
    const alt = urlParser(this._url).param;

    await $('#bodyContent .gallery img', html).toArray().forEach((image) => {
      images.push({
        href: image.attribs.src,
        text: image.attribs.alt || alt,
      });
    });

    await $('#bodyContent .thumbimage', html).toArray().forEach((image) => {
      images.push({
        href: image.attribs.src,
        text: image.attribs.alt || alt,
      });
    });

    await $('#bodyContent .infobox img', html).toArray().forEach((image) => {
      images.push({
        href: image.attribs.src,
        text: image.attribs.alt || alt,
      });
    });

    return images;
  }

  static async _getDescription (html) {
    let shortDescription;
    const fullDescription = await $('#bodyContent .mw-parser-output p', html).text();
    const splittedDescription = fullDescription.split('\n');

    // Avoid unexpected string
    splittedDescription.every((description) => {
      if (description.length > 150) {
        shortDescription = description;
        return false;
      }
      return true
    });
        
    return shortDescription;
  }

  static async _getCategory (html) {
    let categories = [];
    const filter = {
      alam: ['pantai', 'gunung', 'danau', 'bukit', 'terjun', 'pulau', 'gua', 'goa', 'lembah',
             'cagar', 'kepulauan', 'teluk', 'sungai', 'kawah', 'keraton', 'kebun', 'laut',
              'pegunungan'],
      religi: ['makam', 'masjid'],
      taman: ['taman', 'alun', 'alun-alun'],
      sejarah: ['monumen', 'museum', 'benteng', 'rumah', 'balai', 'istana', 'kerajaan', 'tugu', 'pahlawan',
              'candi', 'situs'],
      budaya: ['budaya'],
      modern: ['mall', 'town', 'city', 'plaza', 'center', 'shooping', 'renang', 'waterpark', 'waterboom', 'park']
    };

    const title = $('h1', html).text().toLowerCase();
    const splittedTitle = title.split(' ');
    Object.keys(filter).forEach((category) => {
      if (contains(splittedTitle, filter[category]) && !categories.includes(category)) {
        categories.push(category);
      }
    });

    if (categories.length < 1) {
      categories.push('lainnya');
    }

    return categories;
  }
}

module.exports = scrapperModel;