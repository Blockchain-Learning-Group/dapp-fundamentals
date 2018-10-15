==================
SimpleStorage Payable Exercise
==================

.. important:: 

  The below exercises will be completed within REMIX.
  Navigate to: `https://remix.ethereum.org <https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js>`_


1 Add an acceptEther function
    - `Video Tutorial <https://drive.google.com/open?id=119p0Uf0D3NC-Fd72OZb9wi4o9JLl0ZTD>`_

::
    function acceptEther() public payable {
        storedData = this.balance;
    }

2 Compile and run, test the acceptEther function

    - Call the function and send value 
    - get the value of stored data, was it updated?
    - note value has moved from the EOA to the contract

3 Add a function to withdraw the ether from this contract into the calling account 

::

  function withdraw() {
      msg.sender.transfer(this.balance);
  }

4 Add a function to read the balance of the simple storage contract

::

    function getMyBalance() returns(uint256) {
        return this.balance;
    }

.. important:: 

  Forgetting something?  Don't forget these functions need to be marked ``view`` to return the value.
  Go ahead and modify the function with the ``view`` mutability modifer.

5. Add the ``view`` modifier to the ``getMyBalance`` function

::

    function getMyBalance() view returns(uint256) {
        return this.balance;
    }

6. Test the ability to send and withdraw Ether from the simple storage contract
    - read balances along the way, by calling ``getMyBalance``