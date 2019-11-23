function getUrlParams (url) {
  var queryString = url.split("?");
  if (queryString.length < 2) {
    return {};
  }
  queryString = queryString[1];

  var keyValuePairs = queryString.split("&");
  var keyValue, params = {};

  keyValuePairs.forEach(function(pair) {
    if (pair) {
      keyValue = pair.split("=");
      if (keyValue.length >= 2) {
        params[keyValue[0]] = decodeURIComponent(keyValue[1]).replace("+", " ");
      }
    }
  });
  return params
}

export { getUrlParams }
