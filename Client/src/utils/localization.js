const localeToUse = "en-CA";
const currencyAbbreviation = "CAD";

export function currencyFormatter(data) {
  data = parseFloat(data);
  return data.toLocaleString(localeToUse, { style: "currency", currency: currencyAbbreviation });
}

export function getShortMonthName(date) {
  date.toLocaleString(localeToUse, { month: "short" });
}
