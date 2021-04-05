import accounting from "accounting-js";

export function formatToRupiah(money) {
  return accounting.formatMoney(money, {
    symbol: "Rp ",
    decimal: ",",
    thousand: ".",
    precision: 2,
  });
}
