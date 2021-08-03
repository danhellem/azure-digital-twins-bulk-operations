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
  
  const jobName = process.argv.slice(2);

  if (jobName.length === 0) {
    console.log("\x1b[31m","Job name argument must be passed into command ","\x1b[0m");
    return;
  }

  const credential = new DefaultAzureCredential();  
  var token = null;   
    
  token = await tokenRefresh(token, credential, _adtContext);  
  if (token == null) {
     console.log("\x1b[31m", "Getting token: failed", "\x1b[0m");   
  }

  console.log(" ");
  statusCheck(token.token, jobName).then(async (results) => {
    console.log('\x1b[32m',`Status: ${results.status}`, "\x1b[0m");    
  });

  console.log(" ");

  return;
}

async function tokenRefresh(token, credential, context) {
  let tmpTrToken = token;
  
  if (!tmpTrToken || tmpTrToken.expiresOnTimestamp < Date.now()) {
    tmpTrToken = await credential.getToken(context);
  }

  return tmpTrToken;
}

async function statusCheck(token, name) {
  try {
    const response = await fetch(
      `${_url}/jobs/import/${name}?api-version=2021-06-30-preview`,
      {
        method: "get",
        headers: { "Authorization": `Bearer ${token}` },         
      }
    );   
    
    const results = await Promise.resolve(response);     

    return await results.json();
  } catch (error) {
    return await Promise.reject(error);
  }
}

main()
  .then(() => console.log("\x1b[0m", ""))
  .catch((ex) => console.log("\x1b[31m", ex.message, "\x1b[0m"));
