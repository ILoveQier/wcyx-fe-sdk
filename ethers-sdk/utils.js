import { ethers } from "ethers";
import { DECIMAL } from "@/jsons/config/CONFIG_CONSTANT";

function _expandToDecimals(n) {
  var amount = ethers.utils.parseUnits(Number(n).toString(), DECIMAL);
  return amount;
}
function _divideToDecimals(n) {
  var amount = n / 10 ** DECIMAL;
  return amount;
}

export { _expandToDecimals, _divideToDecimals };
