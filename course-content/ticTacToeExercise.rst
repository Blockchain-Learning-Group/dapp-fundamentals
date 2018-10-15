==================
SimpleStorage Exercise
==================

.. important:: 

  The below exercises will be completed within REMIX.
  Navigate to: `https://remix.ethereum.org <https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js>`_

Tic Tac Toe
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