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

1.12 Compile and deploy, test the set and get functions

- get the initial value
- set the value
- view it has changed
- investigate evm console transactional details along the way

====



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