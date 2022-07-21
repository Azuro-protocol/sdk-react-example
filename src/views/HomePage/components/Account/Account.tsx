import React, { useState, useEffect } from 'react'
import { useConnect } from 'web3'
import { formatUnits } from '@ethersproject/units'
import { checkTestTokensClaimable, claimTestTokens, fetchBalance } from '@azuro-protocol/sdk'

import s from './Account.module.scss'


const shortenAddress = (address: string) => `0x...${address.substr(-12)}`

type BalanceProps = {
  account: string
}

const Balance: React.FC<BalanceProps> = ({ account }) => {
  const [ balance, setBalance ] = useState<number>()
  const [ isClaimable, setClaimable ] = useState<boolean>(false)
  const [ isClaiming, setClaiming ] = useState(false)

  const _fetchBalance = async () => {
    const rawBalance = await fetchBalance(account)

    const balance = parseFloat(parseFloat(formatUnits(rawBalance, 18)).toFixed(2))

    setBalance(balance)
  }

  const _fetchClaimable = async () => {
    const isClaimable = await checkTestTokensClaimable(account)

    setClaimable(false)
  }

  useEffect(() => {
    if (account) {
      _fetchBalance()
      _fetchClaimable()
    }
  }, [ account ])

  const handleClaimClick = async () => {
    setClaiming(true)

    const receipt = await claimTestTokens(account)
    const trxHash = await receipt

    setClaiming(false)
    setClaimable(false)
    _fetchBalance()
  }

  const isBalanceFetching = balance === undefined

  return (
    <>
      <div className={s.balance}>{isBalanceFetching ? 'loading balance...' : `${balance} USDT`}</div>
      <button disabled={!isClaimable} onClick={handleClaimClick}>{isClaiming ? 'claiming...' : 'Claim USDT'}</button>
    </>
  )
}

const Account = () => {
  const { account, connect, disconnect } = useConnect()

  const handleConnectClick = () => {
    connect('injected')
  }

  const handleDisconnectClick = () => {
    disconnect()
  }

  if (account) {
    return (
      <div className={s.container}>
        <div className={s.address}>{shortenAddress(account)}</div>
        <Balance account={account} />
        <button onClick={handleDisconnectClick}>Disconnect</button>
      </div>
    )
  }

  return (
    <button onClick={handleConnectClick}>Connect</button>
  )
}


export default Account
