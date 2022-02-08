import React, { useState, useEffect } from 'react'

import s from './MyBets.module.scss'


const useMyBets = () => {
  const [ isFetching, setFetching ] = useState(true)
  const [ bets, setBets ] = useState([])

  const fetch = async () => {

  }

  useEffect(() => {
    fetch()
  }, [])

  return {
    isFetching,
    bets,
  }
}

const MyBets = () => {
  const { isFetching, bets } = useMyBets()

  return (
    <div>

    </div>
  )
}


export default MyBets
