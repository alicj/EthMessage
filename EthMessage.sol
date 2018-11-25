pragma solidity ^0.4.24; 

import "./EthMessageLib.sol";

contract EthMessage { 
    
    using EthMessageLib for EthMessageLib.Transaction;
    
    address sender;
    mapping (bytes32 => EthMessageLib.Transaction) public transactions ;

    constructor() public payable {
        sender = msg.sender;
    }
    
    function () public payable { 
    }
    
    event trans(bytes32 _uid, bytes32 _msg);


    function getMessage(bytes32 _uid, address _reader) public {
        require(EthMessageLib.getMessage(_uid, transactions[_uid].receiver, _reader), "Permission denied");
        emit trans(_uid, transactions[_uid].message); 
    }
    
    function transferETH(bytes32 _uid, address _receiver, uint _amount, bytes32 _msg) public{
        transactions[_uid] = EthMessageLib.Transaction(msg.sender, _receiver, _amount, _msg);
        // EthMessageLib.transferETH(_receiver, _amount); 
        // emit trans(_uid, _msg); 
    }
    
    // function debug() public returns (Transaction){
    //     require(msg.sender == sender);
    //     return transactions;
    // }

} 
