import './index.html';
import {CONTRACT_ABI, BLOCKCHAIN_URL, SANDBOX_CONTRACT_ADDRESS, ROPSTEN_CONTRACT_ADDRESS} from './config.js';

/* global $*/

// Specific required libraries (should also be in package.json)
const Web3 = require('web3');
const moment = require('moment');
const toastr = require('toastr');
const DATE_FORMAT = 'DD-MM-YYYY HH:mm';
const USE_SANDBOX = false;

let CONTRACT_ADDRESS;

if (!USE_SANDBOX && typeof web3 !== 'undefined') { // Injection by Metamask/Mist
  window.web3 = new Web3(web3.currentProvider);
  window.web3.eth.defaultAccount = web3.eth.accounts[0];
  CONTRACT_ADDRESS=ROPSTEN_CONTRACT_ADDRESS;
  console.log('Using metamask');
} else {
  window.web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_URL));
  window.web3.eth.defaultAccount = '0xdedb49385ad5b94a16f236a6890cf9e0b1e30392';
  CONTRACT_ADDRESS=SANDBOX_CONTRACT_ADDRESS;
  console.log('Using sandbox');
}
        var ipfsHost    = 'localhost',
            ipfsAPIPort = '5001',
            ipfsWebPort = '8080',
            web3Host    = 'http://xepa.local',
            web3Port    = '8545';
        // IPFS
        var ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort)
        ipfs.swarm.peers(function(err, response) {
            if (err) {
                console.error(err);
            } else {
                console.log("IPFS - connected to " + response.Strings.length + " peers");
                console.log(response);
            }
        });

        var bytecode = '6060604052610282806100126000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480634ed3885e146100445780636d4ce63c1461009a57610042565b005b6100986004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610115565b005b6100a760048050506101c6565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b8060006000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061016457805160ff1916838001178555610195565b82800160010185558215610195579182015b82811115610194578251826000505591602001919060010190610176565b5b5090506101c091906101a2565b808211156101bc57600081815060009055506001016101a2565b5090565b50505b50565b602060405190810160405280600081526020015060006000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102735780601f1061024857610100808354040283529160200191610273565b820191906000526020600020905b81548152906001019060200180831161025657829003601f168201915b5050505050905061027f565b9056';
        var deployContractObject = {
            from: window.web3.eth.defaultAccount,
            gas: 300000,
            data: bytecode
        };
        var sendDataObject = {
            from: window.web3.eth.defaultAccount,
            gas: 300000,
        };
        var NotSoSimpleStorageContractObject = window.web3.eth.contract(CONTRACT_ABI);
        // Globals... who cares...
        window.ipfs = ipfs;
        window.deployContractObject = deployContractObject;
        window.NotSoSimpleStorageContractObject = NotSoSimpleStorageContractObject;
        window.ipfsDataHost = "http://" + ipfsHost + ':' + ipfsWebPort + "/ipfs";
        // Functions
        function getBalance() {
            window.web3.eth.getBalance(window.web3.eth.defaultAccount, function(err, balance){
                console.log(parseFloat(window.web3.fromWei(balance, 'ether')));
            });
        }
        function deployContract() {
            window.currentIPFSHash = null;
            window.currentData = null;
            if (window.contractInstance) {
                console.error('Contract already deployed. Identifier: ', window.contractAddress);
                return false;
            }
            window.NotSoSimpleStorageContractObject.new(window.deployContractObject, function(err, contract) {
                if (err) {
                    console.error('Error deploying contract: ', err);
                } else if (contract.address) {
                    var contractAddress = contract.address;
                    window.contractAddress = contractAddress;
                    window.contractInstance = window.NotSoSimpleStorageContractObject.at(contractAddress);
                    console.log('Contract deployed at address ', contractAddress);
                } else if (contract.transactionHash) {
                    console.log("Waiting for contract to be deployed... Contract's transaction hash: ", contract.transactionHash);  
                } else {
                    console.error('Unknown error deploying contract');
                }
            });
        }
        function sendTransaction(data) {
            if (!window.contractInstance) {
                console.error('Make sure you deploy your contract first');
                return;
            }
            if (window.currentData == data) {
                console.error("Why would you override your contract's data with the same data, you dummy?");
                return;
            }
            window.contractInstance.set.sendTransaction(data, window.sendDataObject, function(err, result){
                if (err) {
                    console.error('Error sending data: ', err);
                } else {
                    window.currentData = data;
                    console.log('Successfully sent data. Transaction hash: ', result);
                }
            });
        }
        function getData() {
            if (!window.contractInstance) {
                console.error('Make sure you deploy your contract first');
                return;
            }
            window.contractInstance.get.call(function(err, result){
                if (err) {
                    console.error('Error getting data: ', err);
                } else if (result) {
                    if (window.currentIPFSHash == result) {
                        console.log("New data hasn't been mined yet. This is your current data: ", result);
                        return;
                    }
                    window.currentIPFSHash = result
                    var imageURL = window.ipfsDataHost + "/" + result;
                    console.log('File: ', result);
                    console.log(imageURL);
                } else {
                    console.error('No data. Transaction not mined yet?');
                }
            });
        }
        function addFile(url) {
            window.ipfs.add(url, function(err, result) {
                if (err) {
                    console.error('Error sending file: ', err);
                    return null;
                } else if (result && result[0] && result[0].Hash) {
                    var imageURL = window.ipfsDataHost + "/" + result[0].Hash;
                    console.log('File: ', result[0].Hash);
                    console.log(imageURL);
                } else {
                    console.error('No file for you...');
                    return null;
                }
            });
        }