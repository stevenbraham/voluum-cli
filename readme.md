# Voluum CLI client
*Voluum is a trademark owned by Codewise from Poland.*

Small CLI tool I made to be able to quickly check my Voluum Affiliate stats in my command line.

Currently it is only possible to retrieve daily stats. 

The app itself is build using Typescript, so you need to either compile the main index.ts file to normal Javascript or use [https://www.npmjs.com/package/ts-node](https://www.npmjs.com/package/ts-node).

In other to authenticate the CLI App with your Voluum account, you need to create a access key. Instructions can be found this page: [https://doc.voluum.com/en/voluum_api_docs.html](https://doc.voluum.com/en/voluum_api_docs.html). Afterwards copy the sample config.yaml from the resources folder and fill in the details.