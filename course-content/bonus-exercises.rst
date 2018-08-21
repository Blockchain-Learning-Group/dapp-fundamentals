==================
Bonus Exercises
==================

1. `SimpleStorage TODO <https://raw.githubusercontent.com/Blockchain-Learning-Group/dapp-fundamentals/master/exercises/Voting_02.sol>`_
=====================================================================================================================
- `TODO View Final Solution Demo <https://drive.google.com/open?id=1HUlqRB62Y57RXIbGmp4ckmHuc2cpHqkb>`_

`Video Tutorial <https://drive.google.com/open?id=13DBLIclqpJ9iNtRWzSvJ8NGzBM-LTbdD>`_

1.1 Define the compiler verion

::

  pragma solidity 0.4.24;

1.2 Create the SimpleStorage contract

::

  contract SimpleStorage {}


1.3 Compile and deploy, view deloyed contract instance 

1.4 Add a first storage variable, ``storedData``

::

  uint256 storedData;

1.5 Compile and deploy, view deloyed contract instance

.. note::

  Is the storage variable, ``storedData``, available in the interface?

1.6 Update the storage variable's visibility to ``public``

::

  uint256 public storedData;


1.7 Compile and deploy, view deloyed contract instance

.. note::

  Is the storage variable, ``storedData``, available in the interface now?


.. important::

  Note the changes made between 1.4 and 1.7 and the impact of the visibility modification.
  - The difference between default(interal) visiblity and public.

1.8 Create the SimpleStorage contract's first function to set the value of the storage variable

::

  function set(uint256 x) {
      storedData = x;
  }    

1.9 Compile and deploy, test the set function

- Read ``storedData``
- Call ``set`` to update the value of storedData, note default visibility
- Read ``storedData``, did the value change successfully
- Expand the transactional data within the evm console and investigate

1.10 Change the visibility of storedData to private

::

  uint256 private storedData;

.. note::

  Storage variable is no longer accessible, let's right a function to fix that!

1.11 Create a function to get the value of storedData 

::

  function get() returns (uint256) {
      return storedData;
  }

1.12 Compile and deploy, test the get function

.. note::

  Could you get the value of storedData?  
  What did the get function return?
  Was gas consumed?  Was a transaction sent?  Or a call?

1.13 Update the get function's mutability 

::

  function get() view returns (uint256) {
      return storedData;
  }


1.14 Compile and deploy, test the set and get functions

- get the initial value, what was returned this time? a tx or a call?
- set the value
- view it has changed
- investigate evm console transactional details along the way

====

2. Payable functions and contract to contract communication

2.1 Add an acceptEther function

::
    function acceptEther() public payable {
        storedData = this.balance;
    }

2.2 Compile and run, test the acceptEther function

- Call the function and send value 
- get the value of stored data, was it updated?
- note value has moved from the EOA to the contract

2.3 Add a second contract that will interact with SimpleStorage

:: 

  contract TestContractValueTransfers {}

2.4 Add a storage variable, an instance of a simple storage contract

::

  SimpleStorage simpleStorage = new SimpleStorage();

2.5 Add a function to withdraw the ether from this contract into the simple storage contract 

::

  function withdraw() {
      simpleStorage.transfer(this.balance);
  }

2.6 try this method?  

- won't compile: Value transfer to a contract without a payable fallback function. simpleStorage.transfer(this.balance);

2.7 add a fallback to the simple storage contract

:: 

  function () external payable {}

Compiles now?


2.8 Try the withdraw function now

- not so useful without a way to read the balances eh?

2.9 Add 2 functions to read the balance of the simple storage contract as well as the test contract

::

    function getSimpleStorageBalance() returns(uint256) {
        return simpleStorage.balance;
    }
    
    function getMyBalance() returns(uint256) {
        return this.balance;
    }

.. important:: 

  Forgetting something?  Don't forget these functions need to be marked ``view`` to return the value.
  Go ahead and modifier both functions with the ``view`` mutability modifer.

2.10 Add fallback to test in order to fund it

::

  function () external payable {}

2.11 test the ability to withdraw into the simple storage contract

- read balances along the way

====


Source Code
===========

pragma solidity 0.4.24;

contract SimpleStorage {
    uint256 public storedData;
    
    function () external payable {}
    
    function acceptEther() public payable {
        storedData = this.balance;
    }

    function set(uint256 x) {
        storedData = x;
    }    

    function get() returns (uint256) {
        return storedData;
    }
}


contract TestContractValueTransfers {
    SimpleStorage simpleStorage = new SimpleStorage();
 
    function () external payable {}
 
    function withdraw() {
        simpleStorage.transfer(this.balance);
    }
    
    function getSimpleStorageBalance() view returns(uint256) {
        return simpleStorage.balance;
    }
    
    function getMyBalance() view returns(uint256) {
        return this.balance;
    }
}