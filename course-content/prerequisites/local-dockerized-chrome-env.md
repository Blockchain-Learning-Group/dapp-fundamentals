# Dockerized Chrome Work Station [Not Recommended]

*NOTE still experimental and not recommended!*
1. Install Docker
- [Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
- [Mac](https://www.docker.com/docker-mac)
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
