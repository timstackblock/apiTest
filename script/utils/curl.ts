import axios from "axios";

export async function getAccountDetail(accountAddress: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/v2/accounts/${accountAddress}`)
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

export async function getAnchorBlock(txid: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/${txid}`)
      .then((res) => {
        resolve(res ? res.data: '');
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAccountBalance(principal: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/balances`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAccountSTXBalance(principal: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/stx`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAccountTXs(principal: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/transactions`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getTxInformation(principal: string, tx_id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/${tx_id}/with_transfers`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getTxIncludingSTX(principal: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/transactions_with_transfers`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getLatestNonce(principal: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/nonces`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAccountAssets(principal: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/assets`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getInboundSTX(principal: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${principal}/stx_inbound`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getAccountInfo(principal: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/v2/accounts/${principal}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getRecentBlocks(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/block`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getBlockByHash(hash: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/block/${hash}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getBlockByHeight(height: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/block/by_height/${height}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getBlockByBurnChainHash(burn_block_hash: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/block/by_burn_block_hash/${burn_block_hash}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getBlockByBurnChainHeight(burn_block_height: number): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/block/by_burn_block_height/${burn_block_height}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getSTXTestnetTokens(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://stacks-node-api.testnet.stacks.co/extended/v1/faucets/stx`, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function addTestnetBTCTokens(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post('https://stacks-node-api.testnet.stacks.co/extended/v1/faucets/btc', data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getEstimatedFee(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get('https://stacks-node-api.testnet.stacks.co/v2/fees/transfer')
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getTXFee(data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .post('https://stacks-node-api.testnet.stacks.co/v2/fees/transaction', data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getFungibleTokenMetaData(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/tokens/ft/metadata')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getFungibleTokenMetaDataContractId(contractId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/tokens/${contractId}/ft/metadata')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function coreAPIInfo(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/v2/info')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function APIStatus(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/status')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function networkTargetBlockTime(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/info/network_block_times')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function oneNetworkTargetBlockTime(network: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/info/network_block_time/${network}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function totalUnlockedSTXSupply(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/stx_supply')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function totalSTXSupplyPlainText(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/stx_supply/total/plain')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function circulatingSTXSupplyPlainText(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/stx_supply/circulating/plain')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function totalUnlockedSTXSupplyLegacy(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/stx_supply/legacy_format')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getPOT(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/v2/pox')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getMicroBlocks(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/microblock')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getSpecificMicroBlock(hash: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/microblock/${hash}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function unanchoredMicroBlocks(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/extended/v1/microblock/unanchored/txs')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getNamespacePrice(tld: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/v2/prices/namespaces/${tld}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getNamePrice(name: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/v2/prices/names/${name}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getAllNamespace(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/v1/namespaces')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getNamespaceName(tld: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/v1/namespaces/${tld}/names`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getAllNames(): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get('https://stacks-node-api.testnet.stacks.co/v1/names')
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getNameDetail(name: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/v1/names/${name}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getNameSubdomain(name: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/v1/names/${name}/subdomains`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getZoneFile(name: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/v1/names/${name}/zonefile`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getHistoricalZoneFile(name: string, zoneFileHash: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/v1/names/${name}/zonefile/${zoneFileHash}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getNamesOwnedByAddress(blockchain: string, address: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
        .get(`https://stacks-node-api.testnet.stacks.co/v1/addresses/${blockchain}/${address}`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
  });
}

export async function getAvailableNetworks(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .post('https://stacks-node-api.testnet.stacks.co/rosetta/v1/network/list', {})
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function search(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/search/${id}`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function recentRewardSlotHolders(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get('https://stacks-node-api.testnet.stacks.co/extended/v1/burnchain/reward_slot_holders')
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function recentRewardSlotHolder(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/burnchain/reward_slot_holders/${address}`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function burnchainRewards(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get('https://stacks-node-api.testnet.stacks.co/extended/v1/burnchain/rewards')
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function burnchainReward(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/burnchain/rewards/${address}`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function totalBurnchainReward(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/burnchain/rewards/${address}/total`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getRecentTXs(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get('https://stacks-node-api.testnet.stacks.co/extended/v1/tx')
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getMempoolTXs(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get('https://stacks-node-api.testnet.stacks.co/extended/v1/tx/mempool')
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getDroppedMempoolTXs(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get('https://stacks-node-api.testnet.stacks.co/extended/v1/tx/mempool/dropped')
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getStatsMempoolTXs(): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get('https://stacks-node-api.testnet.stacks.co/extended/v1/tx/mempool/stats')
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getTXDetailList(txId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/multiple?tx_id=${txId}`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getTX(txId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/${txId}`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getTXRaw(txId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/${txId}/raw`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getTXByBlockHash(block_hash: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/block/${block_hash}`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getTXByBlockHeight(height: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/block_height/${height}`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getTXForAddress(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${address}/mempool`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export async function getTXEvents(txId: string): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get(`https://stacks-node-api.testnet.stacks.co/extended/v1/tx/events?tx_id=${txId}`)
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
