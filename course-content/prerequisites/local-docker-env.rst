==========================================
Local Dockerized Development Environment
==========================================
.. note::
  - A docker image has been configured with all development dependencies.
  - All development will be conducted within a docker container(virtual environment) booted from the provided image.
  - Chrome will be installed on the local machine and will interact with the application running inside the container.

Setup Guide
===========

1. Install Docker
-----------------

.. note::
  If running Ubuntu 17.10 please follow the instructions here: `17.10 QuickStart <https://gist.github.com/levsthings/0a49bfe20b25eeadd61ff0e204f50088>`_

.. important::
  `Ubuntu Installation Instructions <https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04>`_

  **Ubuntu Quick Start**

  .. code-block:: bash

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

.. note::
  If you wish to manage Docker as a `Non-root user` ie. `sudo` not required at the beginning of each command

  .. code-block:: bash

    sudo groupadd docker
    sudo usermod -aG docker $USER
    newgrp docker

`Mac Installation Instructions <https://www.docker.com/docker-mac>`_

  __Quick Start__
  - Download Docker from: [https://store.docker.com/editions/community/docker-ce-desktop-mac <https://store.docker.com/editions/community/docker-ce-desktop-mac)
  - Double-click Docker.dmg to start the install process.
  - Double-click the application to run it
  - Check to see if it works by running `docker version`, confirm you have the latest release installed.

`Windows Installation Instructions <https://www.docker.com/docker-windows>`_

__Quick Start__
- Check which OS version you are running, `ver`
C:\Users\adamj>ver
Microsoft Windows [Version 10.0.15063]
C:\Users\adamj>

__Windows 7+ Home(8, 10)__

*64-bit operating system running Windows 7+ required, if you do not meet this specification please contact BLG asap to provide an environment.*

- Install docker toolbox: [DockerToolbox.exe <https://download.docker.com/win/stable/DockerToolbox.exe)
- Ensure virtualization is enabled on your machine, [Process to check <https://docs.docker.com/toolbox/toolbox_install_windows/#step-1-check-your-version)
  - If it is disabled, check with the manufacturer to define the exact process, example below.
  - __Process on HP pavilion: [Solution <https://h30434.www3.hp.com/t5/Desktop-Hardware-and-Upgrade-Questions/How-to-Enable-Intel-Virtualization-Technology-vt-x-on-HP/td-p/3198063)__
  - Boot into bios: restart and rapidly tap esc
  - Select BIOS setup
  - Under system configuration
  - Select virtualization
  - Toggle to Enabled
  - Hit F10 to save and exit
  - If you have a previous version of VirtualBox installed, do not reinstall it with the Docker Toolbox installer. When prompted, uncheck it. If you have Virtual Box running, you must shut it down before running the installer.

__Virtualization must be enabled to continue!__
- Once downloaded Double click the downloaded .exe file
- Select next through all defaults and finally install
- Once installation completes...
- Forward the ports of the virtual machine to the host: [(Further Reference) <https://stackoverflow.com/questions/36286305/how-do-i-forward-a-docker-machine-port-to-my-host-port-on-osx)
- Open virtualbox manager, icon on desktop
- Select the `default` vm, created for docker-machine
- Open Settings -> Network -> Advanced -> Port Forward
- Forward 3000 and 8545 from VM to host:
  - Protocol    Host IP    Host Port    Guest IP    Guest Port
  - TCP         127.0.0.1  3000                     3000
  - TCP         127.0.0.1  8545                     8545
- Select ok
- Find the Docker QuickStart Terminal icon, also on your desktop
- Double click to run it
- May take a few minutes to complete
- Resulting with a docker enabled shell for your use.  Note it is this shell that you are now required to use to interact with docker. All linux commands may be executed within as well and you are required to follow the `Docker Machine` commands in the subsequent documentation.
                        ##         .
                  ## ## ##        ==
              ## ## ## ## ##    ===
          /"""""""""""""""""\___/ ===
    ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
        \______ o           __/
          \    \         __/
           \____\_______/

docker is configured to use the default machine with IP 192.168.99.100
For help getting started, check out the docs at https://docs.docker.com

Start interactive shell

adamj@DESKTOP-B2ADN05 MINGW64 ~
$

__Windows 10 Professional or Enterprise 64-bit with Hyper-V Available__
- Download from: [https://store.docker.com/editions/community/docker-ce-desktop-windows <https://store.docker.com/editions/community/docker-ce-desktop-windows)
- Follow the few install steps and you will be required to log out
- Upon login docker should start automatically
- Within a command prompt simply enter: `docker version` to confirm docker has been installed correctly.

- Follow the steps `here <https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c>`_ to share your C drive with docker.

2. Pull the Dev Environment Image
=================================
docker pull blockchainlg/dapp-dev-env
- *Example output: [may take a few minutes]*
adam@adam:~$ docker pull blockchainlg/dapp-dev-env
Using default tag: latest
[...]
27dbc59e6374: Pull complete
Digest: sha256:dd092aac455c2c3fccf017c26fe14c40a13a2bbdf69cf67d1bd0adf66a708ec4
Status: Downloaded newer image for blockchainlg/dapp-dev-env:latest
adam@adam:~$
- Run the container to confirm install and image working correctly
docker run -dit --name=blg-env blockchainlg/dapp-dev-env
- *Example output:*
adam@adam:~$ docker run -dit --name=blg-env blockchainlg/dapp-dev-env
c404fde9605f3c27a927161c6d9c809cb3215e58ea33b25ae28acc7ad0cd32cd
adam@adam:~$
- Confirm the container is running
docker ps
- *Example output:*
adam@adam:~$ docker ps
CONTAINER ID        IMAGE                       COMMAND             CREATED              STATUS              PORTS               NAMES
c404fde9605f        blockchainlg/dapp-dev-env   "node"              About a minute ago   Up About a minute                       blg-env
adam@adam:~$
- Stop and remove the container for now
docker stop blg-env && docker rm blg-env
- *Example output:*
adam@adam:~$ docker stop blg-env && docker rm blg-env
blg-env
blg-env
adam@adam:~$
