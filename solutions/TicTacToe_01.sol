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
    
    // To ensure turns alternate;
    address public lastPlayed_;
    
    // Once 9 reach the game will be finalized
    uint256 public turnsTaken_;
    
    // If the game has completed, winner or draw
    bool public gameOver_;
    
    // The resulting winner
    address public winner_;

    mapping(address => uint256) public wagers_;
    
    function startGame(address _player1, address _player2) external {
        player1_ = _player1;
        player2_ = _player2;
    }
    
    /**
     * @notice place a friendly wager for the game
     */
    function placeWager() external payable {
        // Player must be valid participant of this game
        require(msg.sender == player1_ || msg.sender == player2_, "Not a valid player.");
        wagers_[msg.sender] = msg.value;
    }

    /**
     * @notice Take your turn placing your x or o
     * @param _x X coordinate
     * @param _y Y coordinate
     */
    function takeTurn(uint256 _x, uint256 _y) external {
        require(!gameOver_, "Sorry game has concluded.");
        
        // Player cannot play twice in a row
        require(msg.sender != lastPlayed_, "Not your turn.");

        // Player must be valid participant of this game
        require(msg.sender == player1_ || msg.sender == player2_, "Not a valid player.");
        
        // Compute the board location trying to be taken
        uint256 boardLocation = _y*3 + _x;
        require(gameBoard_[boardLocation] == 0, "Spot taken!");
        
        // Identifier to mark the board with dependent on player
        uint256 identifier;
        msg.sender == player1_ ? identifier = 1 : identifier = 2; 
        
        // Mark that location on the board
        gameBoard_[boardLocation] = identifier;
        
        // Set who's turn it is
        lastPlayed_ = msg.sender;
        
        turnsTaken_++;

        // See if there is a winner after this turn or if they have drawn, game over
        if (isWinner(identifier)) {
            winner_ = msg.sender;
            msg.sender.transfer(address(this).balance);
            gameOver_ = true;
        } else if (turnsTaken_ == 9) {
            player1_.transfer(wagers_[player1_]);
            player2_.transfer(wagers_[player2_]);
            gameOver_ = true;
        }
    }
    
    /**
     * @notice Finalize winner and send the value
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
    function isWinner(uint256 identifier) private view returns(bool) {
        uint8[3][8] memory winningFilters = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,7,8]];
        
        // See if either of the players have won
        for (uint8 i = 0; i < winningFilters.length; i++) {
            uint8[3] memory filter = winningFilters[i];
            
            // Player was successful!
            if (
                gameBoard_[filter[0]]==identifier && 
                gameBoard_[filter[1]]==identifier && 
                gameBoard_[filter[2]]==identifier
            ) {
                return true;
            }
        }
    }
}
