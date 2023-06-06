import { ethers } from "ethers";

function _expandTo18Decimals(n) {
  var decimalPlaces = 18;
  var amount = ethers.utils.parseUnits(Number(n).toString(), decimalPlaces);
  return amount;
}

export { _expandTo18Decimals };
