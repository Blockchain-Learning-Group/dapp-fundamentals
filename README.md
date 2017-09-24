# Decentralized Application Development Fundamentals
This serves as an outline of useful resources leveraged over the duration of Blockchain Learning Group's DApp Development Fundamentals course.

## Useful Resources
1. [https://ethstats.net/](https://ethstats.net/)
2. [http://ethgasstation.info/](http://ethgasstation.info/)
3. [https://etherscan.io/](https://etherscan.io/)
    * [Augur](https://etherscan.io/token/REP#readContract)
    * [Golem Multi-sig Wallet](https://etherscan.io/address/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9#code)
4. [https://www.ethernodes.org/](https://www.ethernodes.org/network/1)
5. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
6. [PySha3](https://pypi.python.org/pypi/pysha3)
```
$ pip3 install sha3
$ python3
>>> import sha3
>>> sha3.sha3_256(bytes(1)).hexdigest()
b'5d53469f20fef4f8eab52b88044ede69c77a6a68a60728609fc4a65ff531e7d0'

>>> sha3.sha3_256(bytes(2)).hexdigest()
b'762ba6a3d9312bf3e6dc71e74f34208e889fc44e6ff400724deecfeda7d5b3ce'
```
7. [Remix](https://ethereum.github.io/browser-solidity/)
`
pragma solidity ^0.4.15;

/**
 * @title Dapp Developer First Contract
 * Create and deploy a first smart contract.
 */
contract DappDeveloper {
    /**
     * Storage variables
     */
    string public name_;
    string public currentLocation_;
    
    /**
     * @dev Contract constructor
     * @param _name Your name.
     */
    function DappDeveloper(string _name) public {
      name_ = _name;
    }
    
    /**
     * @dev Set your current location.
     * @param _location Current location.
     */
    function setLocation(string _location) external {
      currentLocation_ = _location;
    }
}
`
