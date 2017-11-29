# Local Parity Node Install
1. Download the parity software package.
- [Parity Home](https://parity.io/)
- Ubuntu Quick Start, Mac(potentially? Error experienced on OSX 10.11.6):
```
bash <(curl https://get.parity.io -L)
```
- [Mac Homebrew Install](https://github.com/paritytech/homebrew-paritytech/blob/master/README.md)
```
/usr/bin/ruby -e '$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)'
brew tap paritytech/paritytech
brew install parity --stable
```

2. Sync to the Kovan test net before the course begins.
```
parity --chain kovan --tracing off
```
- *Example output: [while syncing]*
```
adam@adam:~$ parity --chain kovan --tracing off
2017-11-14 15:29:49  Starting Parity/v1.8.0-beta-9882902-20171015/x86_64-linux-gnu/rustc1.20.0
[...]
2017-11-14 15:30:51  Syncing #4565495 586b…9203     0 blk/s    0 tx/s   0 Mgas/s      0+    0 Qed  #4565495    7/25 peers   79 KiB chain 15 KiB db 0 bytes queue 404 KiB sync  RPC:  0 conn,  6 req/s,  27 µs
[...]
```
- Will continue syncing up until latest block on Kovan: [Kovan Blocks](https://kovan.etherscan.io/blocks)
