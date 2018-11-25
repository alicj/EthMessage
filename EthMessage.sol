pragma solidity ^0.4.24; 

import "./EthMessageLib.sol";

contract EthMessage { 
    
    using EthMessageLib for EthMessageLib.Transaction;
    
    address sender;
    mapping (bytes8=> EthMessageLib.Transaction) transactions;

    constructor() public payable {
        sender = msg.sender;
    }
    
    function () public payable { 
    }


    function getMessage(bytes8 _uid, address _owner, address _reader) public returns (bytes8) {
        require(EthMessageLib.getMessage(_uid, _owner, _reader), "Permission denied");
        return transactions[_uid].message; 
    }
    
    function transferETH(bytes8 _uid, address _receiver, uint _amount, bytes8 _msg) public{
        transactions[_uid] = EthMessageLib.Transaction(_receiver, _amount, _msg);
        // EthMessageLib.transferETH(_receiver, _amount); 
    }
    
    // function debug() public returns (Transaction){
    //     require(msg.sender == sender);
    //     return transactions;
    // }

} 
