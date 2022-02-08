import React from 'react'
import cx from 'classnames'
import type { AzuroGame } from '@azuro-protocol/sdk'
import { param, outcomeRegistry, marketRegistry } from 'helpers/conditions'

import s from './Game.module.scss'


type ButtonsProps = {
  game: AzuroGame
  onClick: (game: AzuroGame) => void
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { game, game: { conditions }, onClick } = props

  if (Object.keys(conditions).length === 1) {
    const odds = conditions[0].odds

    return (
      <div className={s.bigButtons}>
        {
          odds.map(({ outcomeRegistryId, conditionId, outcomeId, value }) => {
            const key = `${conditionId}-${outcomeId}-${outcomeRegistryId}`
            const title = outcomeRegistry[outcomeRegistryId](game)

            return (
              <div
                key={key}
                className={s.bigButton}
                onClick={() => onClick(game)}
              >
                <span className={s.title}>{title}</span>
                <span className={s.value}>{value.toFixed(2)}</span>
              </div>
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
                odds.map(({ outcomeRegistryId, conditionId, value }) => {
                  const key = `${conditionId}-${outcomeRegistryId}`
                  const title = outcomeRegistry[outcomeRegistryId](game)

                  return (
                    <div
                      key={key}
                      className={s.smallButton}
                      onClick={() => onClick(game)}
                    >
                      <span className={s.title}>{title}</span>
                      <span className={s.value}>{value.toFixed(2)}</span>
                    </div>
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

type GameProps = {
  data: AzuroGame
  active: boolean
  onClick: (game: AzuroGame) => void
}

const Game: React.FC<GameProps> = (props) => {
  const { data, active, onClick } = props
  const { marketRegistryId, country, league, participants, startsAt } = data

  return (
    <div className={cx(s.condition, { [s.active]: active })}>
      <div className={s.title}>{country}: {league}</div>
      <div className={s.entities}>
        {
          participants.map(({ name, image }) => (
            <div key={name} className={s.entity}>
              <img className={s.entityImage} src={image} alt="" />
              <div className={s.entityTitle}>{name}</div>
            </div>
          ))
        }
      </div>
      <div className={s.market}>{marketRegistry[marketRegistryId]}</div>
      <Buttons game={data} onClick={onClick} />
    </div>
  )
}


export default Game
