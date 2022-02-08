import React, { useState } from 'react'
import type { AzuroGame } from '@azuro-protocol/sdk'
import { marketRegistry } from 'helpers/conditions'

import BetButtons from './components/BetButtons/BetButtons'

import usePlaceBetCard from './utils/usePlaceBetCard'

import s from './PlaceBetCard.module.scss'


type PlaceBetCardProps = {
  game: AzuroGame
}

const PlaceBetCard: React.FC<PlaceBetCardProps> = (props) => {
  const { game, game: { marketRegistryId, country, league } } = props

  const [ betAmount, setBetAmount ] = useState<number>(0)

  const {
    isAllowanceFetching, isApproving, isBetPlacing,
    account, allowance,
    approveAmount, submitBet,
  } = usePlaceBetCard({ betAmount })

  const isApproved = allowance && allowance >= betAmount

  const handleBetAmountChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value || '0')

    setBetAmount(value)
  }

  return (
    <div className={s.card}>
      {
        isBetPlacing && (
          <img className={s.spinner} src="/images/spinner.svg" alt="" />
        )
      }
      <div className={s.title}>
        Place a Bet<br />
        <span>
          {country}: {league}<br />
          {marketRegistry[marketRegistryId]}
        </span>
      </div>
      <input
        className={s.input}
        placeholder="Amount"
        value={String(betAmount)}
        disabled={isBetPlacing}
        onChange={handleBetAmountChange}
      />
      {
        isAllowanceFetching ? (
          <div className={s.button}>checking allowance...</div>
        ) : (
          !account ? (
            <div className={s.button}>Connect your wallet</div>
          ) : (
            isApproved ? (
              <BetButtons
                game={game}
                betAmount={betAmount}
                isDisabled={!betAmount || isBetPlacing}
                onClick={submitBet}
              />
            ) : (
              <div className={s.button} onClick={approveAmount}>
                {isApproving ? 'loading...' : 'Approve amount'}
              </div>
            )
          )
        )
      }
    </div>
  )
}


export default PlaceBetCard
