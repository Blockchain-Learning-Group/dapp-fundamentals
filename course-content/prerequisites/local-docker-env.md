# Local Dockerized Development Environment [Recommended]
- A docker image has been configured with all development dependencies.
- All development will be conducted within a docker container(virtual environment) booted from the provided image.
- Chrome will be installed on the local machine and will interact with the application running inside the container.

# Setup Guide
1. Install Docker
- [Ubuntu Installation Instructions](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
  __Quick Start__
  ```
  sudo apt-get remove docker docker-engine docker.io

  sudo apt-get update

  sudo apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      software-properties-common

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

  sudo add-apt-repository \
     "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
     $(lsb_release -cs) \
     stable"

  sudo apt-get update

  sudo apt-get install docker-ce=17.09.0~ce-0~ubuntu
  ```
- [Mac Installation Instructions](https://www.docker.com/docker-mac)
  __Quick Start__
  - Download Docker from: [https://store.docker.com/editions/community/docker-ce-desktop-mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)
  - Double-click Docker.dmg to start the install process.
  - Double-click the application to run it
  - Check to see if it works by running `docker version`, confirm you have the latest release installed.

- [Windows Installation Instructions](https://www.docker.com/docker-windows)

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
docker run -dit --name=blg-env blockchainlg/dapp-dev-env
```
- *Example output:*
```
adam@adam:~$ docker run -dit --name=blg-env blockchainlg/dapp-dev-env
c404fde9605f3c27a927161c6d9c809cb3215e58ea33b25ae28acc7ad0cd32cd
adam@adam:~$
```
- Confirm the container is running
```
docker ps
```
- *Example output:*
```
adam@adam:~$ docker ps
CONTAINER ID        IMAGE                       COMMAND             CREATED              STATUS              PORTS               NAMES
c404fde9605f        blockchainlg/dapp-dev-env   "node"              About a minute ago   Up About a minute                       blg-env
adam@adam:~$
```
- Stop and remove the container for now
```
docker stop blg-env && docker rm blg-env
```
- *Example output:*
```
adam@adam:~$ docker stop blg-env && docker rm blg-env
blg-env
blg-env
adam@adam:~$
```
