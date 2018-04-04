========================================
Course Prerequisites
========================================

Join our Slack Team: `Blockchain-Learning-Group <https://join.slack.com/t/blockchainlearning/shared_invite/enQtMjIyMzIyODMxMjE3LWM4MTA5YWUwNWI0YmMyMTI5OTY1ODhlYjU3NGJiYWYzYzliMDZlMzM4OGUyZjg0Njk0NzQ0NmI5NGYzZDJlNWY>`_

1.0 Course Resources
================================================

.. note::
  Familiarity beforehand recommended, not required.

1. `Docker <https://www.docker.com/>`_
2. `ReactJS <https://reactjs.org/>`_
3. `Truffle Framework <http://truffleframework.com/>`_
4. `Web3JS <https://github.com/ethereum/wiki/wiki/JavaScript-API>`_
5. `Solidity <https://solidity.readthedocs.io/en/develop/>`_
6. `Remix <https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.15+commit.bbb8e64f.js>`_
7. `Metamask <https://metamask.io/>`_
8. `TestRPC <https://github.com/ethereumjs/testrpc>`_
9. `Parity <https://parity.io/>`_
10. `Material UI <http://www.material-ui.com/>`_
11. `tmux cheatsheet <https://gist.github.com/MohamedAlaa/2961058>`_, `manpage <http://manpages.ubuntu.com/manpages/zesty/man1/tmux.1.html>`_

----

2.0 Machine Specs
=================
1. 4GB of memory and some disk space(10GB+) recommended.
2. Operating System: Ubuntu 16.04+ preferred, Mac and Windows OK(Mac preferred).

----

3.0 Machine Setup
=================

.. attention::
  Participants are required to bring their own laptops.

3.1 Text Editor
---------------

.. warning::
  Windows users may have problems installing Ethereatom for the Atom editor and therefore Sublime is advised.

**Sublime**

1. Install the Sublime text editor
  - Download the editor here: `https://www.sublimetext.com/3 <https://www.sublimetext.com/3>`_
  - Complete the installer steps

2. Install Sublime Package Control
  - Open the editor
  - ``ctrl+shift+p`` or ``cmd+shift+p`` (Mac)
  - Select install package control

3. Install the Ethereum package
  - ``ctrl+shift+p`` or ``cmd+shift+p`` (Mac)
  - Select install package
  - Search for and selct Ethereum

**Atom**

.. note::
  Atom will be used through-out and but not required. A text editor with solidity support is advised however.

1. Install the atom editor from: `Atom <https://flight-manual.atom.io/getting-started/sections/installing-atom/>`_
  - Other options: `Available Solidity Integrations <http://solidity.readthedocs.io/en/latest/index.html#available-solidity-integrations>`_

2. Install atom's solidity plug-in `Etheratom <https://atom.io/packages/etheratom>`_
  - Within atom along the top bar select ``Packages => Settings View => Manage Packages``
  - Select install in the left naviation bar and search for etheratom
  - The correct package should have ~3k downloads
  - Select install

.. attention::
  If an error is encountered when installing etheratom, as has been experienced on Windows 10, then please proceed to install Sublime above.

3.2 Google Chrome
------------------------------------------
1. Install the Google Chrome browser from: `Google Chrome <https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB>`_
  - Version > 55.0.0.  Check in address bar: ``chrome://version/``

3.3 Metamask
------------
1. Install the chrome plugin, Metamask from: `Metamask <https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en>`_
2. Once installed, create an account on Kovan and share your address via the BLG slack channel to receive some free ether!

.. attention::
  - The Kovan network has proven to be unreliable.
  - Please also navigate the the Rinkeby faucet here: `Rinkeby Crypto Faucet <https://www.rinkeby.io/#faucet>`_ to receive some ether of your own!

3.4 Video Player
----------------
- In order to view the video tutorials a sufficient multi-media player is required:

1. VLC
  - `Mac <https://www.videolan.org/vlc/download-macosx.html>`_
  - `Windows <https://www.videolan.org/vlc/download-windows.html>`_
  - `Linux <https://www.videolan.org/vlc/download-ubuntu.html>`_

3.5 Development Dependencies
----------------------------
1. Local Dockerized Environment
  - Follow the instructions here: `local-docker-env <http://blg-dapp-fundamentals.readthedocs.io/en/latest/course-content/prerequisites/local-docker-env.html>`_ to configure your environment

[Windows users ONLY]
------------------------------------------
1. Git client
  - Install git for windows `here <https://git-for-windows.github.io/>`_
  - And to enable usage within windows command prompt execute the following within a prompt: ``set PATH=%PATH%;"C:\Program Files\Git\cmd``
  - Confirm git is configured correctly simply run: ``git``

[MAC users ONLY]
------------------------------------------
1. Xcode
  - You can find Xcode in the App Store: `Xcode <https://itunes.apple.com/us/app/xcode/id497799835?mt=12>`_
