==================
Bonus Exercises
==================

.. important:: 

  The below exercises will be completed within REMIX.
  Navigate to: `https://remix.ethereum.org <https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js>`_



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
===========================================================

Solution: SimpleStorageAndFactory.sol
-------------------------------------

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

3. Units and globals
=================

Solution: SimpleStorageTimeLock
-------------------------------

1. Add a delay to specify how long of a delay is required between updates to the storedData 

::

  uint256 delay = 5 seconds;

2. Add a storage variable to track when was last set

::

  uint256 public wasSetLast;

3. Once the value was set update the wasSetLast variable

::

  wasSetLast = block.timestamp;

4. Try it out!  Does the wasSetLast update correctly?

5. Now permission the set function to only allow writes after the delay

::

  require(block.timestamp > wasSetLast + delay, "Delay has not passed.");

====

Tic Tac Toe v1
==============

SOLUTION: TicTacToe_01.sol
--------------------------

1. create contract and initial storage vars

::

    pragma solidity 0.4.24;


    contract TicTacToe {
        
        address public player1_;
        address public player2_;
        
        /** The game board itself 
        * 0, 1, 2
        * 3, 4, 5
        * 6, 7, 8
        */
        uint256[9] public gameBoard_;
    }

2. Create a function to allow a game to be started

::

    function startGame(address _player1, address _player2) external {
        player1_ = _player1;
        player2_ = _player2;
    }

3. Now players need to be able to take a turn, specifying where they want to place their x or 0
- create a function to allow this

::

    /**
     * @notice Take your turn placing your x or o
     * @param _x X coordinate
     * @param _y Y coordinate
     */
    function takeTurn(uint256 _x, uint256 _y) external {}

4. We need to calculate the correpsonding index in the array based on the x and y passed in
- explain how this is computed

::

    uint256 boardLocation = _y*3 + _x;

5. Determine the identifier to mark the board with

::

    uint256 identifier;
    msg.sender == player1_ ? identifier = 1 : identifier = 2; 

6. Mark the board, update the array

::

    gameBoard_[boardLocation] = identifier;

7. Give it a shot!  Try starting a game and taking turns, watch as the game board's indexes are filled.

- now take a look what problems do you notice?

**STOP RECORDING**

- did you have some time to play with the contract?
- Any big issues come up?
- what we noticed was:

.. important::

    What problems currently exist with this?
    
    - Anyone can take turns!
    - A player can overwrite a spot that has already been taken
    - A player may take many turns in a row, now alternating enforcement

    Let's tackle these problems first!


8. Require that only player1 or player 2 may take turns

::

    require(msg.sender == player1_ || msg.sender == player2_, "Not a valid player.");

9. Add a pre condition check to confirm the spot on the board is not already taken 

::

    require(gameBoard_[boardLocation] == 0, "Spot taken!");

10. Add a storage variable to track who just took a turn

::
    address public lastPlayed_;

11. Following a turn being taken update the storage variable

::

    lastPlayed_ = msg.sender;

12. Check that the same player is not trying to take another turn

::
    require(msg.sender != lastPlayed_, "Not your turn.");


**Try taking turns now!  More restricted / protected?**


.. important::

    Happy?

    What else do we need to fix?

    How about a conclusion to the game?

    Let's look into how we can compute a winner


13. First define which combintations within the game board, which indexes, define a "win"

::

    /**
     * Winning filters:
     * 0, 1, 2
     * 3, 4, 5
     * 6, 7, 8
     * 
     * 3 in a row:
     * [0,1,2] || [3,4,5] || [6,7,8] 
     * 
     * 3 in a column:
     * [0,3,6] || [1,4,7] || [2,5,8] 
     * 
     * Diagonals:
     * [0,4,8] || [6,7,8]
     */

14. Create a function to compute a winner and Implement these combintations as filters to filter the board with

::

    function isWinner(uint256 identifier) private view returns(bool) {
        uint8[3][8] memory winningFilters = [
            [0,1,2],[3,4,5],[6,7,8],  // rows
            [0,3,6],[1,4,7],[2,5,8],  // columns
            [0,4,8],[6,7,8]           // diagonals
        ];
    }
        
15. Create a for loop to iterate over each filter

::

    for (uint8 i = 0; i < winningFilters.length; i++) {
        uint8[3] memory filter = winningFilters[i];
    }

16. Add a storage variable to define the winner

::
    
    address public winner_;

17. Compare each filter against the game board and see if the player has won with their latest turn

::

    if (
        gameBoard_[filter[0]]==identifier && 
        gameBoard_[filter[1]]==identifier && 
        gameBoard_[filter[2]]==identifier
    ) {
        return true;
    }

18. After each turn is taken see if there is a winner, update storage with the winner

::

    if (isWinner(identifier)) {
        winner_ = msg.sender;
    }

**Try it out!! see if the winner is set if 3 in a row is found**

**STOP RECORDING**

.. important:: 

    Are we done?  

    ... still a few problems

    - Turns can still continue to be taken, no notification that the game has ended
    - What happens in the case of a draw?

19. Add a storage variable to signify the game has ended

::

    bool public gameOver_;

20. If a winner was found update that the game has ended

::

    gameOver_ = true;

21.  Add a storage variable to count how many turns have been taken, will use to define a draw

::

    uint256 public turnsTaken_;

22. After a turn is taken update the turns taken storage variable

::

    turnsTaken_++;

23.  Add a conditional that if 9 turns have been taken the game has ended with no winner

::

    else if (turnsTaken_ == 9) {
        gameOver_ = true;
    }

24. Add a last pre condition check that the game is still active

::

    require(!gameOver_, "Sorry game has concluded.");
    

**Try it out!!**

1. start game, account 1 and 2
2. take turns back and forth, 0,1 0,2 0,3 => player to win
    - view turns taken updating
    - view no winner yet
    - view game has not ended
3. View that the winner has been set
4. view that game has ended
5. Try and take another turn => view output

**OK how about a friendly wager!**

25. Add a storage variable to hold the placed wagers

::

    mapping(address => uint256) public wagers_;

26. Add a function to allow the players to place a wager

::

    function placeWager() external payable {
        require(msg.sender == player1_ || msg.sender == player2_, "Not a valid player.");
        wagers_[msg.sender] = msg.value;
    }

27. Update the logic if a winner is found to transfer all the value to them

::

    msg.sender.transfer(address(this).balance);

28. Update the logic to refund the value if a draw

::

    player1_.transfer(wagers_[player1_]);
    player2_.transfer(wagers_[player2_]);


**Go play!  Earn some ETH.**

Homework!

- What happens when a new game wants to be started in the same contract?
- How to allow this?  When to allow this?  Reset storage variables?


Intro Token
===========


1. Create empty contract

::

    pragma solidity 0.4.24;

    contract MyToken {}

2. Add the contract metadata, identifying data

::

    string public symbol = 'BLG';
    string public name = 'Blockchain Learning Group Community Token';

pragma solidity 0.4.24;

contract MyToken {
  string public symbol = 'BLG';
  string public name = 'Blockchain Learning Group Community Token';
}


3. Add the storage variables

::

    uint256 public totalSupply_;
    mapping (address => uint256) public balances_;


pragma solidity 0.4.24;

contract MyToken {
  string public symbol = 'BLG';
  string public name = 'Blockchain Learning Group Community Token';
  
  uint256 public totalSupply_;
  mapping (address => uint256) public balances_;
}

4. Define the rate

::

    // Rate of tokens to issue per unit of wei, 1 wei = 2 tokens
    uint256 public rate = 2; 

pragma solidity 0.4.24;

contract MyToken {
  string public symbol = 'BLG';
  string public name = 'Blockchain Learning Group Community Token';
  
  uint256 public totalSupply_;
  mapping (address => uint256) public balances_;
  
  // Rate of tokens to issue per unit of wei, 1 wei = 2 tokens
  uint256 public rate = 2; 
}

5. Add the events

::

    event Transfer(address from, address to, uint value);
    event TokensMinted(address to, uint256 value, uint256 totalSupply);

pragma solidity 0.4.24;

contract MyToken {
  string public symbol = 'BLG';
  string public name = 'Blockchain Learning Group Community Token';
  
  uint256 public totalSupply_;
  mapping (address => uint256) public balances_;
  
  // Rate of tokens to issue per unit of wei, 1 wei = 2 tokens
  uint256 public rate = 2; 
  
  event Transfer(address from, address to, uint value);
  event TokensMinted(address to, uint256 value, uint256 totalSupply);
}

6. Add a buy method

::

    function buy() external payable {
        uint256 tokenAmount = msg.value * rate;

        totalSupply_ += tokenAmount;
        balances_[msg.sender] += tokenAmount;

        emit TokensMinted(msg.sender, msg.value, totalSupply_);
        emit Transfer(address(0), msg.sender, msg.value);
    }

pragma solidity 0.4.24;

contract MyToken {
  string public symbol = 'BLG';
  string public name = 'Blockchain Learning Group Community Token';
  
  uint256 public totalSupply_;
  mapping (address => uint256) public balances_;
  
  // Rate of tokens to issue per unit of wei, 1 wei = 2 tokens
  uint256 public rate = 2; 
  
  event Transfer(address from, address to, uint value);
  event TokensMinted(address to, uint256 value, uint256 totalSupply);
  
  function buy() external payable {
    uint256 tokenAmount = msg.value * rate;

    totalSupply_ += tokenAmount;
    balances_[msg.sender] += tokenAmount;

    emit TokensMinted(msg.sender, msg.value, totalSupply_);
    emit Transfer(address(0), msg.sender, msg.value);
  }
}

7. Add a getter to check the balance of the token contract

::

    function balance() external view returns(uint256) {
      return address(this).balance;
    }

**buy some tokens and watch the balances mapping and eth balances, and monitor the balance of the contract**

pragma solidity 0.4.24;

contract MyToken {
  string public symbol = 'BLG';
  string public name = 'Blockchain Learning Group Community Token';
  
  uint256 public totalSupply_;
  mapping (address => uint256) public balances_;
  
  // Rate of tokens to issue per unit of wei, 1 wei = 2 tokens
  uint256 public rate = 2; 
  
  event Transfer(address from, address to, uint value);
  event TokensMinted(address to, uint256 value, uint256 totalSupply);
  
  function buy() external payable {
    uint256 tokenAmount = msg.value * rate;

    totalSupply_ += tokenAmount;
    balances_[msg.sender] += tokenAmount;

    emit TokensMinted(msg.sender, msg.value, totalSupply_);
    emit Transfer(address(0), msg.sender, msg.value);
  }

  function balance() external view returns(uint256) {
      return address(this).balance;
  }
}

8. Add a transfer function

::

    function transfer (address _to, uint256 _value) external {
        require(balances_[msg.sender] >= _value, 'Sender balance is insufficient');

        balances_[msg.sender] -= _value;
        balances_[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
    }

pragma solidity 0.4.24;

contract MyToken {
  string public symbol = 'BLG';
  string public name = 'Blockchain Learning Group Community Token';
  
  uint256 public totalSupply_;
  mapping (address => uint256) public balances_;
  
  // Rate of tokens to issue per unit of wei, 1 wei = 2 tokens
  uint256 public rate = 2; 
  
  event Transfer(address from, address to, uint value);
  event TokensMinted(address to, uint256 value, uint256 totalSupply);
  
  function buy() external payable {
    uint256 tokenAmount = msg.value * rate;

    totalSupply_ += tokenAmount;
    balances_[msg.sender] += tokenAmount;

    emit TokensMinted(msg.sender, msg.value, totalSupply_);
    emit Transfer(address(0), msg.sender, msg.value);
  }
  
  function balance() external view returns(uint256) {
      return address(this).balance;
  }

  function transfer (address _to, uint256 _value) external {
    require(balances_[msg.sender] >= _value, 'Sender balance is insufficient');

    balances_[msg.sender] -= _value;
    balances_[_to] += _value;

    emit Transfer(msg.sender, _to, _value);
  }
}

**Buy and transfer some tokens!**

9. add a withdraw function

::

    function withdraw(address _wallet) external {
        _wallet.transfer(address(this).balance);
    }

.. important::

    anyone can withdraw the balance!!

10. add a storage variable to define who the owner of the token is

::

    address public owner_;

11. add a constructor to set the sender of the contract creation transaction as the owner

::

    constructor() public {
        owner_ = msg.sender;
    }

12. permission withdraw to just the owner!

::

    require(msg.sender == owner_, "only the owner may withdraw");

**purchase from some diff accounts then withdraw an watch balances**

pragma solidity 0.4.24;

contract mytoken {
  string public symbol = 'blg';
  string public name = 'blockchain learning group community token';
  
  uint256 public totalsupply_;
  mapping (address => uint256) public balances_;
  
  // rate of tokens to issue per unit of wei, 1 wei = 2 tokens
  uint256 public rate = 2; 
  
  address public owner_;
  
  event transfer(address from, address to, uint value);
  event tokensminted(address to, uint256 value, uint256 totalsupply);
  
  constructor() public {
    owner_ = msg.sender;
  }
  
  function buy() external payable {
    uint256 tokenamount = msg.value * rate;

    totalsupply_ += tokenamount;
    balances_[msg.sender] += tokenamount;

    emit tokensminted(msg.sender, msg.value, totalsupply_);
    emit transfer(address(0), msg.sender, msg.value);
  }

  function balance() external view returns(uint256) {
      return address(this).balance;
  }
  
  function transfer (address _to, uint256 _value) external {
    require(balances_[msg.sender] >= _value, 'sender balance is insufficient');

    balances_[msg.sender] -= _value;
    balances_[_to] += _value;

    emit transfer(msg.sender, _to, _value);
  }
  
  function withdraw(address _wallet) external {
    require(msg.sender == owner_, "only the owner may withdraw");
    _wallet.transfer(address(this).balance);
  }
}


v3 - extended tic tac toe
=====

SOLUTION: TicTacToe_02
======================


tx origin vs msg.sender
=======================

SOLUTION: TxOriginVsMsgSender.sol
---------------------------------


