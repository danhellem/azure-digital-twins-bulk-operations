const { DefaultAzureCredential } = require("@azure/identity");
const { DigitalTwinsClient } = require("@azure/digital-twins-core");


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
  const serviceClient = new DigitalTwinsClient(_url, credential); 
    
  const models = await serviceClient.listModels();

  for await (const model of models) {
    console.log(`Model ID: ${model.id}`);
  }

  return;
}

main()
  .then(() => console.log("\x1b[0m", ""))
  .catch((ex) => console.log("\x1b[31m", ex.message, "\x1b[0m"));
