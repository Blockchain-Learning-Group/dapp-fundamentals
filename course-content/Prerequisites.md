# Pre-requisites and Installs

# Course Resources
*Familiarity beforehand recommended*
1. Truffle Framework
2. TestRPC
3. Parity
4. Docker
5. ReactJS
6. Material UI
7. screen

# Machine Specs
0. 20GB Disk Space(Safe full node requirements) and 4GB of memory recommended.

# Text Editor
*Atom will be used through-out*
1. [Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/) and solidity plug-in [Etheratom](https://atom.io/packages/etheratom)

# Ethereum Client
1. [Partiy](https://parity.io/)
Download from here and sync beforehand if possible.
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

# Environment Setup - 3 options, follow ONLY 1
## 1. Recommended: Dockerized Dev Environment and Local Chrome
- A docker container has been configured with all development dependencies.
- All development will be conducted within the docker container's environment.
- Chrome will be installed on the local machine and run locally interacting with the application running inside the container.

1. Install Docker
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
- [MacOS](https://www.docker.com/docker-mac)
- [Windows](https://www.docker.com/docker-windows)
2. Pull the dapp-fundamentals Image
```
docker pull blockchainlg/dapp-dev-env
```
3. [Google Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB)
- Version > 55.0.0.  Check in browser bar: `chrome://version/`
4. [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- Create an account on Kovan and share your address via the BLG slack channel to receive some free ether!

*If you wish to run everything locally and are familiar with installing packages via package managers such as npm then the following may be for you.*

## 2. Local Machine
- All development dependencies will be installed on the local machine.
- All development will conducted within the local mahcine's environment.
- Chrome will be installed on the local machine and run locally interacting with the application running locally.

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

*If a late enough version of chrome cannot be installed and therefore metamask will not work proceed with dockerized chrome version.*

*NOTE still experimental!*

## 3. Dockerized Chrome Configuration
- All development dependencies configured within docker container.
- All development will conducted within the local mahcine's environment.
- Chrome will be run inside the docker container and all work shall live within its environment.

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

## FAQ
1. Truffle test error
```
Error: Don't set config.from directly. Instead, set config.networks and then config.networks[<network name>].from
```
Fix: Upgrade version of node to 8.7 and restart your terminal window
