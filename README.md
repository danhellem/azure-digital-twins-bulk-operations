# Convert Azure Ditital Twin Modles to .ndjson format
This is a sample project that converts a set of single Azure Digital Twins model files and converts them into a single import.ndjson file. This file will be basis of the new bulk import functionality available soon in Azure Digital Twins.

import.ndjosn will be located in the ```/dist``` folder

## Setup

- clone the project
- run npm install
- install [gulp command line utility](https://gulpjs.com/docs/en/getting-started/quick-start/)
- run task ```gulp default```



## Gulp Tasks

```gulp clean```
<br>deletes all the files from the dist folder

```gulp create-staging```
<br>creates the staging.json file that is used as the central place to append the dtdl from individual model files into. 

```gulp add-header```
<br>prepends header.json file to the staging.json file

```gulp create-ndjson```
<br>converts the import.json into the import.ndjson file

```gulp default```
<br>chainnig all tasks into a single gulp task
