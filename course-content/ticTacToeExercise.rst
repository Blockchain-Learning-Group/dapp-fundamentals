==================
Tic Tac Toe
==================

.. important:: 

  The below exercises will be completed within REMIX.
  Navigate to: `https://remix.ethereum.org <https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js>`_

- `Solidity Types Video Tutorial <https://drive.google.com/open?id=1iKsHIm_Kj6XNn0tYflK2XMgEJRZB5J91>`_
- `Tic-Tac-Toe Part 1 of 2 Video Tutorial <https://drive.google.com/open?id=1zSDWtgXvQNvjNYWQiX3yimU6sxuSEEhF>`_

1. Create the contract and initial storage variables, line 1-15
--------------------------
    - `Empty Contract Video Tutorial <https://drive.google.com/open?id=1c7Jbwcia3jew36q3Nb560H5StrgCohLu>`_
    - `Storage Variables Video Tutorial <https://drive.google.com/open?id=13rw1C4AhaDE22dEQcav4L5quzQqFSiqv>`_

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
        address[9] private gameBoard_;
    }

2. Create a function to allow a game to be started, line 16-19
--------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1lXBmwrriapOrYWvFqMUbFXN2upJdSXIO>`_

::

    function startGame(address _player1, address _player2) external {
        player1_ = _player1;
        player2_ = _player2;
    }

.. important::
    
    - `Video Tutorial [3-7] <https://drive.google.com/open?id=14PaxvZFIKm5EfscBF6OeMzsn3c5HwuFr>`_

3. Now players need to be able to take a turn, specifying where they want to place their x or o, line 21-25
--------------------------
- create a function to allow this

::

    /**
     * @notice Take your turn, selecting a board location
     * @param _boardLocation Location of the board to take
     */
    function takeTurn(uint256 _boardLocation) external {}

4. Mark the board, within the ``takeTurn`` function update the ``gameBoard`` array, line 26 
--------------------------

::

    gameBoard_[_boardLocation] = msg.sender;

5. Add a function to return the contents of the game board, line 29-31
----------------------------

::

    function getBoard() external view returns(address[9]) {
        return gameBoard_;
    }

6. Give it a shot!  Try starting a game and taking turns, watch as the game board's indexes are filled
--------------------------

- Now take a look, what problems do you notice?
- Did you have some time to play with the contract?
- Any big issues come up?

.. important::

    What problems currently exist with this?
    
    - Anyone can take turns!
    - A player can overwrite a spot that has already been taken
    - A player may take many turns in a row, alternating must be enforced

    Let's tackle these problems first!

.. important::
    
    - `Tic-Tac-Toe Part 2 of 2 Video Tutorial <https://drive.google.com/open?id=1tdJkcqsobL0_6-zJ5qEBHj9uscMTB9pJ>`_
    - `Video Tutorial [8-12] <https://drive.google.com/open?id=14PaxvZFIKm5EfscBF6OeMzsn3c5HwuFr>`_

7. Require that only player 1 or player 2 may take turns, within the ``takeTurn`` function line 26
--------------------------

::

    require(msg.sender == player1_ || msg.sender == player2_, "Not a valid player.");

8. Add a pre condition check to confirm the spot on the board is not already taken, within the ``takeTurn`` function line 27
--------------------------

::

    require(gameBoard_[_boardLocation] == 0, "Spot taken!");

9. Add a storage variable to track who just took a turn, line 8
--------------------------

::

    address public lastPlayed_;

10. Following a turn being taken update the storage variable, within the ``takeTurn`` function line 31
--------------------------

::

    lastPlayed_ = msg.sender;

11. Check that the same player is not trying to take another turn, within the ``takeTurn`` function line 29
--------------------------

::

    require(msg.sender != lastPlayed_, "Not your turn.");


**Try taking turns now!  More restricted / protected?**


.. important::

    Happy?

    What else do we need to fix?

    How about a conclusion to the game?

    Let's look into how we can compute a winner


.. important::
    
    - `Video Tutorial [13-17] <https://drive.google.com/open?id=1c7-UmionniBh9AV-VwOUgGn5xnk71I7K>`_

12. First define which combinations within the game board, which indexes, define a "win", line 35-49
--------------------------

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
     * [0,4,8] || [6,4,2]
     */

13. Create a function to compute a winner and implement these combintations as filters to filter the board with, line 50-56
--------------------------

::

    function isWinner(address player) private view returns(bool) {
        uint8[3][8] memory winningFilters = [
            [0,1,2],[3,4,5],[6,7,8],  // rows
            [0,3,6],[1,4,7],[2,5,8],  // columns
            [0,4,8],[6,4,2]           // diagonals
        ];
    }
        
14. Create a for loop to iterate over each filter, within the ``isWinner`` function line 57-59
--------------------------

::

    for (uint8 i = 0; i < winningFilters.length; i++) {
        uint8[3] memory filter = winningFilters[i];
    }

15. Add a storage variable to define the winner, line 9
--------------------------

::
    
    address public winner_;

16. Within the above ``for loop`` compare each filter against the game board and see if the player has won with their latest turn, line 60-66 
--------------------------

::

    if (
        gameBoard_[filter[0]]==player && 
        gameBoard_[filter[1]]==player && 
        gameBoard_[filter[2]]==player
    ) {
        return true;
    }

17. At the end of the ``takeTurn`` function, after each turn is taken see if there is a winner, update the storage variable if there is a winner, line 35-37
--------------------------
    - `Video Tutorial <https://drive.google.com/open?id=1c7-UmionniBh9AV-VwOUgGn5xnk71I7K>`_

::

    if (isWinner(msg.sender)) {
        winner_ = msg.sender;
    }

**Try it out! See if the winner is set if 3 in a row is found**

.. important:: 

    Are we done?  

    ... still a few problems

    - Turns can still continue to be taken, no notification that the game has ended
    - What happens in the case of a draw?

.. important::
    
    - `Video Tutorial [19-24] <https://drive.google.com/open?id=1c7-UmionniBh9AV-VwOUgGn5xnk71I7K>`_

18. Add a storage variable to signify the game has ended, line 10
--------------------------

::

    bool public gameOver_;

19. If a winner was found update that the game has ended, within the ``takeTurn`` function line 38
--------------------------

::

    gameOver_ = true;   

20.  Add a storage variable to count how many turns have been taken, will use this variable to define if a draw has occured, line 11
--------------------------

::

    uint256 public turnsTaken_;

21. After a turn is taken update the turns taken storage variable, within the ``takeTurn`` function line 36
--------------------------

::

    turnsTaken_++;

22.  Add a conditional that if 9 turns have been taken the game has ended with no winner, within the ``takeTurn`` function line 41-43
--------------------------

::

    else if (turnsTaken_ == 9) {
        gameOver_ = true;
    }

23. Add a last pre condition check that the game is still active, within the ``takeTurn`` function line 30
--------------------------

::

    require(!gameOver_, "Sorry game has concluded.");
    

**Try it out!!**

1. Start a game with account 1 and 2
2. Take turns back and forth
    - view turns taken are updating the game board
    - view no winner yet
    - view game has not ended
3. View that the winner has been set
4. View that the game has ended
5. Try and take another turn and view the output in Remix's console

**OK how about a friendly wager!**

.. important::

    - `Video Tutorial [25-26] <https://drive.google.com/open?id=1Q5qrZDZWV7wmMnkMQNe3F8x7_nSqmgBF>`_

24. Add a storage variable to hold the placed wagers, line 12
--------------------------

::

    mapping(address => uint256) public wagers_;

25. Add a function to allow the players to place a wager, line 82-86
--------------------------

::

    function placeWager() external payable {
        require(msg.sender == player1_ || msg.sender == player2_, "Not a valid player.");
        wagers_[msg.sender] = msg.value;
    }

.. important::

    - `Video Tutorial [27-28] <https://drive.google.com/open?id=1zd744cAsc6UhLZ-I7po8hG4sUMlcbPao>`_

26. Update the logic if a winner is found to transfer all the value to them, within the ``takeTurn`` function line 43
--------------------------

::

    msg.sender.transfer(address(this).balance);

27. Update the logic to refund the value if a draw has occured, within the ``takeTurn`` function line 46-47
--------------------------

::

    player1_.transfer(wagers_[player1_]);
    player2_.transfer(wagers_[player2_]);

**Go play!  Earn some ETH.**

- ``As above`` Final solution may be found `here <https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/blg-school-hack-4-change/solutions/TicTacToe.sol>`_

Homework!

- What happens when a new game wants to be started in the same contract?
- How to allow this?  When to allow this?  Reset storage variables?