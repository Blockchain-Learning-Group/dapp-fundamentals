# Blockchain Fundamentals
1. [https://ethstats.net/](https://ethstats.net/)
2. [http://ethgasstation.info/](http://ethgasstation.info/)
3. [https://etherscan.io/](https://etherscan.io/)
    * [Augur](https://etherscan.io/token/REP#readContract)
4. [https://www.ethernodes.org/](https://www.ethernodes.org/network/1)

5. Hash Function

```
$ pip3 install pysha3==1.0.2
$ python3
>>> from sha3 import keccak_256
>>> keccak_256(bytes(1)).hexdigest()
bc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a

>>> keccak_256(bytes(2)).hexdigest()
54a8c0ab653c15bfb48b47fd011ba2b9617af01cb45cab344acd57c924d56798
```

6. [Mining Script](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/scripts/proof_of_work_mining.py)
```
// Difficulty Increasing
python3 proof_of_work_mining.py 0066d6a68c353ec7c7726ffa7389725b6215e463baf2baf1d4f9d97b514659
python3 proof_of_work_mining.py 0006d6a68c353ec7c7726ffa7389725b6215e463baf2baf1d4f9d97b514659
python3 proof_of_work_mining.py 0000d6a68c353ec7c7726ffa7389725b6215e463baf2baf1d4f9d97b514659
```

7. [Bitcoin 51% Attack Cost](https://gobitcoin.io/tools/cost-51-attack/)

8. [Remix](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.15+commit.bbb8e64f.js)

9. [DappDeveloper.sol](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/samples/DappDeveloper.sol)

10. Exceed Block Gas Limit

_Add the below to DappDeveloper.sol_
```
uint256 value_;

function reachGasLimit() {
  for (uint256 i = 0; i < 10**18; i++) {
      value_ = i;
      value_ = i + 1;
      value_ = i + 2;
  }
}
```

11. [Voting Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Voting.sol), [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/VotingSolution.sol)
- Define the duration of the vote
```
// Line 14
uint public constant VOTE_DURATION_BLOCKS = 10;
```

- Set the storage variables
```
// When the vote started in order to define end time
uint public startBlock_;

// Only enable users to vote once
mapping(address => bool) public hasVoted_;

// Map the name(uint for simplicity) of the candidate to the total number of votes they have
mapping(uint8 => uint) public candidateTotals_;

// List of candidates
uint8[] public candidates_;

// Winner of the vote once complete
uint8 public winner_;
```

- Set the start block of the vote.
```
// Within the constructor
startBlock_ = block.number;
```
- Confirm the start block is being set correctly. Compile and deploy.

- Complete the add candidate method.
```
/**
 * @dev Add a new candidate.
 * @param _candidate Add the candidate. Note this dynamic array
 * is iterated over to define winner, must be within block gas limit!
 */
function addCandidate(uint8 _candidate) external {
  // NOTE no check if candidate already exists..
  // NOTE no permissioning, DOS vector

  // Vote has concluded
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    tallyVote();

  // Add the new candidate
  } else {
    candidates_.push(_candidate);
    LogCandidateAdded(_candidate);
  }
}
```

- Compile and deploy the contract and confirm you may now add a candidate and access it in the candidates array.

- Complete the cast vote method.
```
/**
 * @dev Cast your vote.
 * @param _candidate The candidate you wish to vote for.
 */
function castVote(uint8 _candidate) external {
  // Vote has concluded!
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    tallyVote();

  // User may only vote once
  } else if (hasVoted_[msg.sender]) {
    LogUserHasAlreadyVoted(msg.sender);

  // Cast the vote! And set that the user has already voted
  } else {
    hasVoted_[msg.sender] = true;
    candidateTotals_[_candidate] += 1;
    LogVoteCast(msg.sender, _candidate);
  }
}
```

- Compile and deploy and confirm votes may be cast.  Add a candidate and vote for them. Confirm their total is updated and events emitted.

- Create the event for once the vote has completed.
```
event LogVoteComplete(uint8 winner);
```

- Complete the tally vote method.
```
/**
 * @dev Tally the vote and publicize the results.
 */
function tallyVote() public {
  if (block.number > startBlock_ + VOTE_DURATION_BLOCKS) {
    uint8 candidate;
    uint8 winner; // Only want to write to storage once

    // Find the winner, candidate with most votes
    for (uint8 i; i < candidates_.length; i++) {
      candidate = candidates_[i];

      if (candidateTotals_[candidate] > candidateTotals_[winner]) {
        winner = candidate;
      }
    }

    // Final write to storage
    winner_ = winner;

    LogVoteComplete(winner);

  // Vote duration has not elapsed
  } else {
    LogVoteStillActive();
  }
}
```

Usage:
- Try out your vote!
- Confirm user may only vote once.
- Confirm vote may only be tallied after the number of blocks have elapsed.
- Confirm correct winner logged.

12. [Token Exercise](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/exercises/Token.sol), [Solution](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/solutions/TokenSolution_EOD1.sol)
- Copy the exercise over to remix.
- Note LoggingErrors pattern, libraries, etc.

- Compile and deploy the contract. Confirm variables and methods available.

- Complete the mint method.
```
/**
 * @dev Mint tokens and allocate them to the specified user.
 * @param _to The address of the recipient.
 * @param _value The amount of tokens to be minted and transferred.
 * @return Success of the transaction.
 */
function mint(address _to, uint _value)
  external
  returns(bool)
{
  if (msg.sender != owner_)
    return error('msg.sender != owner, Token.mint()');

  if (_value <= 0)
    return error('Cannot mint a value of <= 0, Token.mint()');

  if (_to == address(0))
    return error('Cannot mint tokens to address(0), Token.mint()');

  totalSupply_ = totalSupply_.add(_value);
  balances_[_to] = balances_[_to].add(_value);

  LogTokensMinted(_to, _to, _value, totalSupply_);
  Transfer(address(0), _to, _value);

  return true;
}
```

- Compile deploy and confirm you can mint to an address. Confirm balance updated in balances_ mapping.

- Complete the transfer from method.
```
/**
 * @param _from The address transferring from.
 * @param _to The address transferring to.
 * @param _amount The amount to transfer.
 * @return The success of this method.
 */
function transferFrom(address _from, address _to, uint256 _amount)
  external
  returns(bool)
{
  if (_amount <= 0)
    return error('Cannot transfer amount <= 0, Token.transferFrom()');

  if (_amount > balances_[_from])
    return error('From account has an insufficient balance, Token.transferFrom()');

  if (_amount > allowed_[_from][msg.sender])
    return error('msg.sender has insufficient allowance, Token.transferFrom()');

  balances_[_from] = balances_[_from].sub(_amount);
  balances_[_to] = balances_[_to].add(_amount);

  allowed_[_from][msg.sender] = allowed_[_from][msg.sender].sub(_amount);

  Transfer(_from, _to, _amount);

  return true;
}
```

- Complete the balanceOf method to return the user's balance.
```
return balances_[_owner];
```

- Compile and deploy and confirm transfer and transferFrom working.  
- Note error logging if insufficient allowance and other errors correct.

Usage:
1. minting
2. Transfers
3. Approvals
4. TransferFrom

*Save this contract to disk. We will be using it tomorrow!*

### Homework
  - Get your parity node synced!
