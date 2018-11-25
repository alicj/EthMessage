import React, { Component } from 'react';
import './App.css';
import { ethers } from 'ethers';
import abi from './abi.js';

class App extends Component {

  constructor (props) {
    super(props)

    
    // if (window.ethereum) {
    //     //metamask
    //     this.provider = new ethers.providers.Web3Provider(window.ethereum);
    //     try {
    //         // Request account access if needed
    //         this.ethEnable();
    //         console.log(this.provider.selectedAddress);
    //     } catch (error) {
    //         // User denied account access...
    //         console.log(error)
    //     }
    // }else {
    //   // ganache-cli
    //   let url = "http://localhost:8545";
    //   this.provider = new ethers.providers.JsonRpcProvider(url);
    // }

    // this.provider = ethers.getDefaultProvider('kovan')
    const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
    this.signer = provider.getSigner();

    //ganache-cli
    // let privateKey = "0xCB139036AB7300B9F8A85F85975A1323B644F21F842EF87C3AB694F4B145CC1E";
    // let walletWithProvider = new ethers.Wallet(privateKey, this.provider);

    //metamask


    // let contractAddress = "0x474f84204e14dd8ebb46501adf555fe448f371c7";
    let contractAddress = "0xa202136afc9ecf2bb0160ec711ec95334dd6a012";
    let contract = new ethers.Contract(contractAddress, abi, this.signer);
    this.contract = contract;

    this.contract.on('trans', (val1, val2) => {
      console.log(val1, val2)
    })

    this.state = {
      message: '',
      formAddress : '',
      formAmount: 0,
      formMessage: '',
      getFormUid: '',
      uids: [],
      trans: [],
      sentTable: []
    }

    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormAddressChange = this.handleFormAddressChange.bind(this);
    this.handleFormAmountChange = this.handleFormAmountChange.bind(this);
    this.handleFormMessageChange = this.handleFormMessageChange.bind(this);
    this.handleGetUidChange = this.handleGetUidChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGet = this.handleGet.bind(this);

  }

  handleFormAddressChange = (e) => {
    this.setState({formAddress: e.target.value});
  }

  handleFormAmountChange = (e) => {
    this.setState({formAmount: e.target.value});
  }

  handleFormMessageChange = (e) => {
    this.setState({formMessage: e.target.value});
  }

  handleGetUidChange = (e) => {
    this.setState({getFormUid: e.target.value});
  }

  async ethEnable() {
    await window.ethereum.enable();
  }

  async componentDidMount() {
    // const message = await this.contract.message();
    await this.loadTrans();
    // let msg = await this.contract.getMessage("0x6b336e383762736a716971346b5048675531314a645637397675434c69505200", this.signer.getAddress())
  }

  async loadTrans() {
    let trans = JSON.parse(localStorage.getItem('uids'));
    if (trans == null) return;
    // console.log(trans)
    for (let id of trans){
      // console.log(id)
      let hex = await this.contract.transactions(id);
      console.log('result of ' + id, hex)
      // console.log('hex ', hex)
      let message = ethers.utils.parseBytes32String(hex.message);
      this.state.trans.push({receiver: hex.receiver, amount: parseInt(hex.amount._hex), message: message});
      this.setState((state) => {
        return {message: message};
      });
    }
    this.updateSentTable();
  }

  async handleGet() {
    // let uid = ethers.utils.formatBytes32String('"' + this.state.getFormUid + '"');
    let uid = this.state.getFormUid
    console.log(uid)
    let message = await this.contract.transactions(uid);
    console.log(message)
    this.setState((state) => {
      return {message: ethers.utils.parseBytes32String(message.message)};
    });
  }

  async handleClick() {
    console.log(this)
    //generate uid
    let str = this.makeid(31);
    let uid = ethers.utils.formatBytes32String(str);
    let msg = ethers.utils.formatBytes32String(this.state.formMessage)
    console.log(uid);
    console.log(this.state.formAddress);
    console.log(this.state.formAmount);
    console.log(msg);
    await this.contract.transferETH(uid, this.state.formAddress, this.state.formAmount, msg);

    let message = await this.contract.transactions(uid);
    console.log(message)
    this.state.uids.push(uid);
    console.log(this.state.uids);
    localStorage.setItem("uids", JSON.stringify(this.state.uids));
    // this.setState((state) => {
    //   return {message: message};
    // });

  }

  makeid(bytes) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < bytes; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    console.log('makeid ', text)
    return text;
  }


  updateSentTable = () => {
    // Outer loop to create parent
    for (let i = 0; i < this.state.trans.length; i ++) {
      let t = this.state.trans[i];
      // console.log('t', t)
      let children = []
      //Inner loop to create children
      for (let p in t) {
        // console.log('p', p)
        let tdid = i + p;
        // console.log(tdid)
        children.push(<td key={tdid}>{t[p]}</td>)
      }
      //Create the parent and add the children
      this.state.sentTable.push(<tr key={i}>{children}</tr>)
    }

  }

  render() {
    // console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          
          <table>
            {this.state.sentTable}
          </table>

          <p>
            Receiver Address:
            <input
              onChange={this.handleFormAddressChange} 
              type="text"
              name="address"
              value={this.state.formAddress}/>
          </p>
          <p>
            Amount:
            <input
              onChange={this.handleFormAmountChange} 
              type="text"
              name="amount"
              value={this.state.formAmount}/>
          </p>
          <p>
            Message:
            <input
              onChange={this.handleFormMessageChange} 
              type="text"
              name="message"
              value={this.state.formMessage}/>
          </p>
          <button onClick={this.handleClick}>
            Send
          </button>

          
        </header>
      </div>
    );
  }
}

export default App;
