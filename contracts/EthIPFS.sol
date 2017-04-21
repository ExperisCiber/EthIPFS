pragma solidity ^ 0.4.0;

contract ciberLottery {

    event BuyIn();
    event LotteryStart();
    event LotteryEnd();

    address owner;
    bool public lotteryState;
    
    struct Ticket {
        address participant;
        uint ticketNumber;
    }
    mapping(uint => Ticket) public tickets;
    uint ticketCounter;
    bytes32 public lotteryTitle;
    uint public endDateStart; // expected format: unix timestamp
    uint public endDateClose; // expected format: unix timestamp
    uint public ticketPrice; // expected format: whole numbers in ether
    uint ticketMax; // expected format: whole numbers
    bool testFlag;
    bytes32 check;
    uint public random;
    address public winnerAddress;
    uint public winnerNumber;
    uint price;

    uint random5;

    function ciberLottery() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            throw;
        }
        _;
    }
    
    modifier lotteryStarted(bool started) {
        if (lotteryState != started) {
            throw;
        }
        _;
    }
    
    modifier isClosing() {
        if ((now <= endDateStart || now >= endDateClose) && !testFlag) {
            throw;
        }
        _;
    }
    
    modifier notClosed() {
        if (now >= endDateStart && !testFlag) {
            throw;
        }
        _;
    }
    
    modifier isClosed() {
        if (now < endDateClose && !testFlag) {
            throw;
        }
        _;
    }
    
    function startLottery(bytes32 _lotteryTitle, uint _endDateStart, uint _endDateClose, uint _ticketPrice, uint _ticketMax, bool _testFlag) onlyOwner lotteryStarted(false) {
        lotteryState = true;
        lotteryTitle = _lotteryTitle;
        endDateStart = _endDateStart;
        endDateClose = _endDateClose;
        ticketPrice = _ticketPrice;
        ticketMax = _ticketMax;
        testFlag = _testFlag;
        
        LotteryStart();
    }

    function endLottery() onlyOwner lotteryStarted(true) isClosing {
        random = ((now * now * now) % 10 ** 1);
        winnerAddress = tickets[random].participant;
        winnerNumber = random;
        price = this.balance;
        if (!tickets[random].participant.send(this.balance)){
            throw;
        }
        

        // Stop lottery
        lotteryState = false;
        lotteryTitle = '';
        endDateStart = 0;
        endDateClose = 0;
        ticketPrice = 0;
        ticketMax = 0;
        ticketCounter = 0;
        
        LotteryEnd();
    }

    function buyIn() payable lotteryStarted(true) notClosed returns(uint) {

       if (msg.value == ticketPrice) {
           ticketCounter++;
           if (ticketCounter <= ticketMax) {
                tickets[ticketCounter] = Ticket({
                    participant: msg.sender,
                    ticketNumber: ticketCounter
                });
           
                BuyIn();
                return ticketCounter;
            } 
            else {
               ticketCounter = ticketCounter - 1;
            }
        }
        throw;
    }

    function refund() payable lotteryStarted(true) isClosed {
        for (uint i = 0; i <= ticketCounter; i++) {
           if (tickets[i].participant == msg.sender) {
               if (!tickets[i].participant.send(ticketPrice)){
                   throw;
               }
               delete tickets[i];
           }
       }
    }
}