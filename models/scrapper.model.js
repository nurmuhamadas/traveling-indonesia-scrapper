const rp = require('request-promise');
const $ = require('cheerio');
const urlParser = require('../utils/urlParser');
const contains = require('../utils/arrayChecker');
require('dotenv').config();

const baseUrl = process.env.BASE_URL;

class ScrapperModel {
  static async getDestinationsList () {
    let listOfDestinations = [];
    let id = 0;
    const html = await rp(baseUrl);
    const destinations = await $('#mw-content-text .mw-parser-output ul li>a', html).toArray();
    destinations.forEach((destination, index) => {
      let { title: name, href } = destination.attribs;
      if (href.includes('/wiki/')) {
        id += 1;
        href = urlParser(baseUrl).origin + href;
        listOfDestinations.push({
          id,
          name,
          href,
        });
      }
    });

    console.log(listOfDestinations[listOfDestinations.length - 1]);

    return listOfDestinations;
  }

  static async getName (html) {
    const name = await $('h1', html).text();
    return name;
  }

  static async getImages (html, url) {
    let images = [];
    const alt = urlParser(url).path[1];

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

  static async getDescription (html) {
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

  static async getCategory (html) {
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

module.exports = ScrapperModel;