# Local Development Environment
- All development dependencies will be installed on the local machine.
- All development will conducted within the local machine's environment.
- Chrome will be installed on the local machine and will interact with the application running locally.

# Setup Guide
1. Python 3.5
2. Node and npm
- Node.js version 8.7.0
- npm version 5.4.2
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)
Ensure build-essential apt package installed as well.
- symlink nodejs => node
```
$ sudo ln -s "$(which nodejs)" /usr/bin/node
```
  - Note default install on ubuntu is likely << 8.0.0 so be sure to install node @ 8.7.0
- [Mac](http://yoember.com/nodejs/the-best-way-to-install-node-js/)
- macOS ensure you have the XCode command line tools installed.
- Use the official Node.js packages, do not use the package supplied by your distribution.

3. [Truffle](http://truffleframework.com/)
```
npm install -g truffle@3.4.11
```

4. [testrpc](https://github.com/ethereumjs/testrpc)
```
npm install -g ethereumjs-testrpc@4.1.3
```

5. [PySha3](https://pypi.python.org/pypi/pysha3)
```
pip3 install pysha3==1.0.2
```
