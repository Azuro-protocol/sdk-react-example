import React, { useState, useEffect } from 'react'
import { useConnect } from 'web3'
import { fetchGames } from '@azuro-protocol/sdk'
import type { AzuroGame } from '@azuro-protocol/sdk'

import GameCard from '../Game/Game'
import PlaceBetCard from '../PlaceBetCard/PlaceBetCard'

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
      <div className={s.market}>
        <span>Market:</span> Both Teams To Score
      </div>
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
                <GameCard
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

const useFetchGames = () => {
  const { library } = useConnect()
  const [ isFetching, setFetching ] = useState(true)
  const [ games, setGames ] = useState<AzuroGame[]>(null as any)

  const fetch = async () => {
    try {
      const games = await fetchGames({
        filters: {
          resolved: false,
          canceled: false,
        },
      })

      setFetching(false)
      setGames(games)
    }
    catch (err) {
      console.error(err)
      setFetching(false)
    }
  }

  useEffect(() => {
    if (library) {
      fetch()
    }
  }, [ library ])

  return {
    isFetching,
    games,
  }
}

const Games = () => {
  const { isFetching, games } = useFetchGames()

  return (
    <div>
      {
        isFetching ? (
          <div>Conditions are fetching...</div>
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
