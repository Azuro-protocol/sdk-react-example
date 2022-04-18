import { InjectedConnector } from '@web3-react/injected-connector'


const injected = new InjectedConnector({
  supportedChainIds: [ 77 ],
})

const connectors = {
  injected,
} as const

export type ConnectName = keyof typeof connectors


export default connectors
