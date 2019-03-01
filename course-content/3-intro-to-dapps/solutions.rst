Solutions
=========

Stage 10: Transfer Tokens

`Video Tutorial <https://drive.google.com/open?id=1JPno5OLKUPTMdXO2O4YeXch1SZFyG297>`_

1. Add the transferAmount and transferUser to the app's state, line 28 & 29.

.. code-block:: javascript

  transferAmount: '',
  transferUser: '',

2. Add the React transfer tokens form component, line 150-161.

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

  if (amount > 0) {
    // Execute token transfer below
    this.state.token.transfer(user, amount, {
      from: this.web3.eth.accounts[this.state.defaultAccount]
    }, (err, res) => {
      err ? console.error(err) : console.log(res)
    })
  }


`Complete Wallet Solution <https://github.com/Blockchain-Learning-Group/wallet-eod2>`_

- ``git clone https://github.com/Blockchain-Learning-Group/wallet-eod2.git``
- ``cd wallet-eod2``
- ``git checkout tags/2.0``