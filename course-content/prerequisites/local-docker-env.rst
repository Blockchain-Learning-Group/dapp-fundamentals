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

1.1 Ubuntu Installation
***********************

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

1.2 Mac Installation
***********************

.. important::
  `Mac Installation Instructions <https://www.docker.com/docker-mac>`_

  **Quick Start**

  - Download Docker from: `https://store.docker.com/editions/community/docker-ce-desktop-mac <https://store.docker.com/editions/community/docker-ce-desktop-mac>`_
  - Double-click Docker.dmg to start the install process.
  - Double-click the application to run it
  - Check to see if it works by running ``docker version``, confirm you have the latest release installed.

1.3 Windows Installation
------------------------

.. attention::
  Be sure to follow the correct instructions for you exact OS version!
  Windows 10 Home requires a different nstallation process versus Windows 10 Pro for example.
  64-bit operating system running Windows 7+ required, if you do not meet this specification please contact BLG asap to provide an environment.

.. important::
  First confirm exactly which OS version you are running.
    - Process to check OS for 7, 8 and 10 `here <https://support.microsoft.com/en-ca/help/13443/windows-which-operating-system>`_

  - Check which OS version you are running, ``ver``

  .. code-block:: console

    C:\Users\adamj>ver
    Microsoft Windows [Version 10.0.15063]
    C:\Users\adamj>

  **Please follow the OS specific instructions below but for refererence the complete docker for Windows install instructions can be found here:** `Complete Windows Installation Instructions <https://www.docker.com/docker-windows>`_

.. important::
  **Windows 7+ Home(8, 10)**

  - Install docker toolbox: `DockerToolbox.exe <https://download.docker.com/win/stable/DockerToolbox.exe>`_
  - Ensure virtualization is enabled on your machine, `Process to check <https://docs.docker.com/toolbox/toolbox_install_windows/#step-1-check-your-version>`_

    - If it is disabled, check with the manufacturer to define the exact process, example below.
    - Process on HP pavilion: `Solution <https://h30434.www3.hp.com/t5/Desktop-Hardware-and-Upgrade-Questions/How-to-Enable-Intel-Virtualization-Technology-vt-x-on-HP/td-p/3198063>`_
    - Boot into bios: restart and rapidly tap esc
    - Select BIOS setup
    - Under system configuration
    - Select virtualization
    - Toggle to Enabled
    - Hit F10 to save and exit
    - If you have a previous version of VirtualBox installed, do not reinstall it with the Docker Toolbox installer. When prompted, uncheck it. If you have Virtual Box running, you must shut it down before running the installer.

  .. warning::
      Virtualization must be enabled to continue!

  - Once downloaded Double click the downloaded .exe file
  - Select next through all defaults and finally install
  - Once installation completes...
  - Forward the ports of the virtual machine to the host: `(Further Reference) <https://stackoverflow.com/questions/36286305/how-do-i-forward-a-docker-machine-port-to-my-host-port-on-osx>`_
  - Open virtualbox manager, icon on desktop
  - Select the `default` vm, created for docker-machine
  - ``Open Settings -> Network -> Advanced -> Port Forward``
  - Forward 3000 and 8545 from VM to host:

  ========  =========  =========  ========  ==========
  Protocol  Host IP    Host Port  Guest IP  Guest Port
  ========  =========  =========  ========  ==========
  TCP       127.0.0.1  3000                 3000
  TCP       127.0.0.1  8545                 8545
  ========  =========  =========  ========  ==========

  - Select ok
  - Find the Docker QuickStart Terminal icon, also on your desktop
  - Double click to run it
  - May take a few minutes to complete
  - Resulting with a docker enabled shell for your use.  Note it is this shell that you are now required to use to interact with docker. All linux commands may be executed within as well and you are required to follow the `Docker Machine` commands in the subsequent documentation.

  .. code-block:: console

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

.. important::
  **Windows 10 Professional or Enterprise 64-bit with Hyper-V Available**

  - Download from: `https://store.docker.com/editions/community/docker-ce-desktop-windows <https://store.docker.com/editions/community/docker-ce-desktop-windows>`_
  - Follow the few install steps and you will be required to log out
  - Upon login docker should start automatically
  - Within a command prompt simply enter: ``docker version`` to confirm docker has been installed correctly.
  - Follow the steps `here <https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c>`_ to share your C drive with docker.

2. Pull the Dev Environment Image
=================================

.. code-block:: bash

  docker pull blockchainlg/dapp-dev-env

- *Example output: [may take a few minutes]*

.. code-block:: console

  adam@adam:~$ docker pull blockchainlg/dapp-dev-env
  Using default tag: latest
  [...]
  27dbc59e6374: Pull complete
  Digest: sha256:dd092aac455c2c3fccf017c26fe14c40a13a2bbdf69cf67d1bd0adf66a708ec4
  Status: Downloaded newer image for blockchainlg/dapp-dev-env:latest
  adam@adam:~$

- Run the container to confirm install and image working correctly

.. code-block:: bash

  docker run -dit --name=blg-env blockchainlg/dapp-dev-env

- *Example output:*

.. code-block:: console

  adam@adam:~$ docker run -dit --name=blg-env blockchainlg/dapp-dev-env
  c404fde9605f3c27a927161c6d9c809cb3215e58ea33b25ae28acc7ad0cd32cd
  adam@adam:~$

- Confirm the container is running

.. code-block:: bash

  docker ps

- *Example output:*

.. code-block:: console

  adam@adam:~$ docker ps
  CONTAINER ID        IMAGE                       COMMAND             CREATED              STATUS              PORTS               NAMES
  c404fde9605f        blockchainlg/dapp-dev-env   "node"              About a minute ago   Up About a minute                       blg-env
  adam@adam:~$

- Stop and remove the container for now

.. code-block:: bash

  docker stop blg-env && docker rm blg-env

- *Example output:*

.. code-block:: console

  adam@adam:~$ docker stop blg-env && docker rm blg-env
  blg-env
  blg-env
  adam@adam:~$
