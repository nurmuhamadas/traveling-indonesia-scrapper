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
    arrayToString(location.coordinates) || '',
    arrayOfObjectToString(images) || '',
  ];
  
  return newData;
}

const excelToObject = (data) => {
  let images = stringToArray(data.getCell(10).value);
  images = images.map((image) => stringToObject(image));

  const newData = {
    id: data.getCell(1).value || '',
    name: data.getCell(2).value || '',
    description: data.getCell(3).value || '',
    categories: stringToArray(data.getCell(4).value) || [],
    location: {
      village: data.getCell(5).value || '',
      district: data.getCell(6).value || '',
      city: data.getCell(7).value || '',
      region: data.getCell(8).value || '',
      coordinates: stringToArray(data.getCell(9).value) || [],
    },
    images: images || [],
  };

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

const stringToArray = (string = '') => {
  if (!!string) return string.split(';');
  return [];
}

const stringToObject = (string) => {
  return JSON.parse(string);
}

module.exports = { objectToExcel, excelToObject, stringToArray, stringToObject };
