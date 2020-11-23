const removeSpacing = (string) => {
  const splittedString = string.split(' ');
  return splittedString.join('%20');
}

module.exports = removeSpacing;