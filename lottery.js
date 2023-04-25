
    const address =  '0x31F592F9b6443D87990b5C770a36F8664A69923B'
    const abi = [
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
        constant: undefined,
        payable: undefined,
        signature: 'constructor'
      },
      {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
        constant: undefined,
        payable: true,
        signature: '0xe97dcb62'
      },
      {
        inputs: [],
        name: 'getPlayers',
        outputs: [{ name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0x8b5b9ccc'
      },
      {
        inputs: [],
        name: 'manager',
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0x481c6a75'
      },
      {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        constant: undefined,
        payable: undefined,
        signature: '0x5d495aea'
      },
      {
        inputs: [{name:'', type:'uint'}],
        name: 'players',
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
        constant: true,
        payable: undefined,
        signature: '0xf71d96cb'
      }
    ]
    

//const contract =  new web3.eth.Contract(abi, address)
const contractDetails = {
    address: address,
    abi: abi,
}

export default contractDetails;

