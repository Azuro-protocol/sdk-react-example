import React, { useState, useEffect } from 'react'
import { calculateActualOdds } from '@azuro-protocol/sdk'
import cx from 'classnames'

import usePlaceBetCard from '../../utils/usePlaceBetCard'

import s from './BetButton.module.scss'


export type BetButtonProps = {
  className?: string
  title: string
  betAmount: number
  conditionId: number
  outcomeId: number
  initialBetRate: number
  isDisabled: boolean
  onClick: ReturnType<typeof usePlaceBetCard>['submitBet']
}

const BetButton: React.FC<BetButtonProps> = (props) => {
  const { className, title, betAmount, conditionId, outcomeId, initialBetRate, isDisabled, onClick } = props

  const [ isRateFetching, setRateFetching ] = useState(false)
  const [ betRate, setBetRate ] = useState(initialBetRate)

  useEffect(() => {
    (async () => {
      try {
        setRateFetching(true)

        const betRate = await calculateActualOdds({ conditionId, betAmount, outcomeId })

        setBetRate(betRate)
      }
      catch (err) {
        console.error(err)
      }
      finally {
        setRateFetching(false)
      }
    })()
  }, [ conditionId, outcomeId, betAmount ])

  const handleClick = () => {
    if (isDisabled) {
      return
    }

    onClick({ conditionId, outcomeId, betRate })
  }

  return (
    <div className={cx(className, { [s.disabled]: isDisabled })} onClick={handleClick}>
      {
        isRateFetching ? (
          <img className={s.spinner} src="/images/spinner.svg" alt="" />
        ) : (
          <>{title} - {betRate.toFixed(3)}</>
        )
      }
    </div>
  )
}


export default BetButton
