pragma solidity ^0.4.24; 


library EthMessageLib { 
     //
    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        bytes32 message;
    }
    
    event Paid(uint amount, address receiver); 

    function getMessage(bytes32 _uid, address _owner, address _reader) public returns (bool) {
        require(_owner == _reader, "Permission denied");
        return true; 
    }
    
    function transferETH(address _receiver, uint _amount) public{
        _receiver.transfer(_amount);
    }
    
} 
