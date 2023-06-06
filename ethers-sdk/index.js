import { providers, ethers } from "ethers";

function _getSigner(userAddress) {
  try {
    const provider = new providers.Web3Provider(window?.ethereum);
    const signer = provider.getSigner(userAddress);
    return signer;
  } catch (error) {
    return null;
  }
}
function _getContract(addressOrName, abi, signerOrProvider) {
  return new ethers.Contract(addressOrName, abi, signerOrProvider);
}
async function _multiCall(
  contract,
  funcName = "",
  args = [],
  isdecoupling = true,
  postFunc = (a) => a
) {
  let arrs = [];
  for (let i = 0; i < args.length; i++) {
    let r = isdecoupling
      ? await contract[funcName](...args[i])
      : await contract[funcName](args[i]);
    arrs.push(postFunc(r));
  }
  return arrs;
}

export { _getSigner, _getContract, _multiCall };
