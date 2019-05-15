export const GET_KEY = (path = Array, object = Object) =>
  path.reduce((obj, item) => (obj && obj[item] ? obj[item] : null), object)
