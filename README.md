# Azure Digital Twins Bulk Operations
This feature is currently in private preview

## Convert Azure Ditital Twin Modles to .ndjson format
This is a sample project that converts a set of single Azure Digital Twins model files and converts them into a single import.ndjson file. This file will be basis of the new bulk import functionality available soon in Azure Digital Twins.

import.ndjosn will be located in the ```/dist``` folder

### Setup

- clone the project
- run npm install
- install [gulp command line utility](https://gulpjs.com/docs/en/getting-started/quick-start/)
- run task ```gulp default```

### Gulp Tasks

```gulp clean```
<br>deletes all the files from the dist folder

```gulp create-staging```
<br>creates the staging.json file that is used as the central place to append the dtdl from individual model files into. 

```gulp add-header```
<br>prepends header.json file to the staging.json file

```gulp create-ndjson```
<br>converts the import.json into the import.ndjson file

## Import .ndjson file into Azure Blog Storage

### Scripts
```npm run blob-upload```
<br>uploads 'import.ndjson' file into a storage container

The following env variables needs to be set

```setx AZURE_STORAGE_CONNECTION_STRING "<your_connection_string>"```

```setx AZURE_STORAGE_CONTAINER_NAME "<your_storage_container_name>"```

Be sure to close and re-open your command window for changes to take affect.
