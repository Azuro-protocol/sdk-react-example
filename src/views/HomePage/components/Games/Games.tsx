import React, { useState } from 'react'
import type { AzuroGame } from '@azuro-protocol/sdk'

import Game from './components/Game/Game'
import PlaceBetCard from './components/PlaceBetCard/PlaceBetCard'

import useGames from './utils/useGames'
import s from './Games.module.scss'


type ContentProps = {
  games: AzuroGame[]
}

const Content: React.FC<ContentProps> = ({ games }) => {
  const [ selectedGame, setSelectedGame ] = useState<AzuroGame>(null as any)

  const handleConditionClick = (game: AzuroGame) => {
    setSelectedGame(game)
  }

  return (
    <div>
      {/*<div className={s.market}>*/}
      {/*  <span>Market:</span> Both Teams To Score*/}
      {/*</div>*/}
      <div className={s.content}>
        <div className={s.conditions}>
          {
            games.map((game) => {
              const isActive = (
                selectedGame
                && selectedGame.id === game.id
                && selectedGame.marketRegistryId === game.marketRegistryId
              )

              return (
                <Game
                  key={`${game.id}-${game.marketRegistryId}`}
                  data={game}
                  active={isActive}
                  onClick={handleConditionClick}
                />
              )
            })
          }
        </div>
        {
          selectedGame && (
            <PlaceBetCard game={selectedGame} />
          )
        }
      </div>
    </div>
  )
}

const Games = () => {
  const { isFetching, games } = useGames()

  return (
    <div>
      {
        isFetching ? (
          <div>Fetching...</div>
        ) : (
          <>
            {
              games ? (
                <Content games={games} />
              ) : (
                <div>Nothing to show...</div>
              )
            }
          </>
        )
      }
    </div>
  )
}


export default Games
