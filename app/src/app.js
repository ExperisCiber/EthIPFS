import './index.html';
import {CONTRACT_ABI, BLOCKCHAIN_URL, SANDBOX_CONTRACT_ADDRESS, ROPSTEN_CONTRACT_ADDRESS} from './config.js';
/* global $*/

// Specific required libraries (should also be in package.json)
const Web3 = require('web3');
const ipfsApi = require('ipfs-api');
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
        //var ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort);
        var ipfs = ipfsApi('localhost', '5001');
        ipfs.swarm.peers(function(err, response) {
            if (err) {
                console.error(err);
            } else {
                console.log("IPFS - connected to " + response.length + " peers");
				var peersNo = response.length;
				$('#peers').html(response.length);
            }
        });

        var bytecode = '6060604052341561000c57fe5b5b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6107ba8061005f6000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633b28da0a1461008e5780634cdb99a2146100e05780636d4ce63c14610193578063825d8ba91461019d5780638da5cb5b146101c35780639c59fb4314610215578063f32e536c14610267578063fc25047f1461028d575bfe5b341561009657fe5b61009e6102b3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100e857fe5b610191600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919080359060200190919050506102d9565b005b61019b610416565b005b34156101a557fe5b6101ad61068b565b6040518082815260200191505060405180910390f35b34156101cb57fe5b6101d3610691565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561021d57fe5b6102256106b7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561026f57fe5b6102776106dd565b6040518082815260200191505060405180910390f35b341561029557fe5b61029d6106e3565b6040518082815260200191505060405180910390f35b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561040d5785600090805190602001906103459291906106e9565b5084600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360038190555081600581905550806006819055507ff31604c761e47e19ea55fe52f6e19e70b011a5d995db85d1c0ab31f49a3b0c7a60405180905060405180910390a15b5b505050505050565b600060006006543414156106805760646003543073ffffffffffffffffffffffffffffffffffffffff16310281151561044b57fe5b04915060646005543073ffffffffffffffffffffffffffffffffffffffff16310281151561047557fe5b049050600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051809050600060405180830381858888f1935050505015156104de5760006000fd5b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f1935050505015156105445760006000fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051809050600060405180830381858888f1935050505015156105c15760006000fd5b7f903fccb8aecf8f5262c9538b61b01cb35c1d6322e5d8861fa8ba4cf05e74a6d86000604051808060200182810382528381815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561066d5780601f106106425761010080835404028352916020019161066d565b820191906000526020600020905b81548152906001019060200180831161065057829003601f168201915b50509250505060405180910390a1610686565b60006000fd5b5b5050565b60065481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60035481565b60055481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061072a57805160ff1916838001178555610758565b82800160010185558215610758579182015b8281111561075757825182559160200191906001019061073c565b5b5090506107659190610769565b5090565b61078b91905b8082111561078757600081600090555060010161076f565b5090565b905600a165627a7a723058205e3d2e8844e80f685beb020a1b46e812aa14bfad047378aaf6318610d0843d1a0029';
        var deployContractObject = {
            from: window.web3.eth.defaultAccount,
            gas: 4476768,
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
					$('#contract').html(window.contractAddress);
					
					contract.contentBought().watch( (err, response) => {
						console.log(response.args.storedHash);
						$('#ipfs-hash').html(response.args.storedHash);
						var imageURL = window.ipfsDataHost + "/" + response.args.storedHash;
						$('#ipfs-link').html(imageURL);
					});
					
					
                } else if (contract.transactionHash) {
                    console.log("Waiting for contract to be deployed... Contract's transaction hash: ", contract.transactionHash);  
                } else {
                    console.error('Unknown error deploying contract');
                }
            });
        }
        function sendTransaction(hash, receiver1, percentage1, receiver2, percentage2, contentPrice) {
            if (!window.contractInstance) {
                console.error('Make sure you deploy your contract first');
                return;
            }
            if (window.currentData == hash) {
                console.error("Why would you override your contract's data with the same data, you dummy?");
                return;
            }
			
			window.contractInstance.set.sendTransaction(hash, receiver1, percentage1, receiver2, percentage2, web3.toWei(contentPrice, 'ether'), window.sendDataObject, function(err, result){
                if (err) {
                    console.error('Error sending data: ', err);
                } else {
                    window.currentData = hash;
                    console.log('Successfully sent data. Transaction hash: ', result);
					$('#transaction').html(result);
                }
            });
        }
        function getData() {
            if (!window.contractInstance) {
                console.error('Make sure you deploy your contract first');
                return;
            }
            window.contractInstance.storedReceiver1.call(function(err, result){
                if (err) {
                    console.error('Error getting data: ', err);
                } else if (result) {
					$('#contractReceiver1').html(result);
                }
            });
			window.contractInstance.storedReceiver2.call(function(err, result){
                if (err) {
                    console.error('Error getting data: ', err);
                } else if (result) {
					$('#contractReceiver2').html(result);
                }
            });
			window.contractInstance.storedPercentage1.call(function(err, result){
                if (err) {
                    console.error('Error getting data: ', err);
                } else if (result) {
					$('#contractPercentage1').html(result.toNumber());
                }
            });
			window.contractInstance.storedPercentage2.call(function(err, result){
                if (err) {
                    console.error('Error getting data: ', err);
                } else if (result) {
					$('#contractPercentage2').html(result.toNumber());
                }
            });
			window.contractInstance.storedContentPrice.call(function(err, result){
                if (err) {
                    console.error('Error getting data: ', err);
                } else if (result) {
					$('#contractContentPrice').html(result.toNumber());
                }
            });
			
        }
		
        function addFile(url) {
            window.ipfs.add(new Buffer(url), function(err, result) {
                if (err) {
                    console.error('Error sending file: ', err);
                    return null;
                } else if (result && result[0] && result[0].hash) {
                    var imageURL = window.ipfsDataHost + "/" + result[0].hash;
                    console.log('File: ', result[0].hash);
                    console.log(imageURL);
					
					//sendTransaction(result[0].hash);
					$('#hash').html(result[0].hash);
					
					
                } else {
                    console.error('No file for you...');
                    return null;
                }
            });
        }
		function setData() {
			
			var hash = document.getElementById("hash").innerHTML;
			var receiver1 = document.getElementById("receiver1").value;
			var receiver2 = document.getElementById("receiver2").value;
			var percentage1 = parseInt(document.getElementById("percentage1").value);
			var percentage2 = parseInt(document.getElementById("percentage2").value);
			var contentPrice = parseInt(document.getElementById("contentPrice").value);
			
			sendTransaction(hash, receiver1, percentage1, receiver2, percentage2, contentPrice);
		}
		
		function getContent() {
			var varValue = parseInt(document.getElementById("contentPrice").value);
			varValue = web3.toWei(varValue, 'ether');
			window.contractInstance.get({value: varValue}, function(err, result){
                if (err) {
                    console.error('Error sending data: ', err);
                } else {
                    console.log('Successfully sent data. Transaction hash: ', result);
					$('#content-transaction').html(result);
/* 					var imageURL = window.ipfsDataHost + "/" + result;
					$('#ipfs-link').html(imageURL); */
                }
            });
		
		}
        
  /**
 * Utility method that takes at least one parameter: a function `x`.
 * The last argument of function `x` should be a callback in the form (error, result)
 * Every next argument you give `promise` will be given as argument to function `x`
 */
const promise = (fn, ...args) => {
  return new Promise((resolve, reject) => 
    fn.apply(this, args.concat([(err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }]))
  );
};

/**
 * Utility method to watch events on a contract
 */ 
const watchContractEvent = (event, fn) => {
  event().watch((error, result) => fn());
};

/**
 * Listen to events on the lottery contract
 */ 
const watchContractEvents = contract => {
  watchContractEvent(contract.contentBought, () => contentBought(contract));
};

const watchButtonClick = (selector, fn) => {
  $(selector).click(e => {
    e.stopPropagation();
    fn.apply(this, e);
    return false;
  });
};
        
const setNetwork = () => {
  const mapping = {1: 'Main', 2: 'Deprecated Morden', 3: 'Ropsten', 42: 'Kovan'};
  
  promise(window.web3.version.getNetwork)
    .then(netId => mapping[netId] || netId)
    .then(network => $('#network').html(network));
};
const setAccount = () => {
  
	$('#account').html(window.web3.eth.defaultAccount);
	window.web3.eth.getBalance(window.web3.eth.defaultAccount, function(err, balance){
		console.log(parseFloat(window.web3.fromWei(balance, 'ether')));
		$('#balance').html(parseFloat(window.web3.fromWei(balance, 'ether')));
    });
   
};

function contentBought(contract) {
	console.log(contract);
}

function handleDeploy() {
	deployContract();
}

function handleReadContract() {
    getData();
}

function handleSetData() {
	setData();
}
function handleGetContent() {
	getContent();
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // use the 1st file from the list
    var f = files[0];

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {

          jQuery( '#ms_word_filtered_html' ).val( e.target.result );
		  addFile(e.target.result);
        };
      })(f);

      // Read in the image file as a data URL.
      //reader.readAsDataURL(f);
	  
	  // Read in the file as text
	  reader.readAsText(f);
	  
  }

$(() => {
    const contract = window.web3.eth.contract(CONTRACT_ABI).at(CONTRACT_ADDRESS);
        setNetwork();
		setAccount();
		
		document.getElementById('get-file').addEventListener('change', handleFileSelect, false)
		document.getElementById('deploy-contract').addEventListener('click', handleDeploy, false)
		document.getElementById('set-data').addEventListener('click', handleSetData, false)
		document.getElementById('read-contract').addEventListener('click', handleReadContract, false)
		document.getElementById('get-content').addEventListener('click', handleGetContent, false)
		
});