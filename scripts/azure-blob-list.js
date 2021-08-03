const { BlobServiceClient } = require("@azure/storage-blob");

require("dotenv").config();

async function main() {  
  const _connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const _containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    
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
  
  console.log("Getting list of blob files...");
  console.log(" ");
  
  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    _connectionString
  );

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(
    _containerName
  );  

  // Get list of blobs in container
  for await(const blob of containerClient.listBlobsFlat()) {
     console.log("\x1b[33m", blobServiceClient.url + _containerName + '/' + blob.name, "\x1b[0m");
  }  

  console.log("");
  console.log("Done");
}

main()
  .then(() => console.log('\x1b[0m', ""))
  .catch((ex) => console.log("\x1b[31m", ex.message, "\x1b[0m"));
