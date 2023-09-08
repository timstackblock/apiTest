import {
  triggerAnchorBlockTests,
  triggerDeployTestContract
} from "./tests/api-scripts.spec";
import {
  api404Test
} from "./tests/api-404-test.spec";

require('dotenv').config({ path: '.env' });

const anchorBlockOptions = {
  accountAddress: process.env.account_address,
  recipient: process.env.recipient,
};
const deployOptions = {
  payment: process.env.payment,
  accountAddress: process.env.account_address_2,
};
const api404TestOptions = {
  accountAddress: process.env.account_address,
  recipient: process.env.recipient,
};

const type = process.argv[2];
if(!type) {
  triggerAllTestScript();
}

async function triggerAllTestScript() {
  await api404Test(api404TestOptions);
  await triggerAnchorBlockTests(anchorBlockOptions);
  await triggerDeployTestContract(deployOptions);
}

// trigger anchor block testing script
if(type === 'triggerAnchorBlockTests') {
  triggerAnchorBlockTests(anchorBlockOptions);
}

// trigger deploy test contract script
if(type === 'triggerDeployTestContract') {
  triggerDeployTestContract(deployOptions);
}

// run 404 tests for APIs
if(type === 'api404Test') {
  api404Test(api404TestOptions);
}
