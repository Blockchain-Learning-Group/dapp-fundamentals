# DApp Fundamentals Course Prerequisites

### Join our Slack Team: [Blockchain-Learning-Group](https://join.slack.com/t/blockchainlearning/shared_invite/enQtMjIyMzIyODMxMjE3LWM4MTA5YWUwNWI0YmMyMTI5OTY1ODhlYjU3NGJiYWYzYzliMDZlMzM4OGUyZjg0Njk0NzQ0NmI5NGYzZDJlNWY)
---
# 1.0 Course Resources

*Familiarity beforehand recommended, not required.*
1. [Docker](https://www.docker.com/)
2. [ReactJS](https://reactjs.org/)
3. [Truffle Framework](http://truffleframework.com/)
4. [Web3JS](https://github.com/ethereum/wiki/wiki/JavaScript-API)
5. [Solidity](https://solidity.readthedocs.io/en/develop/)
6. [Remix](https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.15+commit.bbb8e64f.js)
7. [Metamask](https://metamask.io/)
8. [TestRPC](https://github.com/ethereumjs/testrpc)
9. [Material UI](https://reactjs.org/)
10. [tmux cheatsheet](https://gist.github.com/MohamedAlaa/2961058), [manpage](http://manpages.ubuntu.com/manpages/zesty/man1/tmux.1.html)
---
# 2.0 Machine Specs
1. 4GB of memory recommended.
2. Operating System: Ubuntu 16.04+ preferred, Mac and Windows OK(Mac preferred).
---
# 3.0 Text Editor

*Atom will be used through-out. Recommended however a text editor with similar remote edit capabilities is required*
1. [Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/) and solidity plug-in [Etheratom](https://atom.io/packages/etheratom)
2. Install atom's [remote-edit](https://atom.io/packages/remote-edit) package.
- Within atom along the top bar select Packages => Settings View => Manage Packages
- Select install in the left naviation bar and search for remote-edit
- The correct package has ~170k downloads, Select install
- __[Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/raw/master/course-content/video-tutorials/atom-remote-edit.mp4)__
---
# 4.0 Network Requirements
- Open network able to reach [https://github.com/Blockchain-Learning-Group/dapp-fundamentals/](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/) as well as the blg provided node `52.235.45.14`

*Linux*
```
ssh user@52.235.45.14
```
- *Example output:*
```
adam@adam:~$ ssh user@52.235.45.14
user@52.235.45.14's password:
```
*Login credentials to be provided via a secure channel where applicable.*
---
# 5.0 Machine Setup
1. [Google Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB)
- Version > 55.0.0.  Check in browser bar: `chrome://version/`
2. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- Create an account on Kovan and share your address via the BLG slack channel to receive some free ether!

__Windows Users ONLY__
- Require an ssh client

[Download PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
---
# 6.0 Project Submission and Accreditation
In order to submit your final project and have it accredited you must create a github account.  Please do so at [github.com](https://github.com/).

# END Prerequisites
---
# Course Development Environment Setup

1. ssh into the blg provided node, credentials provided in a secure channel.
```
ssh user@52.235.45.14
```
- *Example output:*
```
adam@adam:~$ ssh user@52.235.45.14
adam@52.235.45.14's password:
[...]
user@parity-kovan-node-01:~$
```
2. Attach into your blg provided virtual environment

*Note a virtual environment has been provided for each user and the username should be the user's first and last names concatenated. The example with USERNAME == adamlemmon*
```
docker exec -it <USERNAME> bash
```
- *Example output:*
```
user@parity-kovan-node-01:~$ docker exec -it adamlemmon bash
root@2ff70d83badf:/blg/wallet-template#
```
3. Forward the ports of your local machine to the remote node.

- Find the ports to forward your machine to.
```
docker ps | grep <USERNAME>
```
- *Example output:*
```
user@parity-kovan-node-01:~$ docker ps | grep adamlemmon
2ff70d83badf blockchainlg/dapp-dev-env "node" 0.0.0.0:3001->3000/tcp, 0.0.0.0:8546->8545/tcp adamlemmon
```
- The correct ports are then: 3001 and 8546 taken from: 0.0.0.0:__3001__ and 0.0.0.0:__8546__
```
ssh -NL 3000:127.0.0.1:3001 -NL 8545:127.0.0.1:8546 user@52.235.45.14
```
- *Example output:*
```
adam@adam:~$ ssh -NL 3000:127.0.0.1:3001 -NL 8545:127.0.0.1:8546 user@52.235.45.14
user@52.235.45.14's password:

```
