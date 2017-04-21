pragma solidity ^ 0.4.0;

contract EthIPFS {
    string public storedData;

    function set(string x) {
        storedData = x;
    }

    function get() constant returns (string x) {
        return storedData;
    }

}