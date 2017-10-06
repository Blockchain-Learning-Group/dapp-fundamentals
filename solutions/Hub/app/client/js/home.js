/*
 Blockchain Learning Group's Community Hub Template.
 Client side interface.  Primarily listening for events in order to update the
 interface in near real-time.  All data loaded intially server side.
 */
// TODO Update with current token address and compile json data
const tokenAddress = '0xc6cccf463b30d8f79159435edccb348dcec5023c'
// Copy the contents of ../build/contracts/Token.json
const tokenJson = {
  "contract_name": "Token",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowed_",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_hub",
          "type": "address"
        }
      ],
      "name": "setHub",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply_",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances_",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "hub_",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner_",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "totalSupply",
          "type": "uint256"
        }
      ],
      "name": "LogTokensMinted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "errorString",
          "type": "string"
        }
      ],
      "name": "LogErrorString",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x6060604052341561000f57600080fd5b5b60038054600160a060020a03191633600160a060020a03161790555b5b610f1d8061003c6000396000f300606060405236156100ca5763ffffffff60e060020a60003504166306fdde0381146100cf578063095ea7b31461015a57806318160ddd1461019057806323b872dd146101b55780632839e16a146101f1578063313ce5671461022857806331962cdc1461024d578063324536eb1461028057806340c10f19146102a55780636ca34ea2146102db57806370a082311461030c5780638ed5520c1461033d57806395d89b411461036c578063a9059cbb146103f7578063dd62ed3e1461042d578063e766307914610464575b600080fd5b34156100da57600080fd5b6100e2610493565b60405160208082528190810183818151815260200191508051906020019080838360005b8381101561011f5780820151818401525b602001610106565b50505050905090810190601f16801561014c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016557600080fd5b61017c600160a060020a03600435166024356104e2565b604051901515815260200160405180910390f35b341561019b57600080fd5b6101a361063b565b60405190815260200160405180910390f35b34156101c057600080fd5b61017c600160a060020a0360043581169060243516604435610642565b604051901515815260200160405180910390f35b34156101fc57600080fd5b6101a3600160a060020a03600435811690602435166108d6565b60405190815260200160405180910390f35b341561023357600080fd5b6101a36108f3565b60405190815260200160405180910390f35b341561025857600080fd5b61017c600160a060020a03600435166108f8565b604051901515815260200160405180910390f35b341561028b57600080fd5b6101a3610a02565b60405190815260200160405180910390f35b34156102b057600080fd5b61017c600160a060020a0360043516602435610a08565b604051901515815260200160405180910390f35b34156102e657600080fd5b6101a3600160a060020a0360043516610c53565b60405190815260200160405180910390f35b341561031757600080fd5b6101a3600160a060020a0360043516610c65565b60405190815260200160405180910390f35b341561034857600080fd5b610350610c84565b604051600160a060020a03909116815260200160405180910390f35b341561037757600080fd5b6100e2610c93565b60405160208082528190810183818151815260200191508051906020019080838360005b8381101561011f5780820151818401525b602001610106565b50505050905090810190601f16801561014c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561040257600080fd5b61017c600160a060020a0360043516602435610cb3565b604051901515815260200160405180910390f35b341561043857600080fd5b6101a3600160a060020a0360043581169060243516610de4565b60405190815260200160405180910390f35b341561046f57600080fd5b610350610ded565b604051600160a060020a03909116815260200160405180910390f35b606060405190810160405280602981526020017f426c6f636b636861696e204c6561726e696e672047726f757020436f6d6d756e815260200160b960020a6834ba3c902a37b5b2b70281525081565b600080821161054c57610545606060405190810160405280602f81526020017f43616e206e6f7420617070726f766520616e20616d6f756e74203c3d20302c208152602001608860020a6e546f6b656e2e617070726f7665282902815250610dfc565b9050610635565b600160a060020a0333166000908152600160205260409020548211156105d557610545606060405190810160405280603781526020017f416d6f756e742069732067726561746572207468616e2073656e6465727320628152602001604860020a76616c616e63652c20546f6b656e2e617070726f7665282902815250610dfc565b9050610635565b600160a060020a0333811660009081526002602090815260408083209387168352929052205461060b908363ffffffff610ea016565b600160a060020a033381166000908152600260209081526040808320938816835292905220555060015b92915050565b6000545b90565b60008082116106ae576106a7606060405190810160405280603181526020017f43616e6e6f74207472616e7366657220616d6f756e74203c3d20302c20546f6b8152602001607860020a70656e2e7472616e7366657246726f6d282902815250610dfc565b90506108cf565b600160a060020a03841660009081526001602052604090205482111561073a576106a7606060405190810160405280603e81526020017f46726f6d206163636f756e742068617320616e20696e73756666696369656e7481526020017f2062616c616e63652c20546f6b656e2e7472616e7366657246726f6d28290000815250610dfc565b90506108cf565b600160a060020a03808516600090815260026020908152604080832033909416835292905220548211156107d4576106a7606060405190810160405280603b81526020017f6d73672e73656e6465722068617320696e73756666696369656e7420616c6c6f81526020017f77616e63652c20546f6b656e2e7472616e7366657246726f6d28290000000000815250610dfc565b90506108cf565b600160a060020a0384166000908152600160205260409020546107fd908363ffffffff610eba16565b600160a060020a038086166000908152600160205260408082209390935590851681522054610832908363ffffffff610ea016565b600160a060020a0380851660009081526001602090815260408083209490945587831682526002815283822033909316825291909152205461087a908363ffffffff610eba16565b600160a060020a0380861660008181526002602090815260408083203386168452909152908190209390935590851691600080516020610ed28339815191529085905190815260200160405180910390a35060015b9392505050565b600260209081526000928352604080842090915290825290205481565b601281565b60035460009033600160a060020a039081169116146109665761095f606060405190810160405280602381526020017f6d73672e73656e64657220213d206f776e65722c20546f6b656e2e7365744875815260200160e860020a6262282902815250610dfc565b90506109fd565b600160a060020a03821615156109de5761095f606060405190810160405280603681526020017f496e76616c69642068756220616464726573732c20687562203d3d20616464728152602001605060020a756573732830292c20546f6b656e2e736574487562282902815250610dfc565b90506109fd565b5060048054600160a060020a031916600160a060020a03831617905560015b919050565b60005481565b60035460009033600160a060020a03908116911614801590610a39575060045433600160a060020a03908116911614155b15610a9157610545606060405190810160405280602181526020017f6d73672e73656e64657220213d206f776e65722c20546f6b656e2e6d696e7428815260200160f860020a602902815250610dfc565b9050610635565b60008211610af457610545606060405190810160405280602981526020017f43616e6e6f74206d696e7420612076616c7565206f66203c3d20302c20546f6b815260200160b860020a68656e2e6d696e74282902815250610dfc565b9050610635565b600160a060020a0383161515610b6457610545606060405190810160405280602e81526020017f43616e6e6f74206d696e7420746f6b656e7320746f20616464726573732830298152602001609060020a6d2c20546f6b656e2e6d696e74282902815250610dfc565b9050610635565b600054610b77908363ffffffff610ea016565b6000908155600160a060020a038416815260016020526040902054610ba2908363ffffffff610ea016565b600160a060020a038416600081815260016020526040808220939093555490917f6d69c71ef35e507286bcb03186fe9ebdbf14f6e096ce22d6564de19afd7922b7918691869190518084600160a060020a0316600160a060020a03168152602001838152602001828152602001935050505060405180910390a2600160a060020a0383166000600080516020610ed28339815191528460405190815260200160405180910390a35060015b92915050565b60016020526000908152604090205481565b600160a060020a0381166000908152600160205260409020545b919050565b600454600160a060020a031681565b604080519081016040526003815260e860020a62424c4702602082015281565b600160a060020a03331660009081526001602052604081205482901015610d3657610545606060405190810160405280603081526020017f53656e6465722062616c616e636520697320696e73756666696369656e742c208152602001608060020a6f546f6b656e2e7472616e73666572282902815250610dfc565b9050610635565b600160a060020a033316600090815260016020526040902054610d5f908363ffffffff610eba16565b600160a060020a033381166000908152600160205260408082209390935590851681522054610d94908363ffffffff610ea016565b600160a060020a038085166000818152600160205260409081902093909355913390911690600080516020610ed28339815191529085905190815260200160405180910390a35060015b92915050565b60005b92915050565b600354600160a060020a031681565b60007f551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a78260405160208082528190810183818151815260200191508051906020019080838360005b83811015610e5d5780820151818401525b602001610e44565b50505050905090810190601f168015610e8a5780820380516001836020036101000a031916815260200191505b509250505060405180910390a15060005b919050565b600082820183811015610eaf57fe5b8091505b5092915050565b600082821115610ec657fe5b508082035b929150505600ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa165627a7a723058208350f78a55b62bf8060b024642826dd0ca030cb9597a720f4551d2c916f5422d0029",
  "networks": {
    "1506795970249": {
      "events": {
        "0x6d69c71ef35e507286bcb03186fe9ebdbf14f6e096ce22d6564de19afd7922b7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "totalSupply",
              "type": "uint256"
            }
          ],
          "name": "LogTokensMinted",
          "type": "event"
        },
        "0x551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "errorString",
              "type": "string"
            }
          ],
          "name": "LogErrorString",
          "type": "event"
        },
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "_spender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x041492691706522b88254c0e8a62e0fbe33c1c32",
      "updated_at": 1506811314824
    },
    "1506863899153": {
      "events": {
        "0x6d69c71ef35e507286bcb03186fe9ebdbf14f6e096ce22d6564de19afd7922b7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "totalSupply",
              "type": "uint256"
            }
          ],
          "name": "LogTokensMinted",
          "type": "event"
        },
        "0x551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "errorString",
              "type": "string"
            }
          ],
          "name": "LogErrorString",
          "type": "event"
        },
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "_spender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x8129713ed6ae5b27b2c2b86e73ed05733174f4e2",
      "updated_at": 1506866957393
    },
    "1506873828310": {
      "events": {
        "0x6d69c71ef35e507286bcb03186fe9ebdbf14f6e096ce22d6564de19afd7922b7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "value",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "totalSupply",
              "type": "uint256"
            }
          ],
          "name": "LogTokensMinted",
          "type": "event"
        },
        "0x551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "errorString",
              "type": "string"
            }
          ],
          "name": "LogErrorString",
          "type": "event"
        },
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "_spender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xb9f143d4dddb4098a3110aca0685e3e8874b00f2",
      "updated_at": 1506873835180
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1506873835180
}

const hubAddress = '0xfa1ecb0f9ddec53cb43de9f84af577e55a1fc8b8'
// Copy the contents of ../build/contracts/Hub.json
const hubJson = {
  "contract_name": "Hub",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "users_",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "resourceIds_",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "userData_",
      "outputs": [
        {
          "name": "userName_",
          "type": "string"
        },
        {
          "name": "position_",
          "type": "string"
        },
        {
          "name": "location_",
          "type": "string"
        },
        {
          "name": "state_",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "resources_",
      "outputs": [
        {
          "name": "url_",
          "type": "string"
        },
        {
          "name": "user_",
          "type": "address"
        },
        {
          "name": "reputation_",
          "type": "uint256"
        },
        {
          "name": "addedAt_",
          "type": "uint256"
        },
        {
          "name": "state_",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_resourceUrl",
          "type": "string"
        }
      ],
      "name": "addResource",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_userEOA",
          "type": "address"
        },
        {
          "name": "_userName",
          "type": "string"
        },
        {
          "name": "_position",
          "type": "string"
        },
        {
          "name": "_location",
          "type": "string"
        }
      ],
      "name": "addUser",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token_",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAllUsers",
      "outputs": [
        {
          "name": "",
          "type": "address[]"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner_",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_token",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "resourceUrl",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "LogResourceAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "user",
          "type": "address"
        }
      ],
      "name": "LogUserAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "errorString",
          "type": "string"
        }
      ],
      "name": "LogErrorString",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x6060604052341561000f57600080fd5b604051602080610f0b833981016040528080519150505b60018054600160a060020a03808416600160a060020a0319928316179092556000805433909316929091169190911790555b505b610ea2806100696000396000f3006060604052361561007d5763ffffffff60e060020a6000350416630cde7b7f81146100825780630e0056b2146100b457806339fe50d4146100dc5780637f031c7d146102915780638a15309b14610370578063c6361c22146103a2578063d56805e1146103f9578063e2842d7914610428578063e76630791461048f575b600080fd5b341561008d57600080fd5b6100986004356104be565b604051600160a060020a03909116815260200160405180910390f35b34156100bf57600080fd5b6100ca6004356104f0565b60405190815260200160405180910390f35b34156100e757600080fd5b6100fb600160a060020a0360043516610513565b6040518080602001806020018060200185600381111561011757fe5b60ff168152602085820381018552895460026001821615610100026000190190911604908201819052604090910190899080156101955780601f1061016a57610100808354040283529160200191610195565b820191906000526020600020905b81548152906001019060200180831161017857829003601f168201915b50508481038352875460026000196101006001841615020190911604808252602090910190889080156102095780601f106101de57610100808354040283529160200191610209565b820191906000526020600020905b8154815290600101906020018083116101ec57829003601f168201915b505084810382528654600260001961010060018416150201909116048082526020909101908790801561027d5780601f106102525761010080835404028352916020019161027d565b820191906000526020600020905b81548152906001019060200180831161026057829003601f168201915b505097505050505050505060405180910390f35b341561029c57600080fd5b6102a7600435610536565b604051808060200186600160a060020a0316600160a060020a031681526020018581526020018481526020018360038111156102df57fe5b60ff1681526020838203810183528854600260018216156101000260001901909116049082018190526040909101908890801561035d5780601f106103325761010080835404028352916020019161035d565b820191906000526020600020905b81548152906001019060200180831161034057829003601f168201915b5050965050505050505060405180910390f35b341561037b57600080fd5b61038e600480356024810191013561056e565b604051901515815260200160405180910390f35b34156103ad57600080fd5b61038e60048035600160a060020a03169060248035808201929081013591604435808201929081013591606435908101910135610961565b604051901515815260200160405180910390f35b341561040457600080fd5b610098610c24565b604051600160a060020a03909116815260200160405180910390f35b341561043357600080fd5b61043b610c33565b60405160208082528190810183818151815260200191508051906020019060200280838360005b8381101561047b5780820151818401525b602001610462565b505050509050019250505060405180910390f35b341561049a57600080fd5b610098610c9c565b604051600160a060020a03909116815260200160405180910390f35b60048054829081106104cc57fe5b906000526020600020900160005b915054906101000a9004600160a060020a031681565b60028054829081106104fe57fe5b906000526020600020900160005b5054905081565b600560205260009081526040902060038101546001820190600283019060ff1684565b6003602081905260009182526040909120600181015460028201549282015460048301549293600160a060020a039092169260ff1685565b6000808060015b600160a060020a033316600090815260056020526040902060039081015460ff16908111156105a057fe5b146105fc576105f5606060405190810160405280602581526020017f55736572206973206e6f74206163746976652c204875622e6164645265736f75815260200160d860020a64726365282902815250610cab565b9250610959565b83151561065e576105f5606060405190810160405280602981526020017f496e766c61696420656d707479207265736f757263652c204875622e61646452815260200160b860020a6865736f75726365282902815250610cab565b9250610959565b848460405180838380828437820191505092505050604051908190039020915060005b60008381526003602081905260409091206004015460ff16908111156106a357fe5b14610704576105f5606060405190810160405280602a81526020017f5265736f7572636520616c7265616479206578697374732c204875622e616464815260200160b060020a695265736f75726365282902815250610cab565b9250610959565b600154600160a060020a03166340c10f19336103e860006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b151561076557600080fd5b6102c65a03f1151561077657600080fd5b50505060405180519150508015156107e2576105f5606060405190810160405280602881526020017f556e61626c6520746f206d696e7420746f6b656e732c204875622e6164645265815260200160c060020a67736f75726365282902815250610cab565b9250610959565b60028054600181016107f48382610d4f565b916000526020600020900160005b508390555060a06040519081016040528086868080601f0160208091040260200160405190810160405281815292919060208401838380828437505050928452505050600160a060020a03331660208201526000604082015243606082015260800160015b9052600083815260036020526040902081518190805161088b929160200190610d79565b506020820151600182018054600160a060020a031916600160a060020a03929092169190911790556040820151816002015560608201518160030155608082015160048201805460ff191660018360038111156108e457fe5b02179055509050507f413d05b8bb326cef7511810161c97e50e07475497cb0c04dc8b407faf7991ab833868643604051600160a060020a0385168152604081018290526060602082018181529082018490526080820185858082843782019150509550505050505060405180910390a1600192505b505092915050565b6000805433600160a060020a039081169116146109cc576109c5606060405190810160405280602281526020017f6d73672e73656e64657220213d206f776e65722c204875622e61646455736572815260200160f060020a61282902815250610cab565b9050610c19565b60005b600160a060020a038916600090815260056020526040902060039081015460ff16908111156109fa57fe5b14610a53576109c5606060405190810160405280602281526020017f5573657220616c7265616479206578697374732c204875622e61646455736572815260200160f060020a61282902815250610cab565b9050610c19565b6004805460018101610a658382610d4f565b916000526020600020900160005b8154600160a060020a03808d166101009390930a928302920219161790555060806040519081016040528088888080601f0160208091040260200160405190810160405281815292919060208401838380828437820191505050505050815260200186868080601f0160208091040260200160405190810160405281815292919060208401838380828437820191505050505050815260200184848080601f016020809104026020016040519081016040528181529291906020840183838082843750505092845250506020909101905060015b9052600160a060020a0389166000908152600560205260409020815181908051610b75929160200190610d79565b50602082015181600101908051610b90929160200190610d79565b50604082015181600201908051610bab929160200190610d79565b5060608201518160030160006101000a81548160ff02191690836003811115610bd057fe5b02179055509050507f187047b56eb20e7a0313254e37dc60b8c1a9d25707114d2caaaee420b2b7ec2388604051600160a060020a03909116815260200160405180910390a15060015b979650505050505050565b600154600160a060020a031681565b610c3b610e22565b6004805480602002602001604051908101604052809291908181526020018280548015610c9157602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610c73575b505050505090505b90565b600054600160a060020a031681565b60007f551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a78260405160208082528190810183818151815260200191508051906020019080838360005b83811015610d0c5780820151818401525b602001610cf3565b50505050905090810190601f168015610d395780820380516001836020036101000a031916815260200191505b509250505060405180910390a15060005b919050565b815481835581811511610d7357600083815260209020610d73918101908301610e34565b5b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610dba57805160ff1916838001178555610de7565b82800160010185558215610de7579182015b82811115610de7578251825591602001919060010190610dcc565b5b50610df4929150610e34565b5090565b815481835581811511610d7357600083815260209020610d73918101908301610e34565b5b505050565b60206040519081016040526000815290565b610c9991905b80821115610df45760008155600101610e3a565b5090565b90565b610c9991905b80821115610df45760008155600101610e3a565b5090565b905600a165627a7a723058202e8c2c362ad494c213adb3cef0d07e2abc3f4bdbbc08d3a2ffe684942e3b2a7e0029",
  "networks": {
    "1506795970249": {
      "links": {},
      "events": {
        "0x551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "errorString",
              "type": "string"
            }
          ],
          "name": "LogErrorString",
          "type": "event"
        }
      },
      "updated_at": 1506811314835
    },
    "1506863899153": {
      "links": {},
      "events": {
        "0x551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "errorString",
              "type": "string"
            }
          ],
          "name": "LogErrorString",
          "type": "event"
        },
        "0x413d05b8bb326cef7511810161c97e50e07475497cb0c04dc8b407faf7991ab8": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "resourceUrl",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "blockNumber",
              "type": "uint256"
            }
          ],
          "name": "LogResourceAdded",
          "type": "event"
        },
        "0x187047b56eb20e7a0313254e37dc60b8c1a9d25707114d2caaaee420b2b7ec23": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "user",
              "type": "address"
            }
          ],
          "name": "LogUserAdded",
          "type": "event"
        }
      },
      "updated_at": 1506866957376,
      "address": "0x8c392f283835e5236bb4e97753509138c2f11fd8"
    },
    "1506873828310": {
      "events": {
        "0x413d05b8bb326cef7511810161c97e50e07475497cb0c04dc8b407faf7991ab8": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "resourceUrl",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "blockNumber",
              "type": "uint256"
            }
          ],
          "name": "LogResourceAdded",
          "type": "event"
        },
        "0x187047b56eb20e7a0313254e37dc60b8c1a9d25707114d2caaaee420b2b7ec23": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "user",
              "type": "address"
            }
          ],
          "name": "LogUserAdded",
          "type": "event"
        },
        "0x551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a7": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "errorString",
              "type": "string"
            }
          ],
          "name": "LogErrorString",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x5d61309756460093947261d105e71c2f4b90220e",
      "updated_at": 1506879442397
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1506879442397
}

$(document).ready(() => {
  initializeApp()

  $('#addUser').click(e => {
    e.preventDefault()

    // Grab values from the form
    const address = $('#address').val()
    const name = $('#name').val()
    const position = $('#position').val()
    const location = $('#location').val()

    // Send the transaction
    addUser(address, name, position, location)
  })
})

/**
 * Add a new user to the hub.
 */
async function addUser(address, name, position, location) {
  const tx = await hub.addUser(address, name, position, location,
    {
      from: defaultAccount,
      gas: 4e6
    }
  )
  console.log('Tx Hash: ' + tx)
}

/**
 * Append a new user to the contributors tables.
 * @param  {Array} userData Array of user info
 */
function appendNewUser(userData) {
  $('#participantsTable').append(
    '<tr><td>'
    + userData[0] + '</td><td>' // name
    + userData[1] + '</td><td>' // position
    + userData[2] + '</td><td>' // location
    + userData[3]               // reputation
    + ' ' + symbol
    + '</td><</tr>'
  )
}

/**
 * Initialize the app, loading data primarily.
 */
async function initializeApp() {
  await initEtherConnection()

  if (tokenAddress !== 'TODO') {
    // Init the token contract reference object, require contract abi and address
    window.token = await web3.eth.contract(tokenJson.abi).at(tokenAddress)

    // Set the total supply and symbol
    window.totalSupply = (await token.totalSupply()).toNumber()
    window.symbol = (await token.symbol()).valueOf()
    $('#totalSupply').text('Total Supply: ' + totalSupply + ' ' + symbol)

    // Create a reference to the Hub
    window.hub = await web3.eth.contract(hubJson.abi).at(hubAddress)

    // Load all users and events
    loadUsers()
    loadEvents()

    /*
    Contract Listeners
     */

    // Listen for tokens being minted
    // Listen starting from now, 'latest'.
    token.LogTokensMinted({ fromBlock: 'latest', toBlock: 'latest'})
    .watch((error, result) => {
      if (error) {
        console.error(error)

      } else {
        console.log(result)
        // Update the total supply
        totalSupply += result.args.value.toNumber()
        $('#totalSupply').text('Total Supply: ' + totalSupply + ' ' + symbol)
      }
    })

    // Listen for tokens being minted
    // Listen starting from now, 'latest'.
    hub.LogUserAdded({ fromBlock: 'latest', toBlock: 'latest'})
    .watch(async (error, result) => {
      if (error) {
        console.error(error)

      } else {
        console.log(result)
        // Get all of the associated data for this user
        const userData = await hub.userData_(result.args.user)
        userData[3] = 0 // Reputation / holdings default to 0 tokens
        // Append to the table
        appendNewUser(userData)
      }
    })

    // Listen for all Events for both token and hub
    token.allEvents({ fromBlock: 'latest', toBlock: 'latest'})
    .watch((error, result) => {
      updateNewsFeed(result)
    })

    hub.allEvents({ fromBlock: 'latest', toBlock: 'latest'})
    .watch((error, result) => {
      updateNewsFeed(result)
    })

  } else {
    console.error('Please deploy your token and update the tokenAddress at home.js#L14')
  }
}

/**
 * Initialize the connection to a local ether client.
 */
async function initEtherConnection() {
  window.web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545')
  )

  window.defaultAccount = web3.eth.accounts[0]

  // Quick check that web3 connection successful
  console.log('web3 Connected? ' + web3.isConnected())
  console.log('Default Account: ' + defaultAccount)
}

/**
 * Load all past events for both hub and token.
 */
function loadEvents() {
  token.allEvents({}, { fromBlock: 'latest', toBlock: 'latest'})
  .get((error, logs) => {
    for (let i = 0; i < logs; i++) {
      updateNewsFeed(logs[i])
    }
  })

  hub.allEvents({}, { fromBlock: 'latest', toBlock: 'latest'})
  .get((error, logs) => {
    for (let i = 0; i < logs; i++) {
      updateNewsFeed(logs[i])
    }
  })
}

/**
 * Load all users within the hub.
 */
async function loadUsers() {
  // retrieve all user addresses, utilized as ids
  const users = await hub.getAllUsers()
  let userData
  let balance

  for (let i = 0; i < users.length; i++) {
    // Get each user's data and append
    userData = await hub.userData_(users[i])
    // Retrieve the user's balance from the token
    userData[3] = (await token.balanceOf(users[i])).toNumber()
    appendNewUser(userData)
  }
}

/**
 * Prepend a new item to the newsfeed table
 * @param  {Object} data The event log object.
 */
async function updateNewsFeed(data) {
  let _event = data['event']

  // Parse out the log prefix
  if (_event.includes('Log'))
    _event = data['event'].replace('Log', '')

  let img
  let args

  let userData

  // Define event specific attributes(img, arguments) and prepend
  if (_event === 'UserAdded') {
    img = '<img class="d-flex mr-3 rounded-circle" src="img/userAdded.png" height="55" width="55">'
    userData = await hub.userData_(data.args.user)
    args = 'Name: ' + userData[0] + '</br>Position: ' + userData[1] + '</br>Location: ' + userData[2]

  } else if (_event === 'ResourceAdded') {
    img = '<img class="d-flex mr-3 rounded-circle" src="img/resourceAdded.png" height="55" width="55">'
    userData = await hub.userData_(data.args.user)
    args = data.args.resourceUrl + '</br> Added by: ' + userData[0]

  } else if (_event === 'TokensMinted') {
    img = '<img class="d-flex mr-3 rounded-circle" src="img/tokensMinted.png" height="55" width="55">'
    userData = await hub.userData_(data.args.to)
    args = '1 BLG token minted!' + '</br> To: ' + userData[0]

  } else if (_event === 'ErrorString') {
    _event = _event.replace('String', '')
    img = '<img class="d-flex mr-3 rounded-circle" src="img/error.png" height="55" width="55">'
    args = '' + data.args.errorString

  } else {
    _event = _event.replace('String', '')
    img = ''
    args = '' + JSON.stringify(data.args)
  }

  // Finally prepend the div to the table
  $('#newsFeed').prepend(
    '<a href="#" class="list-group-item list-group-item-action">'
      +'<div class="media">'
        + img
        +'<div class="media-body">'
          +'<strong>'+ data['event'].replace('Log', '') +'</strong></br>'
          + args
          +'<div class="text-muted smaller">Transaction: '+ data['transactionHash'].slice(0, 20) +'...</div>'
          +'<div class="text-muted smaller">Mined at block: '+ data['blockNumber'] +'</div>'
        +'</div>'
      +'</div>'
    +'</a>'
  )
}
