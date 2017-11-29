# DApp Fundamentals Course Prerequisites

### Join our Slack Team: [Blockchain-Learning-Group](https://join.slack.com/t/blockchainlearning/shared_invite/enQtMjIyMzIyODMxMjE3LWM4MTA5YWUwNWI0YmMyMTI5OTY1ODhlYjU3NGJiYWYzYzliMDZlMzM4OGUyZjg0Njk0NzQ0NmI5NGYzZDJlNWY)
---
# Table of Contents
1. [Course Resources](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/general.md#10-course-resources)
2. [Machine Specs](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/general.md#20-machine-specs)
3. [Machine Setup](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/general.md#30-machine-setup)
4. [Ethereum Client](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/general.md#40-ethereum-client)
5. [Project Submission and Accreditation](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/general.md#50-project-submission-and-accreditation)

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
9. [Parity](https://parity.io/)
10. [Material UI](http://www.material-ui.com/)
11. [tmux cheatsheet](https://gist.github.com/MohamedAlaa/2961058), [manpage](http://manpages.ubuntu.com/manpages/zesty/man1/tmux.1.html)
---
# 2.0 Machine Specs
1. 4GB of memory and some disk space(10GB+) recommended.
2. Operating System: Ubuntu 16.04+ preferred, Mac and Windows OK(Mac preferred).
---
# 3.0 Machine Setup

*Participants are required to bring their own laptops.*

### 3.1 Text Editor

*Atom will be used through-out and thus is recommended but not required. A text editor with solidity support is advised however.*
1. Install the atom editor from: [Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/)
- Other options: [Available Solidity Integrations](http://solidity.readthedocs.io/en/latest/index.html#available-solidity-integrations)

2. Install atom's solidity plug-in [Etheratom](https://atom.io/packages/etheratom)
- Within atom along the top bar select Packages => Settings View => Manage Packages
- Select install in the left naviation bar and search for etheratom
- The correct package should have ~3k downloads
- Select install

### 3.2 Google Chrome
1. Install the Google Chrome browser from: [Google Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB)
- Version > 55.0.0.  Check in address bar: `chrome://version/`

*In the rare case where your machine is constrained to an older version of chrome and therefore metamask will not work, proceed with this dockerized chrome local environment setup: [local-dockerized-chrome-env](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/prerequisites/local-dockerized-chrome-env.md)*

### 3.3 Metamask
1. Install the chrome plugin, Metamask from: [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
2. Once installed, create an account on Kovan and share your address via the BLG slack channel to receive some free ether!

### 3.4 Development Dependencies

__Follow ONLY 1 option below__

1. [__[Recommended]__ Local Dockerized Environment](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/prerequisites/local-docker-env.md)

*Note all examples and video tutorials will utilize this environment.*
  - Development will be conducted within a docker container(virtual environment) booted from a BLG provided image.
  - Chrome will be installed on the local machine and will interact with the application running inside the container.

2. [Local Environment](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/prerequisites/local-env.md)

*If you wish to run everything locally and are familiar with installing packages via package managers such as npm and apt-get then the following may be for you. Note that all course examples and video tutorials will NOT utilize this environment.*
- All development dependencies will be installed on the local machine.
- All development will conducted within the local machine's environment.
- Chrome will be installed on the local machine and will interact with the application running locally.
---
# 4.0 Ethereum Client

*BLG hosts a Kovan node that participants may interact with. Details to connect will follow via a secure channel. Note examples and video tutorials will make use of the remote node.*

- However, if you do wish to run a full ethereum node locally, NOT required, the steps to do so are here: [parity-local-install](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/prerequisites/parity-local-install.md)
---
# 5.0 Project Submission and Accreditation
- In order to submit your final project and have it accredited you must create a github account.  Please do so at [github.com](https://github.com/).
- Submission process details to follow.
