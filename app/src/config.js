const SANDBOX_ID = '9caea2af8a';
export const BLOCKCHAIN_URL = 'https://stijnkoopal.by.ether.camp:8555/sandbox/' + SANDBOX_ID;
export const SANDBOX_CONTRACT_ADDRESS = '0x17956ba5f4291844bc25aedb27e69bc11b5bda39';
export const ROPSTEN_CONTRACT_ADDRESS = '0x40BFecDACe8975f49d7179c961069a21C1326fcC';

export const CONTRACT_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "ticketPrice",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "endLottery",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "winnerNumber",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tickets",
    "outputs": [
      {
        "name": "participant",
        "type": "address"
      },
      {
        "name": "ticketNumber",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "buyIn",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "refund",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "endDateClose",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "random",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "lotteryState",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "lotteryTitle",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "endDateStart",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_lotteryTitle",
        "type": "bytes32"
      },
      {
        "name": "_endDateStart",
        "type": "uint256"
      },
      {
        "name": "_endDateClose",
        "type": "uint256"
      },
      {
        "name": "_ticketPrice",
        "type": "uint256"
      },
      {
        "name": "_ticketMax",
        "type": "uint256"
      },
      {
        "name": "_testFlag",
        "type": "bool"
      }
    ],
    "name": "startLottery",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "winnerAddress",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "BuyIn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "LotteryStart",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "LotteryEnd",
    "type": "event"
  }
];