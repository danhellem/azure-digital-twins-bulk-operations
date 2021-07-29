const { DefaultAzureCredential } = require("@azure/identity");
const fetch = require("node-fetch");

require("dotenv").config();

const _url = process.env.AZURE_DIGITAL_TWINS_URL;
const _adtContext = 'https://digitaltwins.azure.net/.default';
const _apiVersion = '2020-10-31';

async function main() {
  if (_url == undefined) {
    console.log("\x1b[31m","Azure Digital Twins URL is not yet defined as an env variable.","\x1b[0m");
    return;
  } 
  
  const credential = new DefaultAzureCredential();  
  var token = null;   

  console.log("Getting token: attempt");
  
  token = await tokenRefresh(token, credential, _adtContext);
  
  if (token != null) console.log("Getting token: success");       

  return;
}

async function tokenRefresh(token, credential, context) {
  let tmpTrToken = token;
  
  if (!tmpTrToken || tmpTrToken.expiresOnTimestamp < Date.now()) {
    tmpTrToken = await credential.getToken(context);
  }

  return tmpTrToken;
}

main()
  .then(() => console.log("\x1b[0m", ""))
  .catch((ex) => console.log("\x1b[31m", ex.message, "\x1b[0m"));
