/*
 Initialize web3 instances of blg token, hub and exchange contracts.
 Load all relevant accounts, balances, orders.
 NOTE web3 globally available as linked in in home.html
 */

// Exchange, blgToken, hub contract data
const exchangeAddress = '0x9ec0d5ec757bc14699fd9e7ddf97dde405e7c1c5'
const exchangeJSON = {
  "contract_name": "Exchange",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_orderId",
          "type": "bytes32"
        }
      ],
      "name": "executeOrder",
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
      "name": "getOrderBookIds",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
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
      "name": "orderIds_",
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
          "type": "bytes32"
        }
      ],
      "name": "orderBook_",
      "outputs": [
        {
          "name": "maker",
          "type": "address"
        },
        {
          "name": "offerToken",
          "type": "address"
        },
        {
          "name": "offerAmount",
          "type": "uint256"
        },
        {
          "name": "wantToken",
          "type": "address"
        },
        {
          "name": "wantAmount",
          "type": "uint256"
        },
        {
          "name": "filled",
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
          "name": "_offerToken",
          "type": "address"
        },
        {
          "name": "_offerAmount",
          "type": "uint256"
        },
        {
          "name": "_wantToken",
          "type": "address"
        },
        {
          "name": "_wantAmount",
          "type": "uint256"
        }
      ],
      "name": "submitOrder",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": true,
      "type": "function"
    },
    {
      "payable": true,
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "offerToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "offerAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "wantToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "wantAmount",
          "type": "uint256"
        }
      ],
      "name": "logOrderSubmitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "taker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "offerToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "offerAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "wantToken",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "wantAmount",
          "type": "uint256"
        }
      ],
      "name": "logOrderExecuted",
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
  "unlinked_binary": "0x6060604052341561000f57600080fd5b5b610a598061001f6000396000f300606060405236156100515763ffffffff60e060020a600035041663049b76c481146100555780631be091301461007f5780633f5f18bc146100e6578063708a02c91461010e5780638c946c2614610169575b5b5b005b341561006057600080fd5b61006b60043561019e565b604051901515815260200160405180910390f35b341561008a57600080fd5b610092610473565b60405160208082528190810183818151815260200191508051906020019060200280838360005b838110156100d25780820151818401525b6020016100b9565b505050509050019250505060405180910390f35b34156100f157600080fd5b6100fc6004356104d3565b60405190815260200160405180910390f35b341561011957600080fd5b6101246004356104f6565b604051600160a060020a0396871681529486166020860152604080860194909452919094166060840152608083019390935291151560a082015260c001905180910390f35b61006b600160a060020a03600435811690602435906044351660643561053d565b604051901515815260200160405180910390f35b60006101a861099b565b600083815260208190526040908190209060c0905190810160409081528254600160a060020a039081168352600184015481166020840190815260028501549284019290925260038401541660608301526004830154608083015260059092015460ff16151560a0820152915060009051600160a060020a031614156102f35733600160a060020a03166108fc82604001519081150290604051600060405180830381858888f19350505050151561025f57600080fd5b8060600151600160a060020a03166323b872dd338351846080015160006040516020015260405160e060020a63ffffffff8616028152600160a060020a0393841660048201529190921660248201526044810191909152606401602060405180830381600087803b15156102d257600080fd5b6102c65a03f115156102e357600080fd5b50505060405180519050506103d0565b60006060820151600160a060020a031614156103d0578051600160a060020a03166108fc82608001519081150290604051600060405180830381858888f19350505050151561034157600080fd5b8060200151600160a060020a03166323b872dd825133846040015160006040516020015260405160e060020a63ffffffff8616028152600160a060020a0393841660048201529190921660248201526044810191909152606401602060405180830381600087803b15156103b457600080fd5b6102c65a03f115156103c557600080fd5b505050604051805150505b5b6000838152602081905260409020600501805460ff191660011790557f9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a38151338360200151846040015185606001518660800151604051600160a060020a03968716815294861660208601529285166040808601919091526060850192909252909316608083015260a082015260c001905180910390a1600191505b50919050565b61047b6109d0565b60018054806020026020016040519081016040528092919081815260200182805480156104c857602002820191906000526020600020905b815481526001909101906020018083116104b3575b505050505090505b90565b60018054829081106104e157fe5b906000526020600020900160005b5054905081565b600060208190529081526040902080546001820154600283015460038401546004850154600590950154600160a060020a0394851695938516949293919092169160ff1686565b6000808080861161054d57600080fd5b6000841161055a57600080fd5b600160a060020a038716151561058757600160a060020a033016318690101561058257600080fd5b610607565b8587600160a060020a03166370a082313360006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156105df57600080fd5b6102c65a03f115156105f057600080fd5b505050604051805190501015151561060757600080fd5b5b84848888604051606060020a600160a060020a03958616810282526014820194909452919093169091026034820152604881019190915260680160405190819003902060008181526020819052604090206004015490925015801590610680575060008281526020819052604090206005015460ff16155b156106955761068e8261019e565b92506108ec565b86868686604051606060020a600160a060020a0395861681028252601482019490945291909316909102603482015260488101919091526068016040519081900390206000818152602081905260409020600401549092501580159061070d575060008281526020819052604090206005015460ff16155b1561077d5761068e606060405190810160405280603981526020017f4964656e746963616c206f7264657220697320616c72656164792061637469768152602001603860020a78652c2045786368616e67652e7375626d69744f726465722829028152506108f7565b92506108ec565b6001805480820161078e83826109e2565b916000526020600020900160005b508390555060c06040519081016040908152600160a060020a0333811683528981166020808501919091528284018a9052908816606084015260808301879052600060a08401819052858152908190522081518154600160a060020a031916600160a060020a03919091161781556020820151600182018054600160a060020a031916600160a060020a0392909216919091179055604082015181600201556060820151600382018054600160a060020a031916600160a060020a03929092169190911790556080820151816004015560a0820151600591909101805460ff1916911515919091179055507f2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d3388888888604051600160a060020a039586168152938516602085015260408085019390935293166060830152608082019290925260a001905180910390a1600192505b5b5050949350505050565b60007f551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a78260405160208082528190810183818151815260200191508051906020019080838360005b838110156109585780820151818401525b60200161093f565b50505050905090810190601f1680156109855780820380516001836020036101000a031916815260200191505b509250505060405180910390a15060005b919050565b60c06040519081016040908152600080835260208301819052908201819052606082018190526080820181905260a082015290565b60206040519081016040526000815290565b815481835581811511610a0657600083815260209020610a06918101908301610a0c565b5b505050565b6104d091905b80821115610a265760008155600101610a12565b5090565b905600a165627a7a72305820859fe52bbf11d9cdbbbcdcb652b2245399ba7904a60bb45670f532b0a25373830029",
  "networks": {
    "1504806351281": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
          "type": "event"
        },
        "0x7cdb51e9dbbc205231228146c3246e7f914aa6d4a33170e43ecc8e3593481d1a": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "u",
              "type": "string"
            }
          ],
          "name": "Debug",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x228e316dc6b6f5f2c0d4b9342536899e8f1965ce",
      "updated_at": 1504809687116
    },
    "1505137774704": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x1df21dc50012d1a2c6475c4c0a856c1b03cbeed3",
      "updated_at": 1505140482591
    },
    "1505323206710": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x8584b98b4490e657ad2bae0a02db02781eb45fb0",
      "updated_at": 1505323366293
    },
    "1505327660149": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x662cfe783079cbb2378b41e3e85614346bb6fb97",
      "updated_at": 1505331063591
    },
    "1505395642532": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x252640d7b226ab662fe42132f2286e8e381a97f4",
      "updated_at": 1505395704721
    },
    "1505402794417": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x7d525093f383e7e2a16f8bab6f7d48e2f217075b",
      "updated_at": 1505407342584
    },
    "1505495332808": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x00538f5603564461cf874ae90b5744831ef19c3a",
      "updated_at": 1505496151444
    },
    "1505559944266": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x88a127ef18caef50ccb6bee22cfd5706b3235655",
      "updated_at": 1505559955350
    },
    "1505562489127": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x3bf7fbdc46f57014e109adf619e3c93a875e3f93",
      "updated_at": 1505564805736
    },
    "1505568633202": {
      "events": {
        "0x2488a98af2c19a2f8be4fe1dfdd5a86048f4e5695c6d230f027aa9de0dd7af0d": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderSubmitted",
          "type": "event"
        },
        "0x9a1421e25c7471f70dc672f22aea188ba8d3ab35386ac1296fcb5e1c8dcbc1a3": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "maker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "taker",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "offerAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "wantToken",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "wantAmount",
              "type": "uint256"
            }
          ],
          "name": "logOrderExecuted",
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
      "address": "0x11f215aa0d9017359af74c8e7796fedbd2d70045",
      "updated_at": 1505575986832
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1505575986832
}

const blgTokenAddress = '0xfec1266f7e026363be4a7b0d10df790bbd92bff4'
const blgTokenJSON = {
  "contract_name": "BLG",
  "abi": [
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
      "name": "DECIMALS",
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
      "inputs": [],
      "name": "active_",
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
      "constant": false,
      "inputs": [
        {
          "name": "_blgHub",
          "type": "address"
        }
      ],
      "name": "setBLGHub",
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
      "name": "NAME",
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
      "name": "blgHub_",
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
      "name": "blg_",
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
          "name": "active",
          "type": "bool"
        }
      ],
      "name": "LogActivated",
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
  "unlinked_binary": "0x6060604052341561000f57600080fd5b5b60038054600160a060020a03191633600160a060020a03161790556004805460a060020a60ff02191690555b5b610ee48061004c6000396000f300606060405236156100ca5763ffffffff60e060020a600035041663095ea7b381146100cf57806318160ddd1461010557806323b872dd1461012a5780632839e16a146101665780632e0f26251461019d578063324536eb146101c257806340c10f19146101e75780634d7c09dd1461021d5780636ca34ea21461024457806370a082311461027557806395e087fe146102a6578063a3f4df7e146102d9578063a9059cbb14610364578063dd62ed3e1461039a578063f06d87be146103d1578063fc31723014610400575b600080fd5b34156100da57600080fd5b6100f1600160a060020a036004351660243561042f565b604051901515815260200160405180910390f35b341561011057600080fd5b610118610584565b60405190815260200160405180910390f35b341561013557600080fd5b6100f1600160a060020a036004358116906024351660443561058b565b604051901515815260200160405180910390f35b341561017157600080fd5b610118600160a060020a036004358116906024351661081c565b60405190815260200160405180910390f35b34156101a857600080fd5b610118610839565b60405190815260200160405180910390f35b34156101cd57600080fd5b61011861083e565b60405190815260200160405180910390f35b34156101f257600080fd5b6100f1600160a060020a0360043516602435610844565b604051901515815260200160405180910390f35b341561022857600080fd5b6100f1610aca565b604051901515815260200160405180910390f35b341561024f57600080fd5b610118600160a060020a0360043516610ada565b60405190815260200160405180910390f35b341561028057600080fd5b610118600160a060020a0360043516610aec565b60405190815260200160405180910390f35b34156102b157600080fd5b6100f1600160a060020a0360043516610b0b565b604051901515815260200160405180910390f35b34156102e457600080fd5b6102ec610c60565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156103295780820151818401525b602001610310565b50505050905090810190601f1680156103565780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561036f57600080fd5b6100f1600160a060020a0360043516602435610c80565b604051901515815260200160405180910390f35b34156103a557600080fd5b610118600160a060020a0360043581169060243516610d9c565b60405190815260200160405180910390f35b34156103dc57600080fd5b6103e4610da5565b604051600160a060020a03909116815260200160405180910390f35b341561040b57600080fd5b6103e4610db4565b604051600160a060020a03909116815260200160405180910390f35b600080821161049757610490606060405190810160405280602d81526020017f43616e206e6f7420617070726f766520616e20616d6f756e74203c3d20302c208152602001609860020a6c424c472e617070726f7665282902815250610dc3565b905061057e565b600160a060020a03331660009081526001602052604090205482111561051e57610490606060405190810160405280603581526020017f416d6f756e742069732067726561746572207468616e2073656e6465727320628152602001605860020a74616c616e63652c20424c472e617070726f7665282902815250610dc3565b905061057e565b600160a060020a03338116600090815260026020908152604080832093871683529290522054610554908363ffffffff610e6716565b600160a060020a033381166000908152600260209081526040808320938816835292905220555060015b92915050565b6000545b90565b60008082116105f5576105ee606060405190810160405280602f81526020017f43616e6e6f74207472616e7366657220616d6f756e74203c3d20302c20424c478152602001608860020a6e2e7472616e7366657246726f6d282902815250610dc3565b9050610815565b600160a060020a038416600090815260016020526040902054821115610681576105ee606060405190810160405280603c81526020017f46726f6d206163636f756e742068617320616e20696e73756666696369656e7481526020017f2062616c616e63652c20424c472e7472616e7366657246726f6d282900000000815250610dc3565b9050610815565b600160a060020a038085166000908152600260209081526040808320339094168352929052205482111561071a576105ee606060405190810160405280603981526020017f6d73672e73656e6465722068617320696e73756666696369656e7420616c6c6f8152602001603860020a7877616e63652c20424c472e7472616e7366657246726f6d282902815250610dc3565b9050610815565b600160a060020a038416600090815260016020526040902054610743908363ffffffff610e8116565b600160a060020a0380861660009081526001602090815260408083209490945560028152838220339093168252919091522054610786908363ffffffff610e8116565b600160a060020a03808616600090815260026020908152604080832033851684528252808320949094559186168152600190915220546107cc908363ffffffff610e6716565b600160a060020a0380851660008181526001602052604090819020939093559190861690600080516020610e998339815191529085905190815260200160405180910390a35060015b9392505050565b600260209081526000928352604080842090915290825290205481565b601281565b60005481565b60045460009060a060020a900460ff1615156108ad57610490606060405190810160405280602181526020017f424c47206973206e6f7420796574206163746976652c20424c472e6d696e7428815260200160f860020a602902815250610dc3565b905061057e565b60045433600160a060020a039081169116148015906108db575060035433600160a060020a03908116911614155b1561093957610490606060405190810160405280602781526020017f6d73672e73656e64657220213d20626c67487562206f7220626c672c20424c47815260200160c860020a662e6d696e74282902815250610dc3565b905061057e565b6000821161099a57610490606060405190810160405280602781526020017f43616e6e6f74206d696e7420612076616c7565206f66203c3d20302c20424c47815260200160c860020a662e6d696e74282902815250610dc3565b905061057e565b600160a060020a0383161515610a0857610490606060405190810160405280602c81526020017f43616e6e6f74206d696e7420746f6b656e7320746f2061646472657373283029815260200160a060020a6b2c20424c472e6d696e74282902815250610dc3565b905061057e565b600054610a1b908363ffffffff610e6716565b6000908155600160a060020a038416815260016020526040902054610a46908363ffffffff610e6716565b600160a060020a038416600081815260016020526040808220939093555490917f6d69c71ef35e507286bcb03186fe9ebdbf14f6e096ce22d6564de19afd7922b7918691869190518084600160a060020a0316600160a060020a03168152602001838152602001828152602001935050505060405180910390a25060015b92915050565b60045460a060020a900460ff1681565b60016020526000908152604090205481565b600160a060020a0381166000908152600160205260409020545b919050565b60035460009033600160a060020a03908116911614610b7857610b71606060405190810160405280602281526020017f6d73672e73656e64657220213d20626c672c20424c472e736574424c47487562815260200160f060020a61282902815250610dc3565b9050610b06565b600160a060020a0382161515610bf457610b71606060405190810160405280603a81526020017f496e76616c69642068756220616464726573732c20626c67487562203d3d206181526020017f6464726573732830292c20424c472e736574424c474875622829000000000000815250610dc3565b9050610b06565b6004805460a060020a600160a060020a0319909116600160a060020a0385161760a060020a60ff0219161790557fe7261bb649db1e4cfb17b615c73a61fbfc88370a43040abb09b08ca8bd6817dd6001604051901515815260200160405180910390a15060015b919050565b604080519081016040526003815260e860020a62424c4702602082015281565b60045460009060a060020a900460ff161515610cee57610490606060405190810160405280602681526020017f424c47206973206e6f7420796574206163746976652c20424c472e736574424c815260200160d060020a6547487562282902815250610dc3565b905061057e565b600160a060020a033316600090815260016020526040902054610d17908363ffffffff610e8116565b600160a060020a033381166000908152600160205260408082209390935590851681522054610d4c908363ffffffff610e6716565b600160a060020a038085166000818152600160205260409081902093909355913390911690600080516020610e998339815191529085905190815260200160405180910390a35060015b92915050565b60005b92915050565b600454600160a060020a031681565b600354600160a060020a031681565b60007f551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a78260405160208082528190810183818151815260200191508051906020019080838360005b83811015610e245780820151818401525b602001610e0b565b50505050905090810190601f168015610e515780820380516001836020036101000a031916815260200191505b509250505060405180910390a15060005b919050565b600082820183811015610e7657fe5b8091505b5092915050565b600082821115610e8d57fe5b508082035b929150505600ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa165627a7a72305820b8602e1412083ea20a133959a207bdbbcb169e7d515ca6ab329167c082d8f4690029",
  "networks": {
    "1505495332808": {
      "events": {
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
        "0xe7261bb649db1e4cfb17b615c73a61fbfc88370a43040abb09b08ca8bd6817dd": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "active",
              "type": "bool"
            }
          ],
          "name": "LogActivated",
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
      "address": "0x1e90483c659759b56b372ac1b1dc99660d1a1879",
      "updated_at": 1505495603036
    },
    "1505559944266": {
      "events": {
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
        "0xe7261bb649db1e4cfb17b615c73a61fbfc88370a43040abb09b08ca8bd6817dd": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "active",
              "type": "bool"
            }
          ],
          "name": "LogActivated",
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
      "address": "0x7fb62fffc113ca92e78e644161e8bb614b4f2084",
      "updated_at": 1505561468009
    },
    "1505562489127": {
      "events": {
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
        "0xe7261bb649db1e4cfb17b615c73a61fbfc88370a43040abb09b08ca8bd6817dd": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "active",
              "type": "bool"
            }
          ],
          "name": "LogActivated",
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
      "address": "0xad4b713b3059d4c2debf62a149ac26b366a8cd30",
      "updated_at": 1505567525224
    },
    "1505568633202": {
      "events": {
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
        "0xe7261bb649db1e4cfb17b615c73a61fbfc88370a43040abb09b08ca8bd6817dd": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "active",
              "type": "bool"
            }
          ],
          "name": "LogActivated",
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
      "address": "0xbb81484132a0699e46eaa3ef64a03e9579be9ea9",
      "updated_at": 1505575663848
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1505575663848
}

const hubAddress = '0x4519b80e842c4e8a9538997c39550dc724c28427'
const hubJSON = {
  "contract_name": "Hub",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_resourceUrl",
          "type": "string"
        }
      ],
      "name": "likeResource",
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
          "name": "_resourceUrl",
          "type": "string"
        }
      ],
      "name": "removeResource",
      "outputs": [],
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
          "name": "_userIndex",
          "type": "uint256"
        }
      ],
      "name": "removeUser",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_id",
          "type": "bytes32"
        }
      ],
      "name": "getResourceById",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        },
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
      "name": "RESOURCE_REWARD",
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
      "name": "getResourceIds",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
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
      "name": "LIKE_REWARD",
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
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getUserData",
      "outputs": [
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_blgToken",
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
          "name": "resourceUrl",
          "type": "string"
        }
      ],
      "name": "LogResourceRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "resourceUrl",
          "type": "string"
        }
      ],
      "name": "LogResourceLiked",
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
          "name": "user",
          "type": "address"
        }
      ],
      "name": "LogUserRemoved",
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
  "unlinked_binary": "0x6060604052341561000f57600080fd5b60405160208061196d833981016040528080519150505b60018054600160a060020a03808416600160a060020a0319928316179092556000805433909316929091169190911790555b505b611904806100696000396000f300606060405236156100935763ffffffff60e060020a60003504166319f80daa811461009857806335afb95f146100ca5780638a15309b146100ea57806393d3f7741461011c578063bc8a6f2014610140578063c6361c22146101ee578063d2239ac414610245578063dff836e11461026a578063e2842d79146102d1578063f0f8d4f114610338578063ffc9896b1461035d575b600080fd5b34156100a357600080fd5b6100b660048035602481019101356104c9565b604051901515815260200160405180910390f35b34156100d557600080fd5b6100e860048035602481019101356108e7565b005b34156100f557600080fd5b6100b660048035602481019101356109bf565b604051901515815260200160405180910390f35b341561012757600080fd5b6100e8600160a060020a0360043516602435610ddd565b005b341561014b57600080fd5b610156600435610eb1565b604051600160a060020a0384166020820152604081018390526060810182905260808082528190810186818151815260200191508051906020019080838360005b838110156101b05780820151818401525b602001610197565b50505050905090810190601f1680156101dd5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34156101f957600080fd5b6100b660048035600160a060020a03169060248035808201929081013591604435808201929081013591606435908101910135610ff7565b604051901515815260200160405180910390f35b341561025057600080fd5b6102586112a9565b60405190815260200160405180910390f35b341561027557600080fd5b61027d6112af565b60405160208082528190810183818151815260200191508051906020019060200280838360005b838110156102bd5780820151818401525b6020016102a4565b505050509050019250505060405180910390f35b34156102dc57600080fd5b61027d61130f565b60405160208082528190810183818151815260200191508051906020019060200280838360005b838110156102bd5780820151818401525b6020016102a4565b505050509050019250505060405180910390f35b341561034357600080fd5b610258611378565b60405190815260200160405180910390f35b341561036857600080fd5b61037c600160a060020a036004351661137d565b60405180806020018060200180602001848103845287818151815260200191508051906020019080838360005b838110156103c25780820151818401525b6020016103a9565b50505050905090810190601f1680156103ef5780820380516001836020036101000a031916815260200191505b50848103835286818151815260200191508051906020019080838360005b838110156104265780820151818401525b60200161040d565b50505050905090810190601f1680156104535780820380516001836020036101000a031916815260200191505b50848103825285818151815260200191508051906020019080838360005b8381101561048a5780820151818401525b602001610471565b50505050905090810190601f1680156104b75780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390f35b6000806104d46116ab565b6000805433600160a060020a039081169116146105425761053b606060405190810160405280602581526020017f6d73672e73656e64657220213d20626c672c204875622e6c696b655265736f75815260200160d860020a647263652829028152506115ed565b93506108de565b8585604051808383808284378201915050925050506040519081900390206000818152600360205260409081902091945060a090519081016040529081600082018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106175780601f106105ec57610100808354040283529160200191610617565b820191906000526020600020905b8154815290600101906020018083116105fa57829003601f168201915b50505091835250506001820154600160a060020a03166020820152600282015460408201526003808301546060830152600483015460809092019160ff169081111561065f57fe5b600381111561066a57fe5b905250915060005b8260800151600381111561068257fe5b14156106e55761053b606060405190810160405280602b81526020017f5265736f7572636520646f6573206e6f742065786973742c204875622e6c696b815260200160a860020a6a655265736f757263652829028152506115ed565b93506108de565b600054600160a060020a03166020830151600160a060020a0316146107ea57600154600160a060020a03166340c10f196020840151600a60006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b151561076857600080fd5b6102c65a03f1151561077957600080fd5b50505060405180519150508015156107ea5761053b606060405190810160405280602d81526020017f556e61626c6520746f206d696e7420424c4720746f6b656e732c204875622e6c8152602001609860020a6c696b655265736f757263652829028152506115ed565b93506108de565b5b610801600a83604001519063ffffffff61169116565b6040808401919091526000848152600360205220829081518190805161082b9291602001906116f4565b506020820151600182018054600160a060020a031916600160a060020a03929092169190911790556040820151816002015560608201518160030155608082015160048201805460ff1916600183600381111561088457fe5b02179055509050507ffb2dc9d4587e80c388cc9e4c01453612a8209118190b5676aee635e0e70f548386866040516020808252810182905280604081018484808284378201915050935050505060405180910390a1600193505b50505092915050565b60005433600160a060020a0390811691161461090257600080fd5b60036000838360405180838380828437820191505092505050604051908190039020815260208101919091526040016000908120906109418282611773565b50600181018054600160a060020a03191690556000600282018190556003820155600401805460ff191690557f704eeb74d14225ce76a0b7d5ef93344c05f6b050567e55f8a8b0ab51a840d26c82826040516020808252810182905280604081018484808284378201915050935050505060405180910390a15b5050565b60008060006109cc6116ab565b60015b600160a060020a033316600090815260056020526040902060039081015460ff16908111156109fa57fe5b14610a565761053b606060405190810160405280602581526020017f55736572206973206e6f74206163746976652c204875622e6164645265736f75815260200160d860020a647263652829028152506115ed565b93506108de565b841515610ab85761053b606060405190810160405280602981526020017f496e766c61696420656d707479207265736f757263652c204875622e61646452815260200160b860020a6865736f757263652829028152506115ed565b93506108de565b858560405180838380828437820191505092505050604051908190039020925060005b60008481526003602081905260409091206004015460ff1690811115610afd57fe5b14610b5e5761053b606060405190810160405280602a81526020017f5265736f7572636520616c7265616479206578697374732c204875622e616464815260200160b060020a695265736f757263652829028152506115ed565b93506108de565b60005433600160a060020a03908116911614610c5657600154600160a060020a03166340c10f19336103e860006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b1515610bd557600080fd5b6102c65a03f11515610be657600080fd5b5050506040518051925050811515610c565761053b606060405190810160405280602c81526020017f556e61626c6520746f206d696e7420424c4720746f6b656e732c204875622e61815260200160a060020a6b64645265736f757263652829028152506115ed565b93506108de565b5b60a06040519081016040528087878080601f0160208091040260200160405190810160405281815292919060208401838380828437505050928452505050600160a060020a03331660208201526000604082015243606082015260800160015b9052600280549192509060018101610ccf83826117bb565b916000526020600020900160005b508490555060008381526003602052604090208190815181908051610d069291602001906116f4565b506020820151600182018054600160a060020a031916600160a060020a03929092169190911790556040820151816002015560608201518160030155608082015160048201805460ff19166001836003811115610d5f57fe5b02179055509050507f413d05b8bb326cef7511810161c97e50e07475497cb0c04dc8b407faf7991ab833878743604051600160a060020a0385168152604081018290526060602082018181529082018490526080820185858082843782019150509550505050505060405180910390a1600193505b50505092915050565b60005433600160a060020a03908116911614610df857600080fd5b6004805482908110610e0657fe5b906000526020600020900160005b8154600160a060020a036101009290920a820219169091558216600090815260056020526040812090610e478282611773565b610e55600183016000611773565b610e63600283016000611773565b50600301805460ff191690557f820cfa068d67f8bd8bb05be4525aca026c8a81dd1925efc320ecd01ab716569f82604051600160a060020a03909116815260200160405180910390a15b5050565b610eb96117e5565b6000806000610ec66116ab565b600086815260036020526040908190209060a090519081016040529081600082018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610f7b5780601f10610f5057610100808354040283529160200191610f7b565b820191906000526020600020905b815481529060010190602001808311610f5e57829003601f168201915b50505091835250506001820154600160a060020a03166020820152600282015460408201526003808301546060830152600483015460809092019160ff1690811115610fc357fe5b6003811115610fce57fe5b90525090508051816020015182604001518360600151929750909550935091505b509193509193565b6000805433600160a060020a039081169116146110515761104a6040805190810160405260208082527f6d73672e73656e64657220213d20626c672c204875622e616464557365722829908201526115ed565b905061129e565b60005b600160a060020a038916600090815260056020526040902060039081015460ff169081111561107f57fe5b146110d85761104a606060405190810160405280602281526020017f5573657220616c7265616479206578697374732c204875622e61646455736572815260200160f060020a612829028152506115ed565b905061129e565b60048054600181016110ea83826117bb565b916000526020600020900160005b8154600160a060020a03808d166101009390930a928302920219161790555060806040519081016040528088888080601f0160208091040260200160405190810160405281815292919060208401838380828437820191505050505050815260200186868080601f0160208091040260200160405190810160405281815292919060208401838380828437820191505050505050815260200184848080601f016020809104026020016040519081016040528181529291906020840183838082843750505092845250506020909101905060015b9052600160a060020a03891660009081526005602052604090208151819080516111fa9291602001906116f4565b506020820151816001019080516112159291602001906116f4565b506040820151816002019080516112309291602001906116f4565b5060608201518160030160006101000a81548160ff0219169083600381111561125557fe5b02179055509050507f187047b56eb20e7a0313254e37dc60b8c1a9d25707114d2caaaee420b2b7ec2388604051600160a060020a03909116815260200160405180910390a15060015b979650505050505050565b6103e881565b6112b76117e5565b600280548060200260200160405190810160405280929190818152602001828054801561130457602002820191906000526020600020905b815481526001909101906020018083116112ef575b505050505090505b90565b6113176117e5565b600480548060200260200160405190810160405280929190818152602001828054801561130457602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161134f575b505050505090505b90565b600a81565b6113856117e5565b61138d6117e5565b6113956117e5565b61139d611845565b600160a060020a0385166000908152600560205260409081902090608090519081016040529081600082018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561145c5780601f106114315761010080835404028352916020019161145c565b820191906000526020600020905b81548152906001019060200180831161143f57829003601f168201915b50505050508152602001600182018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156114fe5780601f106114d3576101008083540402835291602001916114fe565b820191906000526020600020905b8154815290600101906020018083116114e157829003601f168201915b50505050508152602001600282018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156115a05780601f10611575576101008083540402835291602001916115a0565b820191906000526020600020905b81548152906001019060200180831161158357829003601f168201915b505050918352505060038281015460209092019160ff16908111156115c157fe5b60038111156115cc57fe5b9052509050805181602001518260400151919550935091505b509193909250565b60007f551303dd5f39cbfe6daba6b3e27754b8a7d72f519756a2cde2b92c2bbde159a78260405160208082528190810183818151815260200191508051906020019080838360005b8381101561164e5780820151818401525b602001611635565b50505050905090810190601f16801561167b5780820380516001836020036101000a031916815260200191505b509250505060405180910390a15060005b919050565b6000828201838110156116a057fe5b8091505b5092915050565b60a0604051908101604052806116bf6117e5565b81526020016000600160a060020a031681526020016000815260200160008152602001600060038111156116ef57fe5b905290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061173557805160ff1916838001178555611762565b82800160010185558215611762579182015b82811115611762578251825591602001919060010190611747565b5b5061176f929150611896565b5090565b50805460018160011615610100020316600290046000825580601f1061179957506117b7565b601f0160209004906000526020600020908101906117b79190611896565b5b50565b8154818355818115116117df576000838152602090206117df918101908301611896565b5b505050565b60206040519081016040526000815290565b8154818355818115116117df576000838152602090206117df918101908301611896565b5b505050565b60206040519081016040526000815290565b60206040519081016040526000815290565b6080604051908101604052806118596117e5565b81526020016118666117e5565b81526020016118736117e5565b815260200160006116ef565b905290565b60206040519081016040526000815290565b61130c91905b8082111561176f576000815560010161189c565b5090565b90565b61130c91905b8082111561176f576000815560010161189c565b5090565b905600a165627a7a723058203588aea0dfa9b26409c714e2286b9ab8509aa9dc28fb26f1092aaa28bd6ccad90029",
  "networks": {
    "1505495332808": {
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
        "0xfb2dc9d4587e80c388cc9e4c01453612a8209118190b5676aee635e0e70f5483": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "resourceUrl",
              "type": "string"
            }
          ],
          "name": "LogResourceLiked",
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
      "address": "0xe5a3fa537afe3a3d9df53d0e564e103e33440fab",
      "updated_at": 1505495603025
    },
    "1505559944266": {
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
        "0xfb2dc9d4587e80c388cc9e4c01453612a8209118190b5676aee635e0e70f5483": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "resourceUrl",
              "type": "string"
            }
          ],
          "name": "LogResourceLiked",
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
      "address": "0xbc426bbbf8f4be0d17961c0184be0a85c2de7aaf",
      "updated_at": 1505561467997
    },
    "1505562489127": {
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
        "0xfb2dc9d4587e80c388cc9e4c01453612a8209118190b5676aee635e0e70f5483": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "resourceUrl",
              "type": "string"
            }
          ],
          "name": "LogResourceLiked",
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
      "address": "0x5944157127e04fdf1c2f96b6d0bc204df9e08451",
      "updated_at": 1505567525215
    },
    "1505568633202": {
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
        "0xfb2dc9d4587e80c388cc9e4c01453612a8209118190b5676aee635e0e70f5483": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "resourceUrl",
              "type": "string"
            }
          ],
          "name": "LogResourceLiked",
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
        },
        "0x704eeb74d14225ce76a0b7d5ef93344c05f6b050567e55f8a8b0ab51a840d26c": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "resourceUrl",
              "type": "string"
            }
          ],
          "name": "LogResourceRemoved",
          "type": "event"
        },
        "0x820cfa068d67f8bd8bb05be4525aca026c8a81dd1925efc320ecd01ab716569f": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "user",
              "type": "address"
            }
          ],
          "name": "LogUserRemoved",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xa2500d8361012c2007cb481ccc8911651bec59eb",
      "updated_at": 1505575663836
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1505575663836
}

$(document).ready(() => {
  // Approved tokens to trade on the exchange, mapping symbol <> address
  window.approvedTokens = {
    'ETH': '0x0000000000000000000000000000000000000000',
    'BLG': blgTokenAddress
  }

  window.tokenAddressToSymbol = {
    '0x0000000000000000000000000000000000000000': 'ETH',
    '0xfec1266f7e026363be4a7b0d10df790bbd92bff4': 'BLG'
  }

  if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider) // Metamask

    // Load metamask accounts
    web3.eth.getAccounts((err, accounts) => {
      if (err) {
        console.error(err)

      } else if (accounts.length <= 0){
        alert('Please create at least one account.')

      } else {
        window.defaultAccount = accounts[0]

        // Create instance of the exchange, blg token and hub
        window.exchange = web3.eth.contract(exchangeJSON.abi).at(exchangeAddress)
        window.blgToken = web3.eth.contract(blgTokenJSON.abi).at(blgTokenAddress)
        window.hub = web3.eth.contract(hubJSON.abi).at(hubAddress)

        // Create relevant listeners for all contracts
        initExchangeListeners()
        initBLGTokenListeners()
        initHubListeners()

        // Load balances for the user as well as the order book contents
        updateETHBalance(window.defaultAccount)
        updateBLGTokenBalance(window.defaultAccount)
        loadOrderBook()
      }
    })

  } else {
    alert('Please install Metamask to use this application!\n https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en')
  }
})

/**
 * Append a new order to the order book table.
  * @param  {String} maker  The address of the user who created the order.
  * @param  {String} offerToken  The address of the token contract offered.
  * @param  {Number} offerAmount The amount of tokens offered.
  * @param  {String} wantToken  The address of the token contract wanted.
  * @param  {Number} wantAmount The amount of tokens wanted.
  * when offering ether to transfer the value to the exchange to broker the trade.
  */
function appendOrder(maker, offerToken, offerAmount, wantToken, wantAmount) {
  const offerSymbol = window.tokenAddressToSymbol[offerToken]
  const wantSymbol = window.tokenAddressToSymbol[wantToken]
  let offerAmountAdjusted = offerAmount
  let wantAmountAdjusted = wantAmount

  // Convert eth amount from wei
  if (offerSymbol === 'ETH') {
    offerAmountAdjusted = offerAmount / 10**18
  } else if (wantSymbol === 'ETH') {
    wantAmountAdjusted = wantAmount / 10**18
  }

  $('#orderBook').append(
    '<tr id='
      // Sufficient ID for now as only one order can exist with these params at this time.
      + offerToken + offerAmount + wantToken + wantAmount
      +' ><td>'
      + offerSymbol + '</td><td>'
      + offerAmountAdjusted + '</td><td>'
      + wantSymbol + '</td><td>'
      + wantAmountAdjusted + '</td><td>'
      + maker
    + '</td><</tr>'
  )
}

/**
 * Create listeners for the BLG token.
 */
function initBLGTokenListeners() {
  // Tokens minted. Will be the result of submitting a resource to the hub.
  window.blgToken.LogTokensMinted({ from: 'latest', to: 'latest' }).watch((err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
      openTransactionSuccessModal('BLG tokens minted.', res.transactionHash)

      // If tokens minted to user update their balance
      if (res.args.to == window.defaultAccount) {
        updateETHBalance(window.defaultAccount)
        updateBLGTokenBalance(window.defaultAccount)
      }
    }
  })

  // Error event
  window.blgToken.LogErrorString({ from: 'latest', to: 'latest' }).watch((err, res) => {
    if (err) {
      console.log(err)
    } else {
      updateETHBalance(window.defaultAccount)
      alert('Error! \n' + res.args.errorString)
    }
  })
}

/**
 * Create listeners for the exchange contract.
 */
function initExchangeListeners() {
  // Listen for all exchange events
  window.exchange.allEvents({ from: 'latest', to: 'latest' }).watch((error, res) => {
    if (error) console.log(error)

    console.log(res)

    if (res.event === 'logOrderSubmitted') {
      // Update balances - eth may have been transferred to exchange
      updateETHBalance(window.defaultAccount)

      // Append new order to order book table
      appendOrder(
        res.args.maker,
        res.args.offerToken,
        res.args.offerAmount,
        res.args.wantToken,
        res.args.wantAmount
      )

      openTransactionSuccessModal('Order Submitted.', res.transactionHash)

    } else if (res.event === 'logOrderExecuted') {
      openTransactionSuccessModal('Order Executed.', res.transactionHash)

      alert(
        'Order Executed!\n Maker: ' + res.args.maker
        + '\n Offer Token: ' + res.args.offerToken
        + '\n Offer Amount: ' + res.args.offerAmount
        + '\n Taker: ' + res.args.taker
        + '\n Want Token: ' + res.args.wantToken
        + '\n Want Amount: ' + res.args.wantAmount
      )

      // Update balances
      updateETHBalance(window.defaultAccount)
      updateBLGTokenBalance(window.defaultAccount)

      // Color the row grey showing it has been filled
      const id = '#' + res.args.offerToken + res.args.offerAmount + res.args.wantToken + res.args.wantAmount
      $(id).remove()

    } else if (res.event === 'LogErrorString') {
      updateETHBalance(window.defaultAccount)
      alert('Error! \n' + res.args.errorString)
    }
  })
}

/**
 * Create listeners for the BLG hub.
 * Only listen for error string for user debugging.
 */
function initHubListeners() {
  window.hub.LogErrorString({ from: 'latest', to: 'latest' }).watch((err, res) => {
    if (err) {
      console.log(err)
    } else {
      alert('Error! \n' + res.args.errorString)
    }
  })
}

/**
 * Load the contents of the order book.
 */
function loadOrderBook() {
  window.exchange.getOrderBookIds.call((error, ids) => {
    // Get order data and load for each returned id
    for (let i = 0; i < ids.length; i++) {
      window.exchange.orderBook_.call(ids[i], (err, order) => {
        // If the order is not filled then append
        if (!order[5]) {
          appendOrder(order[0], order[1], order[2], order[3], order[4])
        }
      })
    }
  })
}

/**
 * Open the successful transaction modal
 * @param  {String} tx The transaction hash.
 */
function openTransactionSuccessModal(msg, tx) {
  const href = 'https://kovan.etherscan.io/tx/' + tx
  $('#txHash').empty()
  $('#txHash').append('<p>'+ msg +'</p>')
  $('#txHash').append('</br><p>Here is your transaction hash:</p>')
  $('#txHash').append('<a href='+ href +'>'+ tx +'</a>')
  $('#successModal').modal('show')
}

/**
 * Update the default account's blg token balance.
 * @param  {String} user The EOA address.
 */
function updateBLGTokenBalance(user) {
  window.blgToken.balanceOf(user, (err, balance) => {
    if (err) {
      console.error(err)
    } else {
      $('#blgBalance').text(balance.toNumber() + ' BLG') // convert wei to eth
    }
  })
}

/**
 * Update the the default account's ether balance.
 * @param  {String} user The EOA address.
 */
function updateETHBalance(user) {
  web3.eth.getBalance(user, (err, balance) => {
    if (err) {
      console.error(err)
    } else {
      $('#etherBalance').text(balance.toNumber() / 10**18 + ' ETH') // convert wei to eth
    }
  })
}
