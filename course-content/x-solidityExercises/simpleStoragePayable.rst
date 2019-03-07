==================
SimpleStorage Payable
==================

.. important:: 

  The below exercises will be completed within REMIX.
  Navigate to: `https://remix.ethereum.org <https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js>`_


- `Video Lecture <https://drive.google.com/open?id=1cfJ8VvP8_dEfeYkeueSCLQ5ub-ypYlHd>`_

1 Add an ``acceptEther`` function, line 6-8
----------------------------------

    - `Video tutorial <https://drive.google.com/open?id=119p0Uf0D3NC-Fd72OZb9wi4o9JLl0ZTD>`_

::

    function acceptEther() public payable {
        storedData = this.balance;
    }

2 Compile and run, test the ``acceptEther`` function
----------------------------------

    - Call the function and send value 
    - Get the value of ``storedData``, was it updated?
    - Note the value has moved from the EOA to the contract

3 Add a function to withdraw the ether from this contract into the calling account, line 18-20
----------------------------------

::

  function withdraw() {
      msg.sender.transfer(this.balance);
  }

4 Add a function to read the balance of the simple storage contract, line 22-24
----------------------------------

::

    function getMyBalance() returns(uint256) {
        return this.balance;
    }

.. important:: 

  Forgetting something?  Don't forget these functions need to be marked ``view`` to return the value.
  Go ahead and modify the function with the ``view`` mutability modifer.

5. Add the ``view`` modifier to the ``getMyBalance`` function, line 22
----------------------------------

::

    function getMyBalance() view returns(uint256) {
        return this.balance;
    }

6. Test the ability to send and withdraw Ether from the simple storage contract
----------------------------------
    - Read the contract's balance along the way, by calling ``getMyBalance``

The final solution may be found `here <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/blg-school-hack-4-change/solutions/SimpleStoragePayable.sol>`_

.. important::

  All done?  We recommend reviewing the complementary video series found `here <../1-blockchain-fundamentals/bonus.html#blockchain-fundamentals-video-series>`_.