# DApp Fundamentals Course Pre-requisites

### Join our Slack Team: [Blockchain-Learning-Group](https://join.slack.com/t/blockchainlearning/shared_invite/enQtMjIyMzIyODMxMjE3LWM4MTA5YWUwNWI0YmMyMTI5OTY1ODhlYjU3NGJiYWYzYzliMDZlMzM4OGUyZjg0Njk0NzQ0NmI5NGYzZDJlNWY)
---
# Course Resources

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
10. [Material UI](https://reactjs.org/)
11. [screen](https://www.tecmint.com/screen-command-examples-to-manage-linux-terminals/)

---
# Machine Specs
1. 20GB Disk Space(Safe full node requirements) and 4GB of memory recommended.
---
# Text Editor

*Atom will be used through-out. Recommended but not required, a text editor with solidity support is advised however.*
1. [Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/) and solidity plug-in [Etheratom](https://atom.io/packages/etheratom)
---
# Ethereum Client
1. [Partiy](https://parity.io/)

Download and sync beforehand.
- Ubuntu / Mac(potentially? Error experienced on OSX 10.11.6):
```
bash <(curl https://get.parity.io -L)
```
- [Mac Homebrew Install](https://github.com/paritytech/homebrew-paritytech/blob/master/README.md)
```
/usr/bin/ruby -e '$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)'
brew tap paritytech/paritytech
brew install parity --stable
```
Sync your node to Kovan.
```
parity --chain kovan --tracing off --rpccorsdomain "*" ui
```
- *Example output: [while syncing]*
```
adam@adam:~$ parity --chain kovan --tracing off --rpccorsdomain '*'
2017-11-14 15:29:49  Starting Parity/v1.8.0-beta-9882902-20171015/x86_64-linux-gnu/rustc1.20.0
[...]
2017-11-14 15:30:51  Syncing #4565495 586b…9203     0 blk/s    0 tx/s   0 Mgas/s      0+    0 Qed  #4565495    7/25 peers   79 KiB chain 15 KiB db 0 bytes queue 404 KiB sync  RPC:  0 conn,  6 req/s,  27 µs
[...]
```
- Will continue syncing up until latest block on Kovan: [Kovan Blocks](https://kovan.etherscan.io/blocks)
---
# Environment Setup
## 3 Options - follow ONLY 1
1. [__[Recommended]__ Dockerized Dev Environment and Local Chrome](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/Prerequisites.md#1-recommended-dockerized-dev-environment-and-local-chrome)
  - A docker container has been configured with all development dependencies.
  - All development will be conducted within the docker container, virtual environment.
  - Chrome will be installed on the local machine and will interact with the application running inside the container.

2. [Local Machine](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/Prerequisites.md#2-local-machine)

*If you wish to run everything locally and are familiar with installing packages via package managers such as npm then the following may be for you.*
- All development dependencies will be installed on the local machine.
- All development will conducted within the local machine's environment.
- Chrome will be installed on the local machine and will interact with the application running locally.

3. [__[Not Recommended]__ Completely Dockerized - Dev and Chrome Configuration](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/Prerequisites.md#2-local-machine)

*In the rare case where your machine is constrained to an older version of chrome and therefore metamask will not work proceed with this dockerized chrome version.*
- All development dependencies configured within docker container.
- All development will conducted within the local mahcine's environment.
- Chrome will be run inside the docker container and all work shall live within its environment.
---
## 1. [Recommended] Dockerized Dev Environment and Local Chrome
1. Install Docker
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
- [MacOS](https://www.docker.com/docker-mac)
- [Windows](https://www.docker.com/docker-windows)
2. Pull the Dev Environment Image
```
docker pull blockchainlg/dapp-dev-env
```
- *Example output: [may take a few minutes]*
```
adam@adam:~$ docker pull blockchainlg/dapp-dev-env
Using default tag: latest
[...]
27dbc59e6374: Pull complete
Digest: sha256:dd092aac455c2c3fccf017c26fe14c40a13a2bbdf69cf67d1bd0adf66a708ec4
Status: Downloaded newer image for blockchainlg/dapp-dev-env:latest
adam@adam:~$
```
- Run the container to confirm install and image working correctly
```
docker run --name=blg-env blockchainlg/dapp-dev-env
```
- *Example output:*
```
adam@adam:~/Desktop/blg$ docker run --name=blg-env blockchainlg/dapp-dev-env
2017-11-14 21:11:35,916 CRIT Supervisor running as root (no user in config file)
2017-11-14 21:11:35,928 INFO RPC interface 'supervisor' initialized
2017-11-14 21:11:35,929 CRIT Server 'unix_http_server' running without any HTTP authentication checking
2017-11-14 21:11:35,929 INFO supervisord started with pid 1
```
- Kill the process, ctrl AND c: `ctrl+c`
- Remove the container for now
```
docker rm blg-env
```
- *Example output:*
```
adam@adam:~$ docker rm blg-env
blg-env
adam@adam:~$
```
3. [Google Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB)
- Version > 55.0.0.  Check in browser bar: `chrome://version/`
4. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- Create an account on Kovan and share your address via the BLG slack channel to receive some free ether!
---
## 2. Local Machine
1. [Google Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB)
- Version > 55.0.0.  Check in browser bar: `chrome://version/`
2. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- Create an account on Kovan and share your address via the BLG slack channel to receive some free ether!
3. Python 3+
4. Node and npm
- Node.js version 8.7.0
- npm version 5.4.2
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
Ensure build-essential apt package installed as well.
- symlink nodejs => node
```
$ sudo ln -s "$(which nodejs)" /usr/bin/node
```
  - Note default install on ubuntu is likely << 8.0.0 so be sure to install node @ 8.7.0
- [MacOS](http://yoember.com/nodejs/the-best-way-to-install-node-js/)
- macOS ensure you have the XCode command line tools installed.
- Use the official Node.js packages, do not use the package supplied by your distribution.
5. [Truffle](http://truffleframework.com/)
```
npm install -g truffle@3.4.11
```
6. [testrpc](https://github.com/ethereumjs/testrpc)
```
npm install -g ethereumjs-testrpc@4.1.3
```
7. [PySha3](https://pypi.python.org/pypi/pysha3)
```
pip3 install pysha3==1.0.2
```
---
## 3. [Not Recommended] Dockerized Chrome Configuration

*NOTE still experimental and not recommended!*
1. Install Docker
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
- [MacOS](https://www.docker.com/docker-mac)
- [Windows](https://www.docker.com/docker-windows)
2. Pull the Chrome Enabled Dapp Fundamentals Image
```
docker pull blockchainlg/dapp-dev-env-chrome
```
3. Run the container
```
docker run -d -p 5900:5900 -e VNC_SERVER_PASSWORD=password --name=blg-env --user apps --privileged blockchainlg/dapp-dev-env-chrome
```
4. Install a VNC Client
- Ubuntu: [RealVNC](https://www.realvnc.com/en/connect/download/viewer/linux/).
  - [Support AskUbuntu](https://askubuntu.com/questions/899072/vnc-viewer-not-installing-in-ubuntu)
- MacOS: [RealVNC](https://www.realvnc.com/en/connect/download/viewer/macos/)
- Windows: [RealVNC](https://www.realvnc.com/en/connect/download/viewer/windows/)

5. Open RealVNC and point the VNC client to 127.0.0.1
- Open up chrome: right-click on the desktop Application -> Network -> Web Browsing -> Google Chrome
- Install [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

6. Stop the container - do NOT remove it
```
$ docker stop blg-env
```
---
