==================
SimpleStorage
==================

.. important:: 

  The below exercises will be completed within REMIX.
  Navigate to: `https://remix.ethereum.org <https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js>`_

`Video Tutorial <https://drive.google.com/open?id=1oFj8STACT0u3fyjRC04PtyTDpMCjVwy0>`_

1 Define the compiler version, line 1
-----------------------------
::

  pragma solidity 0.4.24;

2 Create the SimpleStorage contract, line 3
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1Y4iaCKOrLE9R4F-XGdQFOTokEXvX-9pg>`_

::

  contract SimpleStorage {}

3 Compile and deploy, view the deloyed contract instance within Remix
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1DNIrahMm9u14wXYlCGBeEgmFg2ukfyh7>`_

4 Add a first storage variable, ``storedData``, line 4
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1ok2sFnB2DHZ7hixrqty3I93aTtXyDRYN>`_

::

  uint256 storedData;

5 Compile and deploy, view the deloyed contract instance
-----------------------------

.. note::

  Is the storage variable, ``storedData``, available in the interface?

6 Update the storage variable's visibility to ``public``, line 4
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=120qzZvG7XRb13v54YQjCMRAFAuHz8_4r>`_

::

  uint256 public storedData;


7 Compile and deploy, view deloyed contract instance
-----------------------------

.. note::

  Is the storage variable, ``storedData``, available in the interface now?

.. important::

  Note the changes made between 4 and 7 and the impact of the visibility modification.

    - The difference between default(internal) visibility and public visibility.

8 Create the SimpleStorage contract's first function to set the value of the storage variable, line 6-8
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1lfsitfRtTta_ZYSdLgOvIMifTdhZgUrs>`_

::

  function set(uint256 x) {
      storedData = x;
  }    

9 Compile and deploy the contract again, test the set function
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1ThUvNoQ561rXdRLMM1AgQhjlyx3G7Od0>`_

- Read ``storedData``
- Call ``set`` to update the value of storedData, note default visibility
- Read ``storedData``, did the value change successfully?
- Expand the transactional data within the evm console and investigate

10 Change the visibility of storedData to private, line 4
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1WR5l3ypjU45Cfofti1Fix3XqctxtUo0j>`_

::

  uint256 private storedData;

.. note::

  Storage variable is no longer accessible, let's write a function to fix that!

11 Create a function to get the value of storedData, line 10-12
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1JDoKpSt2ZNSuMMlKHyozTErlvoWzFOPi>`_

::

  function get() returns (uint256) {
      return storedData;
  }

12 Compile and deploy, test the get function
-----------------------------

.. note::

  Could you get the value of storedData?  
  What did the get function return?
  Was gas consumed?  Was a transaction sent?  Or a call?

13 Update the get function's mutability, line 10
-----------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1v-GGzg52eBXgR-qaaPd8iyYZ220Mns4V>`_

::

  function get() view returns (uint256) {
      return storedData;
  }


14 Compile and deploy, test the set and get functions
-----------------------------

- get the initial value, what was returned this time? a tx or a call?
- set the value
- view it has changed
- investigate evm console transactional details along the way


The final solution may be found `here <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/blg-school-hack-4-change/solutions/SimpleStorage.sol>`_

.. important::

  All done?  We recommend reviewing the complementary video series found `here <https://blg-dapp-fundamentals.readthedocs.io/en/blg-school-hack-4-change/course-content/1-HS-blockchain-fundamentals.html#blockchain-fundamentals-video-series>`_.