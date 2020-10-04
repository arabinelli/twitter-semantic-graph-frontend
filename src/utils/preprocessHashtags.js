const preprocessHashtag = (hashtags) => {
  return hashtags
    .replaceAll("\n", " ")
    .split(" ")
    .filter((item) => {
      if (item.length > 0) {
        return item !== null;
      } else {
        return false;
      }
    })
    .map((item) => {
      return item.startsWith("#") ? item : "#" + item;
    });
};

export default preprocessHashtag;
