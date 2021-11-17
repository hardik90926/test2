function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const formatLabel = (string='') => {
  let str = string.split(/[^a-zA-Z0-9]/g);
  let a = "";
  str.forEach((b) => {
    a = a + `${capitalizeFirstLetter(b)} `;
  });
  a = a
    .replace(/(_|-)/g, " ")
    .trim()
    .replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1);
    })
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  return a;
};

export const isPlainArray = (arrayVariable) => {
  return (
    Array.isArray(arrayVariable) &&
    arrayVariable?.every(
      (element) =>
        ["boolean", "number", "string", "undefined"].includes(typeof element) ||
        element === null
    )
  );
};

export const isSafeValueForDom = (value) =>
  typeof value === "object" ? "" : value;

export const isMocking = process.env.REACT_APP_IS_MOCKING && process.env.REACT_APP_IS_MOCKING === "true";

export const isImgLink = (url) => {
  if(typeof url !== 'string') return false;
  return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
}
