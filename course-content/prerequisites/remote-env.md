# Remote Development Environment
- All development will be conducted in an environment on a remote server configured and provided by BLG.
- The participant may simply tunnel into the machine and access their own personal environment.

# Setup Guide
## 1.0 Text Editor

*Atom will be used through-out. Recommended however a text editor with similar remote edit capabilities is required. The following assume atom has been installed as per the [general instructions.](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/blob/master/course-content/prerequisites/general.md#31-text-editor)*
1. Install atom's [remote-edit](https://atom.io/packages/remote-edit) package.
- __[Download Video Tutorial](https://github.com/Blockchain-Learning-Group/dapp-fundamentals/raw/master/course-content/video-tutorials/atom-remote-edit.mp4)__
- Within atom along the top bar select Packages => Settings View => Manage Packages
- Select install in the left naviation bar and search for remote-edit
- The correct packages should have ~170k
- Select install

## 2.0 [Windows Users ONLY] SSH Client
- Require an ssh client, download PuTTY from here: [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
---
# Development Environment Setup [Post Prerequisites]

*Will be lead by a blg instructor in class. NOT a prereq!*

1. ssh into the blg provided node, credentials provided in a secure channel.
```
ssh user@52.235.45.14
```
- *Example output:*
```
adam@adam:~$ ssh user@52.235.45.14
user@52.235.45.14's password:
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
