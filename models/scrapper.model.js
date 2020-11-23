const rp = require('request-promise');
const $ = require('cheerio');
const urlParser = require('../utils/urlParser');

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
    const descriptions = await this._getDescriptions(html);
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
}

module.exports = scrapperModel;