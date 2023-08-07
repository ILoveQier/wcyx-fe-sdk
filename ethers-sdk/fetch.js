import axios from "axios";
async function fetchTokenPrice(
  ids = "ethereum,usd-coin,staked-ether,rocket-pool-eth,bitcoin,tether"
) {
  const data = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids,
        vs_currencies: "usd",
      },
    }
  );
  return data;
}

export { fetchTokenPrice };
