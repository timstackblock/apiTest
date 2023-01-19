import axios from "axios";

export async function getAccountDetail(accountId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/v2/accounts/${accountId}`)
      .then((res) => {
        resolve(res ? res.data: '');
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getMicroBlock(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get('https://stacks-node-api.testnet.stacks.co/extended/v1/microblock/unanchored/txs')
      .then((res) => {
        resolve(res ? res.data: '');
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAnchorBlock(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get('https://stacks-node-api.testnet.stacks.co/extended/v1/tx?limit=200')
      .then((res) => {
        resolve(res ? res.data: '');
      })
      .catch((error) => {
        reject(error);
      });
  });
}
