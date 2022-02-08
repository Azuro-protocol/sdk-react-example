import { InjectedConnector } from '@web3-react/injected-connector'


const injected = new InjectedConnector({
  supportedChainIds: [ 1, 3, 4, 5, 42, 56, 97 ],
})

const connectors = {
  injected,
} as const

export type ConnectName = keyof typeof connectors


export default connectors
