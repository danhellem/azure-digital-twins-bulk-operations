const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");

require("dotenv").config();

async function main() {  
  const _connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const _containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
  const _filePath = "./dist/import.ndjson";
  
  console.log("Checking Azure Storage values...");

  if (_connectionString === null || _connectionString === undefined || _connectionString === "")
  {
    console.log("\x1b[31m","Azure storage connection string is not set.","\x1b[0m");
    console.log("");
    return;
  }

  if (_containerName === null || _containerName === undefined || _containerName === "")
  {
    console.log("\x1b[31m","Azure storage container name is not set.","\x1b[0m");
    console.log("");
    return;
  }

  if (_filePath === null || _filePath === undefined || _filePath === "")
  {    
    console.log("\x1b[31m","File path is not defined.","\x1b[0m"); 
    console.log("");  
    return;
  } 
  
  console.log("Uploading 'import.ndjson' file into Azure Container...");
  console.log(" ");
  
  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    _connectionString
  );

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(
    _containerName
  );

  // Create blob name
  const blobName = "import" + uuidv1() + ".ndjson";
  const blobUrl = blobServiceClient.url + _containerName + '/' + blobName;

  // Get blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload file from disk
  console.log('\x1b[32m',"# Uploading file '" + blobName + "'");
  const uploadFileResponse = await blockBlobClient.uploadFile(_filePath);
  console.log("\x1b[32m","# Upload complete", "\x1b[0m");
  console.log("");
  console.log("\x1b[33m","  " + blobUrl, "\x1b[0m");

  console.log("");
  console.log("Done");
}

main()
  .then(() => console.log('\x1b[0m', ""))
  .catch((ex) => console.log("\x1b[31m", ex.message, "\x1b[0m"));
