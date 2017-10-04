import ipfsapi


def deploy_verification_ui():
    """
    Script to deploy the latest web page
    Deploy the frontEnd folder
    """
    UI_PATH = '../app/client/'
    ipfs_api = ipfsapi.connect('https://ipfs.infura.io', 5001)
    website_hash = ipfs_api.add(UI_PATH)[-1]['Hash']

    return website_hash

if __name__ == '__main__':
    new_hash = deploy_verification_ui()
    landing_page = 'home.html'
    
    print('\n\n' + '*'*34)
    print('* Success, App deployed to IPFS! *')
    print('*'*34)

    print('\n\n' + '*'*94)
    print('* Naviagte to: https://ipfs.io/ipfs/' + new_hash + '/' + landing_page + ' *')
    print('*'*94)
