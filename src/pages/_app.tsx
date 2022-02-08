import React, { useRef } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import { MantineProvider, NormalizeCSS, GlobalStyles } from '@mantine/core'
import { Connector, useConnect } from 'web3'
import { configure, setSelectedChainId, setWallerProvider } from '@azuro-protocol/sdk'

import './app.css'


setSelectedChainId(4)

configure({
  alchemyKey: '6KpUh1AlP_sMDJZ9PgIqGqAXDyXNsDRZ',
  infuraKey: '953608e98b6345af8cf956979d4a2e81',
})

const getWeb3ReactLibrary = (provider: any, connector: any) => {
  const lib = new Web3Provider(provider)
  lib.pollingInterval = 12000

  return lib
}

const SafeHydrate: React.FunctionComponent = ({ children }) => (
  <div id="hydrateWrapper" suppressHydrationWarning>
    {typeof window === 'undefined' ? null : children}
  </div>
)

const SDKContractsConnector = () => {
  const { library } = useConnect()
  const prevLibrary = useRef<any>(null)

  if (library && library !== prevLibrary.current) {
    prevLibrary.current = library
    setWallerProvider(library)
  }

  return null
}

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Azuro SDK Example</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <SafeHydrate>
      <Web3ReactProvider getLibrary={getWeb3ReactLibrary}>
        <Connector>
          <SDKContractsConnector />
          <MantineProvider
            theme={{
              colorScheme: 'light',
            }}
          >
            <NormalizeCSS />
            <GlobalStyles />
            <Component {...pageProps} />
          </MantineProvider>
        </Connector>
      </Web3ReactProvider>
    </SafeHydrate>
  </>
)


export default App
