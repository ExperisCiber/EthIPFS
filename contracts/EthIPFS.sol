pragma solidity ^ 0.4.0;

contract EthIPFS {
    string storedHash;
    address public owner;
    
    // Royalty receiver variables
    address public storedReceiver1;
    uint public storedPercentage1;
    address public storedReceiver2;
    uint public storedPercentage2;
    uint public storedContentPrice;
    
    // Events
    event setData();
    event contentBought(string storedHash);
    
    
    function EthIPFS() {
        owner = msg.sender;
    }

    function set(string hash, address receiver1, uint percentage1, address receiver2, uint percentage2, uint contentPrice) {
        if (owner == msg.sender) {
            
            // Store variables
            storedHash = hash;
            storedReceiver1 = receiver1;
            storedReceiver2 = receiver2;
            storedPercentage1 = percentage1;
            storedPercentage2 = percentage2;
            storedContentPrice = contentPrice;
            
            // SET event
            setData();
        }
    }

    function get() payable {
        
        if (msg.value == storedContentPrice) {
            
           // Payout royalties
            var receiver1Balance = (this.balance * (storedPercentage1) / 100);
            var receiver2Balance = (this.balance * (storedPercentage2) / 100);
            if (!storedReceiver1.send(receiver1Balance)){
                throw;
            }
            if (!storedReceiver2.send(receiver2Balance)){
                throw;
            }
            if (!owner.send(this.balance)){
                throw;
            }
            
            // CONTENTBOUGHT event
            contentBought(storedHash);
            
            } else {
                throw;
            }
        }

}