const currencyMask = (value) => {
  const result = value.replace(/\D/g, '');

  if (result.length === 1) {
    return result.replace(/^(\d)/, '$ 0,0$1');
  }

  if (result.length === 2) {
    return result.replace(/^(\d\d)/, '$ 0,$1');
  }

  if (result.length === 3) {
    return result.replace(/^(^0?)(^\d)(\d\d$)/, '$ $2,$3');
  }

  if (result.length >= 4 && result.length <= 5) {
    return result.replace(/^(^0?)(\d*)(\d\d$)/, '$ $2,$3');
  }

  if (result.length >= 6 && result.length <= 8) {
    return result.replace(/^(\d*)(\d{3})(\d\d$)/, '$ $1.$2,$3');
  }

  if (result.length >= 9) {
    return result.replace(/^(\d)(\d{3})(\d{3})(\d{2}).*/, '$ $1.$2.$3,$4');
  }

  return result;
};

const removeCurrencyMask = (value) => parseFloat(
  value
    .replace('$ ', '')
    .replace('.', '')
    .replace(',', '.'),
);

export { currencyMask, removeCurrencyMask };
