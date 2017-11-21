# DApp Fundamentals Project Submission

## 1.0 Github Account
If you have not already please create a github account.  Please do so at [github.com](https://github.com/).

## 2.0 Submit Your Project

*Replace USERNAME with your username below, the example below will use blockchainLG.*
1. Navigate to the [BLG/Projects](https://github.com/Blockchain-Learning-Group/projects) repo.
2. In the top right corner click on the fork icon. This should create your own copy of the repo.
3. Clone this new copy onto your machine.
```
git clone https://github.com/USERNAME/projects.git
```
- *Example output:*
```
adam@adam:~/Desktop/blg$ git clone https://github.com/blockchainLG/projects.git
Cloning into 'projects'...
remote: Counting objects: 58, done.
remote: Compressing objects: 100% (48/48), done.
remote: Total 58 (delta 4), reused 52 (delta 2), pack-reused 0
Unpacking objects: 100% (58/58), done.
Checking connectivity... done.
adam@adam:~/Desktop/blg$
```
4. Create a directory to submit your project and copy the contents of your project into the directory.

*This may be done with any file browser as well, below are linux commands to do so.*
```
mkdir projects/submissions/USERNAME
```
```
cp -a wallet-template/* projects/submissions/USERNAME/
```
5. Push your changes to your fork
```
git push
```
6. Navigate back to the [BLG/Projects](https://github.com/Blockchain-Learning-Group/projects) repo.
7. Select new pull request
8. Select compare across forks
9. Select your fork
10. Enter a pull request message and create the PR!  *Your project has been submitted and will be reviewed shortly.*
