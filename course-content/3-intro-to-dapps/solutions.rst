Solutions
=========

Stage 10: Transfer Tokens

`Video Tutorial <https://drive.google.com/open?id=1JPno5OLKUPTMdXO2O4YeXch1SZFyG297>`_

1. Add the transferAmount and transferUser to the app's state, line 28 & 29.

.. code-block:: javascript

  transferAmount: '',
  transferUser: '',

2. Add the React transfer tokens form component, line 128-139.

.. code-block:: javascript

  <div>
    <h3>Transfer Tokens</h3>
    <TextField floatingLabelText="User to transfer tokens to." style={{width: 400}} value={this.state.transferUser}
      onChange={(e, transferUser) => { this.setState({ transferUser }) }}
    />
    <TextField floatingLabelText="Amount." style={{width: 100}} value={this.state.transferAmount}
      onChange={(e, transferAmount) => { this.setState({ transferAmount })}}
    />
    <RaisedButton label="Transfer" labelPosition="before" primary={true}
      onClick={() => this.transfer(this.state.transferUser, this.state.transferAmount)}
    />
  </div>

3. Complete the transfer method to send the transfer transaction, line 117-124.

.. code-block:: javascript

  const sender  = this.web3.eth.accounts[this.state.defaultAccount];
  const transactionHash = await this.state.token.transfer(user, amount, { from: sender });
  console.log(transactionHash);

`Complete Wallet Solution <https://github.com/Blockchain-Learning-Group/wallet-eod2>`_

- |app07|

  .. |app07| raw:: html

    <a href="https://github.com/Blockchain-Learning-Group/course-resources/blob/master/wallet-template/dev-stages/App.7.js" target="_blank">Complete App.js solution may be found here</a>