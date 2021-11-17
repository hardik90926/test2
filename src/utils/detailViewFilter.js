const INVALID_TYPES = [
  "virtualRelation",
];

export default (attributes) => {
  return attributes.filter(attr => !INVALID_TYPES.includes(attr?.type))
};