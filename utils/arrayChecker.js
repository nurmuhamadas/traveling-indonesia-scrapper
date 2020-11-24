const contains = (array, params = []) => {
  let status = false;

  params.forEach((param) => {
    if (array.includes(param)) {
      status = true;
    }
  });

  return status;
}

module.exports = contains;