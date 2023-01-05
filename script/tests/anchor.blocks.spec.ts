import * as util from "util";
import * as child_process from "child_process";
const exec = util.promisify(child_process.exec);
let interval,
  triggerCount = 0,
  foundMicroBlock = false;

import { getAccountDetail, getMicroBlock, getAnchorBlock } from "../utils/curl";
import { wait } from "../utils/helper";

const runAnchorBlockTest = async (options: any) => {
  triggerCount++;
  console.log(`Trigger script count: ${triggerCount}`);

  const { accountId, recipient } = options;
  try {
    // step 1: Fetch nonce from account id
    console.log("Fetching Nonce...");
    const nonce = await fetchNonce(accountId);
    console.log("Nonce fetched", nonce);

    // step 2: Run the stx command for send_tokens to fetch the TXID
    console.log("Sending tokens and fetching TXID...");
    const txid = await sendTokens(nonce, recipient);
    console.log("TXID fetched", txid);

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
      process.exit(0);
    } else {
      console.log(`The transaction ${txid} is not present in Anchor block API`);
    }
    if (triggerCount === 5) {
      console.log("Time limit reached: 30 minutes");
      clearInterval(interval);
      process.exit(0);
    }
  } catch (e) {
    console.error(
      "An error occurred while processing the anchor block script",
      e
    );
    clearInterval(interval);
    process.exit(1);
  }
};

export function triggerAnchorBlockTests(options: any) {
  runAnchorBlockTest(options);

  interval = setInterval(() => {
    runAnchorBlockTest(options);
  }, 6 * 60 * 1000); // every 6 minutes
}

async function fetchNonce(accountId: string): Promise<number> {
  const accountDetail = await getAccountDetail(accountId);
  if (!accountDetail) {
    console.log(`No account detail found for account id - ${accountId}`);
    return 0;
  }
  return accountDetail.nonce;
}

async function sendTokens(nonce: number, recipient: string): Promise<any> {
  const { stdout, stderr } = await exec(
    `stx -t send_tokens ${recipient} 12345 999 ${nonce} fd3609e8b9352facf360c950d362afe8f0f108b9041750f54b017efc479efeb001`
  );
  if (stderr) {
    console.error(
      `An error occurred while sending the tokens to recipient ${recipient}`
    );
    return;
  }
  const filteredResponse = stdout.replace(/(\r\n|\n|\r|\s)/gm, "");
  return filteredResponse.split(",")[0].split(":")[1].replace(/\'/g, "");
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
  const anchorBlockData = await getAnchorBlock();
  if (!anchorBlockData) {
    console.log(`No anchor block data found`);
    return false;
  }
  const isTXIDExist = anchorBlockData.results.some(
    (result) => result.tx_id === txid
  );
  return isTXIDExist;
}
