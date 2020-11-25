const objectToExcel = ({id, name, description, categories, location, images}) => {
  let newData = [
    id || '',
    name || '',
    description || '',
    arrayToString(categories) || '',
    location.village || '',
    location.district || '',
    location.city || '',
    location.region || '',
    arrayToString(location.coordinate) || '',
    arrayOfObjectToString(images) || '',
  ];
  
  return newData;
}

const arrayToString = (array = []) => {
  return array.join(';');
}

const arrayOfObjectToString = (array = []) => {
  let newArray = array.map((value) => objectToString(value));
  return newArray.join(';');
}

const objectToString = (obj) => {
  return JSON.stringify(obj);
}

module.exports = { objectToExcel };
