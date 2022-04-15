const { Keyring } = require('@polkadot/keyring')
const { ApiPromise, WsProvider } = require('@polkadot/api')

// For testnet 
const keyring = new Keyring({ type: 'ed25519', ss58Format: 42 });
const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
let amount = 0.1 // DOT
amount = amount * Math.pow(10, 12)  // 1 Dot = 10^12 Planck on testnet

// For mainnet
// const keyring = new Keyring({ type: 'ed25519', ss58Format: 0 });
// const wsProvider = new WsProvider('wss://rpc.polkadot.io');
// let amount = 0.1 // DOT
// amount = amount * Math.pow(10, 10)  // 1 Dot = 10^10 Planck on mainnet


const mnemonic = 'since argue finger gaze sail acid audit time human vacant silk iron'
const toAddress = '5H8ajFf82tP9dt3shY2iZbGE6kNEUHqGRKK4DbtBHFmkxCsr'

async function main() {
    const api = await ApiPromise.create({ provider: wsProvider })


    let privateKey = keyring.addFromUri(mnemonic, { name: 'first pair' }, 'ed25519')
    console.log('address from privateKey:', privateKey.address)

    let signedTx = await api.tx.balances.transferKeepAlive(toAddress, amount).signAsync(privateKey)
    console.log('signedTx:', signedTx.toJSON())

    let broadcastedTx = await api.rpc.author.submitExtrinsic(signedTx.toHex())
    console.log(`broadcastedTx: ${broadcastedTx}`)
}

main()