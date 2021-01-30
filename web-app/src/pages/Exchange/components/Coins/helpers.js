/**
 *
 * @param {*} param
 */
export const _checkPreviousPrice = ({ coin }) => {
  if (parseFloat(coin.U) > parseFloat(coin.UP)) {
    return 'buy-bg';
  } else if (parseFloat(coin.U) < parseFloat(coin.UP)) {
    return 'sell-bg';
  }

  return '';
};
 

export const _checkPreviousPriceArrows = ({ coin }) => {
  if (parseFloat(coin.U) > parseFloat(coin.UP)) {
    return '↑';
  } else if (parseFloat(coin.U) < parseFloat(coin.UP)) {
    return '↓';
  }

  return '';
};

/**
 *
 * @param {*} coin
 */
export const _twentyFourHours = (coin) => {
  if (parseFloat(coin.G24H) >= 1.5) {
    return 'buy-text';
  } else if (parseFloat(coin.G24H) <= -1.5) {
    return 'sell-text';
  }

  return '';
};

/**
 *
 * @param {*} param
 */
export const _opportunityText = ({ diff, diffBtc }) => {
  if (parseFloat(diff) >= 2 || parseFloat(diffBtc) <= -2) {
    return 'Satış Fırsatı';
  } else if (parseFloat(diff) <= -2 && parseFloat(diffBtc) >= 1) {
    return 'Alış Fırsatı';
  } else if (parseFloat(diff) > 1) {
    return 'Düşüyor';
  } else if (parseFloat(diffBtc) > 0.5) {
    return 'Yükseliyor';
  }

  return '';
};

/**
 *
 * @param {*} param
 */
export const _opportunityTextMobile = ({ diff, diffBtc }) => {
  if (parseFloat(diff) > 2 || parseFloat(diffBtc) <= -2) {
    return 'Satış Fırsatı';
  } else if (parseFloat(diff) <= -2 && parseFloat(diffBtc) >= 1) {
    return 'Alış Fırsatı';
  }

  return '';
};

/**
 *
 * @param {*} param
 */
export const _opportunityBg = ({ diff, isMobile }) => {
  if (parseFloat(diff) > 1) {
    return 'buy-bg' + (isMobile ? ' mobile' : '');
  }
  if (parseFloat(diff) < -2) {
    return 'sell-bg' + (isMobile ? ' mobile' : '');
  }
  return '';
};

/**
 *
 * @param {*} param
 */
export const _bitcoinOpportunity = ({ coin, diff }) => {
  if (coin === 'BTC') {
    return '';
  } else if (parseFloat(diff) <= -2) {
    return 'sell-bg';
  } else if (parseFloat(diff) >= 2) {
    return 'buy-bg';
  }
  return '';
};

/**
 *
 * @param {*} formats
 */
export const formatKeys = (formats) => {
  let keys = new Map();
  if (formats === null) {
    return keys;
  }
  formats.forEach((format) => {
    keys.set(format.C, format);
  });
  return keys;
};
