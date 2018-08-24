pragma solidity 0.4.24;


contract TicTacToe {

    address public player1_;
    address public player2_;
    uint256[9] public gameBoard_;
    
    // To ensure turns alternate;
    address public lastPlayed_;
    
    // Once 9 reach the game will be finalized
    uint256 public turnsTaken;
    
    bool public gameOver;
    
    constructor(address _player1, address _player2) public payable {
        player1_ = _player1;
        player2_ = _player2;
    }   
    
    /**
     * @notice Take your turn placing your x or o
     * @param _x X coordinate
     * @param _y Y coordinate
     */
    function takeTurn(uint256 _x, uint256 _y) external returns(bool) {
        // Require game is still active
        require(!gameOver, "Game is no longer active");
        
        // Player cannot play twice in a row
        require(tx.origin != lastPlayed_, "Not your turn.");

        // Player must be valid participant of this game
        require(tx.origin == player1_ || tx.origin == player2_, "Not a valid player.");
        
        uint256 boardLocation = _y*3 + _x;
        require(gameBoard_[boardLocation] == 0, "Spot taken!");
        
        // Identifier to mark the board with
        uint256 identifier;
        tx.origin == player1_ ? identifier = 1 : identifier = 2; 
        
        // Mark that location on the board
        gameBoard_[boardLocation] = identifier;
        
        // Set who's turn it is, NOTE not msg.sender
        lastPlayed_ = tx.origin;
        
        // See if there is a winner after this turn, game  over
        if (isWinner(identifier)) return true;
        
        turnsTaken++;
        
        if (turnsTaken == 9) {
            draw();
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
    function isWinner(uint256 identifier) private returns(bool) {
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
                tx.origin.transfer(address(this).balance);
                gameOver = true;
                return true;
            }
        }
    }
    
    /**
     * @notice No winner after 9 turns, was a draw
     */
    function draw() private {
        // It was a draw, split the wager
        player1_.transfer(address(this).balance / 2);
        player2_.transfer(address(this).balance / 2);
    }
    
    function getBoard() external view returns(uint256[9]) {
        return gameBoard_;
    }
}
    
contract GameFactory {
    
    struct Challenge {
        address challenger;
        uint256 wager;
    }
    
    // A user's active games
    mapping(address => address[]) public activeGames_;
    
    // The challenges made against a user
    mapping(address => Challenge[]) public challenges_;
    
    event GameCreated(address player1, address player2, address game, uint256 wager);
    event TurnTaken(address player, uint256[9] gameBoard);
    event Winner(address winner);
    
    /**
     * @notice Challenge a user to a game of tic-tac-toe
     * @param _opponent Who is being challenged
     */
    function createChallenge(address _opponent) external payable {
        challenges_[_opponent].push(Challenge(msg.sender, msg.value));
    }
    
    /**
     * @notice Accept a challenge
     * @param _index The index of the challenge in your challenges array
     */
    function acceptChallenge(uint256 _index) external payable {
        Challenge memory challenge = challenges_[msg.sender][_index];
        
        // Ensure there was enough ether sent to match the wager
        require(msg.value == challenge.wager, "Insufficient ether sent to match the wager.");
        
        // Create the game, new tic-tac-toe contract
        // Sending value, ether to the contract's constructor
        address newGame = (new TicTacToe).value(msg.value*2)(challenge.challenger, msg.sender);
        
        // Add this to both users active games array
        activeGames_[msg.sender].push(newGame);
        activeGames_[challenge.challenger].push(newGame);
        
        emit GameCreated(challenge.challenger, msg.sender, newGame, msg.value*2);
    }
    
    /**
     * @notice Take your turn placing your x or o
     * @param _x X coordinate
     * @param _y Y coordinate
     */
    function takeTurn(uint256 _gameIndex, uint256 _x, uint256 _y) external {
        // Instantiate the game in order to take the turn
        TicTacToe game = TicTacToe(activeGames_[msg.sender][_gameIndex]);
        
        // Take the turn calling the method of the game contract
        bool wasAWinner = game.takeTurn(_x, _y);
        
        // get the current state of the board to emit event
        uint256[9] memory board = game.getBoard();
        emit TurnTaken(msg.sender, board);
        
        if (wasAWinner) {
            emit Winner(msg.sender);
        }
    }
}