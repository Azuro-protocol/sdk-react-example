import { useState, useEffect } from 'react'
import { useConnect } from 'web3'
import { fetchGames } from '@azuro-protocol/sdk'
import type { AzuroGame } from '@azuro-protocol/sdk'


const useGames = () => {
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
        from: 26746224, // block number from which we'd like to start fetching data
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

export default useGames
