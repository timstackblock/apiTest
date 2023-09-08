import {
  addTestnetBTCTokens,
  APIStatus,
  burnchainReward,
  burnchainRewards,
  circulatingSTXSupplyPlainText,
  coreAPIInfo,
  getAccountAssets,
  getAccountBalance,
  getAccountInfo,
  getAccountSTXBalance,
  getAccountTXs,
  getAllNames,
  getAllNamespace,
  getAvailableNetworks,
  getBlockByBurnChainHash,
  getBlockByBurnChainHeight,
  getBlockByHash,
  getBlockByHeight,
  getDroppedMempoolTXs,
  getEstimatedFee,
  getFungibleTokenMetaData,
  getFungibleTokenMetaDataContractId,
  getHistoricalZoneFile,
  getInboundSTX,
  getLatestNonce,
  getMempoolTXs,
  getMicroBlocks,
  getNameDetail,
  getNamePrice,
  getNamesOwnedByAddress,
  getNamespaceName,
  getNamespacePrice,
  getNameSubdomain,
  getPOT,
  getRecentBlocks,
  getRecentTXs,
  getSpecificMicroBlock,
  getStatsMempoolTXs,
  getSTXTestnetTokens,
  getTX,
  getTXByBlockHash,
  getTXByBlockHeight,
  getTXDetailList,
  getTXEvents,
  getTXFee,
  getTXForAddress,
  getTxIncludingSTX,
  getTxInformation,
  getTXRaw,
  getZoneFile,
  networkTargetBlockTime,
  oneNetworkTargetBlockTime,
  recentRewardSlotHolder,
  recentRewardSlotHolders,
  search,
  totalBurnchainReward,
  totalSTXSupplyPlainText,
  totalUnlockedSTXSupply,
  totalUnlockedSTXSupplyLegacy,
  unanchoredMicroBlocks,
} from "../utils/curl";
import  { AxiosError } from 'axios';


export async function api404Test(options: any) {
  console.log('RUNNING the test for API 404 response...');
  await triggerAccountTests(options);
  await triggerBlocksTests();
  await triggerFaucetTests(options);
  await triggerFeesTests();
  await triggerFungibleTokensTests();
  await triggerInfoTests();
  await triggerMicroBlocksTests();
  await triggerNamesTests();
  await triggerNFTTests();
  await triggerRosettaTests();
  await triggerSearchTests();
  await triggerSmartContractTests();
  await triggerStackingRewardsTests();
  await triggerTransactionTests(options);
  console.log('COMPLETED running the test for API 404 response...');
}

async function triggerAccountTests(options: any) {
  const { accountAddress } = options;

  try {
    // Get account balances API
    const response = await getAccountBalance(accountAddress);
    console.log(`${response.status} response from Get account balances API`);
  } catch (e) {
    console.log("Error from Get account balances API: ", e);
  }

  try {
    // Get account STX balance API
    const response = await getAccountSTXBalance(accountAddress);
    console.log(`${response.status} response from Get account STX balance API`);
  } catch (e) {
    console.log("Error from Get account STX balance API: ", e);
  }

  let txId = "";
  try {
    // Get account transactions API
    const response = await getAccountTXs(accountAddress);
    txId = response.data.results[0]?.tx_id;
    console.log(
      `${response.status} response from Get account transactions API with txID ${txId}`
    );
  } catch (e) {
    console.log("Error from Get account transactions API: ", e);
  }

  try {
    // Get account transaction information for specific transaction API
    const response = await getTxInformation(accountAddress, txId);
    console.log(
      `${response.status} response from Get account transaction information for specific transaction API`
    );
  } catch (e) {
    console.log(
      "Error from Get account transaction information for specific transaction: ",
      e
    );
  }

  try {
    // Get account transactions including STX transfers for each transaction API
    const response = await getTxIncludingSTX(accountAddress);
    console.log(
      `${response.status} response from Get account transactions including STX transfers for each transaction API`
    );
  } catch (e) {
    console.log(
      "Error from Get account transactions including STX transfers for each transaction: ",
      e
    );
  }

  try {
    // Get the latest nonce used by an account API
    const response = await getLatestNonce(accountAddress);
    console.log(
      `${response.status} response from Get the latest nonce used by an account API`
    );
  } catch (e) {
    console.log("Error from Get the latest nonce used by an account: ", e);
  }

  try {
    // Get account assets API
    const response = await getAccountAssets(accountAddress);
    console.log(`${response.status} response from Get account assets API`);
  } catch (e) {
    console.log("Error from Get account assets: ", e);
  }

  try {
    // Get inbound STX transfers API
    const response = await getInboundSTX(accountAddress);
    console.log(
      `${response.status} response from Get inbound STX transfers API`
    );
  } catch (e) {
    console.log("Error from Get inbound STX transfers: ", e);
  }

  try {
    // Get account info API
    const response = await getAccountInfo(accountAddress);
    console.log(`${response.status} response from Get account info API`);
  } catch (e) {
    console.log("Error from Get account info: ", e);
  }
}

async function triggerBlocksTests() {
  let hashId = "";
  let burnBlockHashId = "";
  let burnBlockHeight;
  try {
    // Get recent blocks API
    const response = await getRecentBlocks();
    hashId = response.data.results[0]?.hash;
    burnBlockHashId = response.data.results[0]?.burn_block_hash;
    burnBlockHeight = response.data.results[0]?.burn_block_height;
    console.log(`${response.status} response from Get recent blocks API`);
  } catch (e) {
    console.log("Error from Get recent blocks API: ", e);
  }

  try {
    // Get block by hash API
    const response = await getBlockByHash(hashId);
    console.log(`${response.status} response from Get block by hash API`);
  } catch (e) {
    console.log("Error from Get block by hash API: ", e);
  }

  try {
    // Get block by height API
    const response = await getBlockByHeight(100);
    console.log(`${response.status} response from Get block by height API`);
  } catch (e) {
    console.log("Error from Get block by height API: ", e);
  }

  try {
    // Get block by burnchain block hash API
    const response = await getBlockByBurnChainHash(burnBlockHashId);
    console.log(
      `${response.status} response from Get block by burnchain block hash API`
    );
  } catch (e) {
    console.log("Error from Get block by burnchain block hash API: ", e);
  }

  try {
    // Get block by burnchain height API
    const response = await getBlockByBurnChainHeight(burnBlockHeight);
    console.log(
      `${response.status} response from Get block by burnchain height API`
    );
  } catch (e) {
    console.log("Error from Get block by block by burnchain height API: ", e);
  }
}

async function triggerFaucetTests(options: any) {
  const { recipient } = options;
  try {
    // Get STX testnet tokens
    const payload = {
      address: recipient,
    };
    const response = await getSTXTestnetTokens(payload);
    console.log(`${response.status} response from Get STX testnet tokens API`);
  } catch (e) {
    console.log("Error from Get STX testnet tokens API: ", e);
  }

  // TODO: need the value of testnet BTC address
  // try {
  //   // Add testnet BTC tokens to address
  //   const payload = {
  //     address: recipient,
  //   };
  //   const response = await addTestnetBTCTokens(payload);
  //   console.log(`${response.status} response from Add testnet BTC tokens to address API`);
  // } catch (e) {
  //   console.log("Error from Add testnet BTC tokens to address API: ", e);
  // }
}

async function triggerFeesTests() {
  try {
    // Get estimated fee API
    const response = await getEstimatedFee();
    console.log(`${response.status} response from Get estimated fee API`);
  } catch (error) {
    const e = error as AxiosError

    if(e.response?.data)
    {
      console.log("Error from Get Fungible tokens metadata list API: ", e.response.data);
    }else{
      console.log("Error from Get Fungible tokens metadata list API: ", e);
    }
    
  }

  // TODO: need the value of transaction_payload
  // try {
  //   // Get approximate fees for a given transaction API
  //   const payload = {
  //     transaction_payload: "",
  //   };
  //   const response = await getTXFee(payload);
  //   console.log(
  //     `${response.status} response from Get approximate fees for a given transaction API`
  //   );
  // } catch (e) {
  //   console.log(
  //     "Error from Get approximate fees for a given transaction API: ",
  //     e
  //   );
  // }
}

async function triggerFungibleTokensTests() {
  try {
    // Get Fungible tokens metadata list API
    const response = await getFungibleTokenMetaData();
    console.log(
      `${response.status} response from Get Fungible tokens metadata list API`
    );
  } catch (error) {
    const e = error as AxiosError

    if(e.response?.data)
    {
      console.log("Error from Get Fungible tokens metadata list API: ", e.response.data);
    }else{
      console.log("Error from Get Fungible tokens metadata list API: ", e);
    }
    
  }

  // TODO: need the value of contractId
  // try {
  //   // Get Fungible tokens metadata for contract id API
  //   const contractId = "";
  //   const response = await getFungibleTokenMetaDataContractId(contractId);
  //   console.log(
  //     `${response.status} response from Get Fungible tokens metadata for contract id API`
  //   );
  // } catch (e) {
  //   console.log(
  //     "Error from Get Fungible tokens metadata for contract id API: ",
  //     e
  //   );
  // }
}

async function triggerInfoTests() {
  try {
    // Get Core API info
    const response = await coreAPIInfo();
    console.log(`${response.status} response from Get Core API info API`);
  } catch (e) {
    console.log("Error from Get Core API info API: ", e);
  }

  try {
    // Get API status
    const response = await APIStatus();
    console.log(`${response.status} response from Get API status API`);
  } catch (e) {
    console.log("Error from Get API status API: ", e);
  }

  try {
    // Get the network target block time
    const response = await networkTargetBlockTime();
    console.log(
      `${response.status} response from Get the network target block time API`
    );
  } catch (e) {
    console.log("Error from Get the network target block time API: ", e);
  }

  try {
    // Get a given network's target block time
    const response = await oneNetworkTargetBlockTime("testnet");
    console.log(
      `${response.status} response from Get a given network's target block time API`
    );
  } catch (e) {
    console.log("Error from Get a given network's target block time API: ", e);
  }

  try {
    // Get total and unlocked STX supply
    const response = await totalUnlockedSTXSupply();
    console.log(
      `${response.status} response from Get total and unlocked STX supply API`
    );
  } catch (e) {
    console.log("Error from Get total and unlocked STX supply API: ", e);
  }

  try {
    // Get total STX supply in plain text format
    const response = await totalSTXSupplyPlainText();
    console.log(
      `${response.status} response from Get total STX supply in plain text format API`
    );
  } catch (e) {
    console.log(
      "Error from Get total STX supply in plain text format API: ",
      e
    );
  }

  try {
    // Get circulating STX supply in plain text format
    const response = await circulatingSTXSupplyPlainText();
    console.log(
      `${response.status} response from Get circulating STX supply in plain text format API`
    );
  } catch (e) {
    console.log(
      "Error from Get total circulating STX supply in plain text format API: ",
      e
    );
  }

  try {
    // Get total and unlocked STX supply (results formatted the same as the legacy 1.0 API)
    const response = await totalUnlockedSTXSupplyLegacy();
    console.log(
      `${response.status} response from Get total and unlocked STX supply legacy API`
    );
  } catch (e) {
    console.log("Error from Get total and unlocked STX supply legacy API: ", e);
  }

  try {
    // Get Proof-of-Transfer details
    const response = await getPOT();
    console.log(
      `${response.status} response from Get Proof-of-Transfer details API`
    );
  } catch (e) {
    console.log("Error from Get Proof-of-Transfer details API: ", e);
  }
}

async function triggerMicroBlocksTests() {
  try {
    // Get recent microblocks
    const response = await getMicroBlocks();
    console.log(`${response.status} response from Get recent microblocks API`);
  } catch (e) {
    console.log("Error from Get recent microblocks API: ", e);
  }

  try {
    // Get microblock
    const blockResponse = await getRecentBlocks();
    const hashId = blockResponse.data.results[0]?.parent_microblock_hash;
    const response = await getSpecificMicroBlock(hashId);
    console.log(`${response.status} response from Get microblock API`);
  } catch (e) {
    console.log("Error from Get microblock API: ", e);
  }

  try {
    // Get the list of current transactions that belong to unanchored microblocks
    const response = await unanchoredMicroBlocks();
    console.log(
      `${response.status} response from Get the list of current transactions that belong to unanchored microblocks API`
    );
  } catch (e) {
    console.log(
      "Error from Get the list of current transactions that belong to unanchored microblocks API: ",
      e
    );
  }
}

async function triggerNamesTests() {
  try {
    // Get Namespace Price
    const response = await getNamespacePrice("id");
    console.log(`${response.status} response from Get Namespace Price API`);
  } catch (e) {
    console.log("Error from Get Namespace Price API: ", e);
  }

  let namespace = "";
  try {
    // Get All Namespaces
    const response = await getAllNamespace();
    namespace = response.data.namespaces[0] || "";
    console.log(`${response.status} response from Get All Namespaces API`);
  } catch (e) {
    console.log("Error from Get All Namespaces API: ", e);
  }

  try {
    // Get Namespace Names
    const response = await getNamespaceName(namespace);
    console.log(`${response.status} response from Get Namespace Names API`);
  } catch (e) {
    console.log("Error from Get Namespace Names API: ", e);
  }

  let name = "";
  try {
    // Get All Names
    const response = await getAllNames();
    name = response.data[0] || "";
    console.log(`${response.status} response from Get All Names API`);
  } catch (e) {
    console.log("Error from Get All Names API: ", e);
  }

  try {
    // Get Name Price
    const response = await getNamePrice(name);
    console.log(`${response.status} response from Get Name Price API`);
  } catch (e) {
    console.log("Error from Get Name Price API: ", e);
  }

  let zoneFileHash = "";
  try {
    // Get Name Details
    const response = await getNameDetail(name);
    zoneFileHash = response.data.zonefile_hash;
    console.log(`${response.status} response from Get Name Details API`);
  } catch (e) {
    console.log("Error from Get Name Details API: ", e);
  }

  try {
    // Get Name Subdomains
    const response = await getNameSubdomain(name);
    console.log(`${response.status} response from Get Name Subdomains API`);
  } catch (e) {
    console.log("Error from Get Name Subdomains API: ", e);
  }

  try {
    // Get Zone File
    const response = await getZoneFile(name);
    console.log(`${response.status} response from Get Zone File API`);
  } catch (e) {
    console.log("Error from Get Zone File API: ", e);
  }

  try {
    // Get Historical Zone File
    const response = await getHistoricalZoneFile(name, zoneFileHash);
    console.log(
      `${response.status} response from Get Historical Zone File API`
    );
  } catch (e) {
    console.log("Error from Get Historical Zone File API: ", e);
  }

  // TODO need blockchain and address value
  // try {
  //   // Get Names Owned by Address
  //   const response = await getNamesOwnedByAddress(blockchain, address);
  //   console.log(`${response.status} response from Get Names Owned by Address API`);
  // } catch (e) {
  //   console.log("Error from Get Names Owned by Address API: ", e);
  // }
}

// TODO need to determine parameters for all APIs that belongs to NFTs
async function triggerNFTTests() {}

// TODO payload given in the documentation is not working
async function triggerRosettaTests() {
  try {
    // Get List of Available Networks
    const response = await getAvailableNetworks();
    console.log(
      `${response.status} response from Get List of Available Networks API`
    );
  } catch (e) {
    console.log("Error from Get List of Available Networks API: ", e);
  }
}

async function triggerSearchTests() {
  try {
    // search API
    const blockResponse = await getRecentBlocks();
    const hashId = blockResponse.data.results[0]?.hash;
    const response = await search(hashId);
    console.log(`${response.status} response from search API`);
  } catch (e) {
    console.log("Error from search API: ", e);
  }
}

// TODO need to determine parameters for all APIs
async function triggerSmartContractTests() {}

async function triggerStackingRewardsTests() {
  let address = "";
  try {
    // Get recent reward slot holders
    const response = await recentRewardSlotHolders();
    address = response.data.results[0]?.address;
    console.log(
      `${response.status} response from Get recent reward slot holders API`
    );
  } catch (e) {
    console.log("Error from Get recent reward slot holders API: ", e);
  }

  try {
    // Get recent reward slot holder entries for the given address
    const response = await recentRewardSlotHolder(address);
    console.log(
      `${response.status} response from Get recent reward slot holder entries for the given address API`
    );
  } catch (e) {
    console.log(
      "Error from Get recent reward slot holder entries for the given address API: ",
      e
    );
  }

  try {
    // Get recent burnchain reward recipients
    const response = await burnchainRewards();
    console.log(
      `${response.status} response from Get recent burnchain reward recipients API`
    );
  } catch (e) {
    console.log("Error from Get recent burnchain reward recipients API: ", e);
  }

  try {
    // Get recent burnchain reward for the given recipient
    const response = await burnchainReward(address);
    console.log(
      `${response.status} response from Get recent burnchain reward for the given recipient API`
    );
  } catch (e) {
    console.log(
      "Error from Get recent burnchain reward for the given recipient API: ",
      e
    );
  }

  try {
    // Get total burnchain rewards for the given recipient
    const response = await totalBurnchainReward(address);
    console.log(
      `${response.status} response from Get total burnchain rewards for the given recipient API`
    );
  } catch (e) {
    console.log(
      "Error from Get total burnchain rewards for the given recipient API: ",
      e
    );
  }
}

async function triggerTransactionTests(options: any) {
  let txId = "",
    blockHash = "",
    height = "",
    address = "";
  try {
    // Get recent transactions
    const response = await getRecentTXs();
    txId = response.data.results[0]?.tx_id;
    blockHash = response.data.results[0]?.block_hash;
    height = response.data.results[0]?.block_height;
    address = response.data.results[0]?.sender_address;
    console.log(`${response.status} response from Get recent transactions API`);
  } catch (e) {
    console.log("Error from Get recent transactions API: ", e);
  }

  try {
    // Get mempool transactions
    const response = await getMempoolTXs();
    console.log(
      `${response.status} response from Get mempool transactions API`
    );
  } catch (e) {
    console.log("Error from Get mempool transactions API: ", e);
  }

  try {
    // Get dropped mempool transactions
    const response = await getDroppedMempoolTXs();
    console.log(
      `${response.status} response from Get dropped mempool transactions API`
    );
  } catch (e) {
    console.log("Error from Get dropped mempool transactions API: ", e);
  }

  try {
    // Get statistics for mempool transactions
    const response = await getStatsMempoolTXs();
    console.log(
      `${response.status} response from Get statistics for mempool transactions API`
    );
  } catch (e) {
    console.log("Error from Get statistics for mempool transactions API: ", e);
  }

  try {
    // Get list of details for transactions
    const response = await getTXDetailList(txId);
    console.log(
      `${response.status} response from Get list of details for transactions API`
    );
  } catch (e) {
    console.log("Error from Get list of details for transactions API: ", e);
  }

  try {
    // Get transactions
    const response = await getTX(txId);
    console.log(`${response.status} response from Get transaction API`);
  } catch (e) {
    console.log("Error from Get transaction API: ", e);
  }

  try {
    // Get Raw transactions
    const response = await getTXRaw(txId);
    console.log(`${response.status} response from Get Raw transaction API`);
  } catch (e) {
    console.log("Error from Get Raw transaction API: ", e);
  }

  // TODO API for Broadcast raw transaction

  try {
    // Get transactions by block hash
    const response = await getTXByBlockHash(blockHash);
    console.log(
      `${response.status} response from Get transaction by block hash API`
    );
  } catch (e) {
    console.log("Error from Get transaction by block hash API: ", e);
  }

  try {
    // Get transactions by block height
    const response = await getTXByBlockHeight(height);
    console.log(
      `${response.status} response from Get transaction by block height API`
    );
  } catch (e) {
    console.log("Error from Get transaction by block height API: ", e);
  }

  try {
    // Get transactions for address
    const response = await getTXForAddress(address);
    console.log(
      `${response.status} response from Get transaction for address API`
    );
  } catch (e) {
    console.log("Error from Get transaction for address address API: ", e);
  }

  try {
    // Get transaction events
    const response = await getTXEvents(txId);
    console.log(`${response.status} response from Get transaction events API`);
  } catch (e) {
    console.log("Error from Get transaction events API: ", e);
  }
}
