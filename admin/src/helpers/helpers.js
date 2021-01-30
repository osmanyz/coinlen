export const filterBySymbol = (array, symbolValue) => {
  let findId = array.filter(
    'symbol' ? (a) => a['symbol'] === symbolValue : (a) => Object.keys(a).some((k) => a[k] === symbolValue)
  );

  if (findId.length > 0) {
    return findId[0];
  }

  return findId;
};
