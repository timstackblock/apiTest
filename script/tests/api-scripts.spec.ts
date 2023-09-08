import * as util from "util";
import * as path from "path";
import * as child_process from "child_process";
const exec = util.promisify(child_process.exec);
// these variables are for anchor block
let interval,
  triggerCount = 0,
  foundMicroBlock = false,
  txid = "";
// these variables are for deploy test contract
let interval2,
  triggerCount2 = 0,
  foundMicroBlock2 = false,
  contractName = "",
  transactionId2 = "";

import { getAccountDetail, getMicroBlock, getAnchorBlock } from "../utils/curl";
import { wait } from "../utils/helper";
import { AxiosError } from "axios";

const runAnchorBlockTest = async (options: any) => {
  triggerCount++;
  console.log(`Trigger script count: ${triggerCount}`);

  const { accountAddress, recipient } = options;
  try {
    if (!txid) {
      // step 1: Fetch nonce from account id
      console.log("Fetching Nonce...");
      const nonce = await fetchNonce(accountAddress);
      console.log("Nonce fetched", nonce);

      // step 2: Run the stx command for send_tokens to fetch the TXID
      console.log("Sending tokens and fetching TXID...");
      txid = await sendTokens(nonce, recipient);
      console.log("TXID fetched", txid);
    }
    if (txid) {
      // step 3: CURL the microblock API to make sure that TXID exist
      if (!foundMicroBlock) {
        await wait(10000);
        console.log("Calling microblock API...");
        const isTXIDExistMB = await checkTXIDInMicroBlock(txid);
        if (isTXIDExistMB) {
          foundMicroBlock = true;
          console.log(`The transaction ${txid} is present in Micro Block API`);
        } else {
          console.log(
            `The transaction ${txid} is not present in Micro Block API`
          );
        }
      }

      // step 4: CURL the Anchor block API to make sure that TXID exist
      console.log("Calling Anchor block API...");
      const isTXIDExistAB = await checkTXIDInAnchorBlock(txid);
      if (isTXIDExistAB) {
        console.log(`The transaction ${txid} is present in Anchor block API`);
        triggerCount = 5;
        return;
      } else {
        console.log(
          `The transaction ${txid} is not present in Anchor block API`
        );
      }
    }
  } catch (error) {
    const e = error as AxiosError
    console.error("An error occurred while processing the anchor block script",e.message);
    if(e.response?.data)
    {
      console.log("Response Message", e.response.data);
    }    
    
    clearInterval(interval);
  }
};

export async function triggerAnchorBlockTests(options: any) {
  console.log("RUNNING the tests for Anchor block...");
  await runAnchorBlockTest(options);

  await new Promise((resolve) => {
    const timeoutMinutes: any = process.env.timeout || 6;
    interval = setInterval(async () => {
      await runAnchorBlockTest(options);
      if (triggerCount === 5) {
        clearInterval(interval);
        console.log("COMPLETED running the tests for Anchor block...");
        return resolve(null);
      }
    }, timeoutMinutes * 60 * 1000); // every x minutes
  });
}

const runDeployContractTest = async (options: any) => {
  triggerCount2++;
  console.log(`Trigger script count: ${triggerCount2}`);
  const { accountAddress, payment } = options;
  try {
    if (!transactionId2) {
      // step 1: Fetch nonce from account id
      console.log("Fetching Nonce...");
      const nonce = await fetchNonce(accountAddress);
      console.log("Nonce fetched", nonce);

      // step 2: Run the stx command for deploy test contract
      console.log("Deploying test contract...");
      const filePath = path.resolve("contracts/testcontract.clar");
      // transactionId = '0xed227b7d1b3ceb4eb95dd6fc6febd33eefa7ace574d6a3affd8dc8572c616f31';
      contractName = `testcontract${Math.round(
        Math.random() * (999999 - 1) + 1
      )}`;
      transactionId2 = await deployTestContract(
        nonce,
        payment,
        filePath,
        contractName
      );
      console.log("TXID fetched", transactionId2);
    }
    if (transactionId2) {
      if (!foundMicroBlock2) {
        console.log("Calling microblock API...");
        const isTXIDExistMB = await checkTXIDInMicroBlock(transactionId2);
        if (isTXIDExistMB) {
          foundMicroBlock2 = true;
          console.log(
            `The transaction ${transactionId2} is present in Micro Block API`
          );
        } else {
          console.log(
            `The transaction ${transactionId2} is not present in Micro Block API`
          );
        }
      }

      // step 4: CURL the Anchor block API to make sure that TXID exist
      console.log("Calling Anchor block API...");
      const isTXIDExistAB = await checkTXIDInAnchorBlock(transactionId2);
      if (isTXIDExistAB) {
        console.log(
          `The transaction ${transactionId2} is present in Anchor block API`
        );
        const counter = await getCounterValue(accountAddress, contractName);
        if (counter === "0") {
          console.log("Counter value is 0");
          triggerCount2 = 5;
          return;
        } else {
          console.log("Counter value is incorrect", counter);
        }
      } else {
        console.log(
          `The transaction ${transactionId2} is not present in Anchor block API`
        );
      }
    }
  } catch (e) {
    console.error(
      "An error occurred while processing the deploy test contract script",
      e
    );
  }
};

export async function triggerDeployTestContract(options: any) {
  console.log("RUNNING the tests for deploying test contract...");
  await runDeployContractTest(options);

  await new Promise((resolve) => {
    const timeoutMinutes: any = process.env.timeout || 6;
    interval2 = setInterval(async () => {
      await runDeployContractTest(options);
      if (triggerCount2 === 5) {
        clearInterval(interval2);
        console.log(
          "COMPLETED running the test for deploying test contract..."
        );
        return resolve(null);
      }
    }, timeoutMinutes * 60 * 1000); // every x minutes
  });
}

async function fetchNonce(accountAddress: string): Promise<number> {
  const accountDetail = await getAccountDetail(accountAddress);
  if (!accountDetail) {
    console.log(`No account detail found for account id - ${accountAddress}`);
    return 0;
  }
  return accountDetail.nonce;
}

async function sendTokens(nonce: number, recipient: string): Promise<any> {
  const { stdout, stderr } = await exec(
    `stx -t send_tokens ${recipient} 12345 999 ${nonce} ${process.env.private_key}`
  );
  if (stderr) {
    console.error(
      `An error occurred while sending the tokens to recipient ${recipient}`
    );

    return;
  }
  
  const filteredResponse = stdout.replace(/(\r\n|\n|\r|\s)/gm, "");
  const actualResponse = filteredResponse.split(",")[0].split(":")[1].replace(/\'/g, "")
  if(actualResponse === 'transactionrejected')
  {
    console.error("Error sending token: " + filteredResponse)
  }
  return actualResponse;
}

async function checkTXIDInMicroBlock(txid: string): Promise<boolean> {
  const microBlockData = await getMicroBlock();
  if (!microBlockData) {
    console.log(`No micro block data found`);
    return false;
  }
  const isTXIDExist = microBlockData.results.some(
    (result) => result.tx_id === txid
  );
  return isTXIDExist;
}

async function checkTXIDInAnchorBlock(txid: string): Promise<boolean> {
  const anchorBlockData = await getAnchorBlock(txid);
  if (!anchorBlockData) {
    console.log(`No anchor block data found`);
    return false;
  }
  // for anchor block tx we expect that the is_unanchored: false exist in that tx detail
  return (
    anchorBlockData.hasOwnProperty("is_unanchored") &&
    !anchorBlockData.is_unanchored
  );
}

async function deployTestContract(
  nonce: number,
  payment: string,
  filePath: string,
  contractName: string
): Promise<any> {
  const { stdout, stderr } = await exec(
    `stx deploy_contract -t ${filePath} ${contractName} 2001 ${nonce} ${payment}`
  );
  if (stderr) {
    console.error(
      `An error occurred while deploying the test contract ${filePath}`,
      stderr
    );
    return;
  }
  const response = stdout.replace(/(\r\n|\n|\r|\s)/gm, "");
  const txId = response.split(",")[0].split(":")[1].replace(/\'/g, "");
  if (txId === "transactionrejected") {
    console.log("Error on deploying test contract", response);
    return;
  }
  return txId;
}

async function getCounterValue(
  accountAddress: string,
  contractName: string
): Promise<any> {
  const { stdout, stderr } = await exec(
    `stx call_read_only_contract_func -t ${accountAddress} ${contractName} get-counter ${accountAddress}`
  );
  if (stderr) {
    console.error("An error occurred while reading the contract", stderr);
    return;
  }
  return stdout ? stdout.trim() : "";
}
