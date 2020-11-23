const urlParser = (url) => {
  const splittedUrl = url.split('/');

  return {
    hostname:  splittedUrl[2],
    param: splittedUrl[4],
  }
}

module.exports = urlParser;
