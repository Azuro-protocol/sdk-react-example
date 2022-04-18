import React from 'react'
import type { AzuroGame } from '@azuro-protocol/sdk'
import { param, outcomeRegistry } from 'helpers/conditions'

import BetButton from '../BetButton/BetButton'
import type { BetButtonProps } from '../BetButton/BetButton'

import s from './BetButtons.module.scss'


type BetButtonsProps = {
  game: AzuroGame
  betAmount: number
  isDisabled: boolean
  onClick: BetButtonProps['onClick']
}

const BetButtons: React.FC<BetButtonsProps> = (props) => {
  const { game, game: { conditions }, betAmount, isDisabled, onClick } = props

  if (Object.keys(conditions).length === 1) {
    const odds = conditions[0].odds

    return (
      <div className={s.bigButtons}>
        {
          odds.map(({ outcomeRegistryId, conditionId, outcomeId, value }) => {
            const key = `${conditionId}-${outcomeId}-${outcomeRegistryId}`
            const title = outcomeRegistry[outcomeRegistryId](game)

            return (
              <BetButton
                key={key}
                className={s.bigButton}
                title={title}
                betAmount={betAmount}
                conditionId={conditionId}
                outcomeId={outcomeId}
                initialBetRate={value}
                isDisabled={isDisabled}
                onClick={onClick}
              />
            )
          })
        }
      </div>
    )
  }

  return (
    <div>
      {
        conditions.map(({ paramId, odds }) => (
          <div key={paramId} className={s.smallButtonsRow}>
            <div className={s.rowTitle}>{param[paramId]}</div>
            <div className={s.smallButtons}>
              {
                odds.map(({ outcomeRegistryId, conditionId, outcomeId, value }) => {
                  const key = `${conditionId}-${outcomeRegistryId}`
                  const title = outcomeRegistry[outcomeRegistryId](game)

                  return (
                    <BetButton
                      key={key}
                      className={s.smallButton}
                      title={title}
                      betAmount={betAmount}
                      conditionId={conditionId}
                      outcomeId={outcomeId}
                      initialBetRate={value}
                      isDisabled={isDisabled}
                      onClick={onClick}
                    />
                  )
                })
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}


export default BetButtons
