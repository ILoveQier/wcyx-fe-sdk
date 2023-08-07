import { providers, ethers } from "ethers";
import { PROVIDER_URL } from "@/jsons/config/CONFIG_CONSTANT";

async function _getSigner(userAddress, activeConnector) {
  try {
    let Web3Provider = window?.ethereum;
    if (activeConnector) {
      Web3Provider = await activeConnector.getProvider();
    }
    const provider = new providers.Web3Provider(Web3Provider);
    const signer = provider.getSigner(userAddress);
    return signer;
  } catch (error) {
    return null;
  }
}
function _getProvider(pvd_url) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      pvd_url || PROVIDER_URL
    );
    return provider;
  } catch (error) {
    return null;
  }
}
async function _getBalance(provider, address) {
  try {
    let num = await provider.getBalance(address);
    return Number(num) / 1e18;
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

export { _getProvider, _getBalance, _getSigner, _getContract, _multiCall };
