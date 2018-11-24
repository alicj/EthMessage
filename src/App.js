import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';

class App extends Component {

  constructor (props) {
    super(props)

    let url = "http://localhost:8545";
    let provider = new ethers.providers.JsonRpcProvider(url);

    let privateKey = "";
    let walletWithProvider = new ethers.Wallet(privateKey, provider);

    let abi =
    [
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

    let contractAddress = "";
    let contract = new ethers.Contract(contractAddress, abi, walletWithProvider);
    this.contract = contract;

    this.state = {
      message: '',
      input: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const message = await this.contract.message();
    this.setState((state) => {
      return {message: message};
    });
  }

  handleInputChange = (e) => {
    this.setState({input: e.target.value});
  }


  async handleClick() {
    await this.contract.setMessage(this.state.input);
    let message = await this.contract.message();

    this.setState((state) => {
      return {message: message};
    });

  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {this.state.message}
          </p>
          <input
          onChange={this.handleInputChange}
          type="text"
          name="name"
          value={this.state.input}/>
          <button onClick={this.handleClick}>
            Update Message
          </button>

        </header>
      </div>
    );
  }
}

export default App;
