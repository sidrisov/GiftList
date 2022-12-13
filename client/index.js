const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // read passed user arg, e.g. node client/index 'Norman Block' 
  const myArgs = process.argv.slice(2);
  const user = myArgs[0];

  if (!user) {
    console.log("User argument was not passed!");
    return;
  }

  const index = niceList.findIndex(n => n === user);
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: user,
    proof: proof
  });

  console.log({ gift });
}

main();