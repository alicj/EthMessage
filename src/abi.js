module.exports = [
              {
                "constant": false,
                "inputs": [],
                "name": "getMessage",
                "outputs": [
                  {
                    "name": "",
                    "type": "string"
                  }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": false,
                    "name": "newMessage",
                    "type": "string"
                  }
                ],
                "name": "MessageChanged",
                "type": "event"
              },
              {
                "constant": false,
                "inputs": [
                  {
                    "name": "newMsg",
                    "type": "string"
                  }
                ],
                "name": "setMessage",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "constant": true,
                "inputs": [],
                "name": "message",
                "outputs": [
                  {
                    "name": "",
                    "type": "string"
                  }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
              }
]
