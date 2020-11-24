const urlParser = (url) => {
  const { pathname, origin, hostname} = new URL(url);
  const path = pathname.split('/');
  path.shift();
  return {
    pathname,
    origin,
    hostname,
    path
  }
}

module.exports = urlParser
