import { configure, setSelectedChainId, setContractAddresses } from '@azuro-protocol/sdk'


setSelectedChainId(77)

setContractAddresses({
  core: '0xEf182ba80c2DA39710Fe0834b5Ac2E8e68820704',
  lp: '0x03792012947c6AC35C3B65eAd42E9edd9B7eD6c4',
  bet: '0x4F0Dc3aAD27379E78C0777f66a07c2ba61B66C71',
  token: '0xf5f125ffFFe359f2Bfe44776B5604eDFa82A0Ff2',
})

configure({
  rpcUrl: 'https://sokol.poa.network/',
  ipfsGateway: 'https://ipfs-gateway.azuro.org/ipfs/',
})
