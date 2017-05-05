const SANDBOX_ID = 'eee1d011e7';
export const BLOCKCHAIN_URL = 'https://mhulshof.by.ether.camp:8555/sandbox/' + SANDBOX_ID;
export const SANDBOX_CONTRACT_ADDRESS = '';
export const ROPSTEN_CONTRACT_ADDRESS = '';

export const CONTRACT_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "storedData",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "name": "x",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  }
];