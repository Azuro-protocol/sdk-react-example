import React, { useEffect } from 'react'
import { useConnect } from 'web3'


import type { ConnectName } from './connectors'
import constants from './constants'


const Connector: React.FunctionComponent = ({ children }) => {
  const { connect } = useConnect()

  useEffect(() => {
    const connectorName = localStorage.getItem(constants.connectorName) as ConnectName

    if (connectorName) {
      connect(connectorName)
    }
  }, [])

  return (
    <>{children}</>
  )
}


export default Connector
