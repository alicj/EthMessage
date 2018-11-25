module.exports = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_uid",
        "type": "bytes32"
      },
      {
        "name": "_reader",
        "type": "address"
      }
    ],
    "name": "getMessage",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_uid",
        "type": "bytes32"
      },
      {
        "name": "_receiver",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_msg",
        "type": "bytes32"
      }
    ],
    "name": "transferETH",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_uid",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "_msg",
        "type": "bytes32"
      }
    ],
    "name": "trans",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "transactions",
    "outputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "message",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
