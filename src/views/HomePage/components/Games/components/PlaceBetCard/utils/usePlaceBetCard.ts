import { useState, useEffect } from 'react'
import { constants } from 'ethers'
import { useConnect } from 'web3'
import { formatUnits } from '@ethersproject/units'
import { fetchAllowance, approve, placeBet } from '@azuro-protocol/sdk'


const usePlaceBetCard = ({ betAmount }: { betAmount: number }) => {
  const { account } = useConnect()

  const [ allowance, setAllowance ] = useState<number>()

  const [ isAllowanceFetching, setAllowanceFetching ] = useState(false)

  const [ isApproving, setApproving ] = useState(false)
  const [ isBetPlacing, setBetPlacing ] = useState(false)

  const _fetchAllowance = async () => {
    setAllowanceFetching(true)

    const rawAllowance = await fetchAllowance(account as string)
    const allowance = parseFloat(formatUnits(rawAllowance, 18))

    setAllowance(allowance)
    setAllowanceFetching(false)
  }

  useEffect(() => {
    _fetchAllowance()
  }, [])

  const approveAmount = async () => {
    setApproving(true)

    const receipt = await approve(constants.MaxUint256)
    const trx = await receipt.wait()

    setAllowance(1e20) // just a big number
    setApproving(false)
  }

  const submitBet = async ({ conditionId, outcomeId, betRate }: { conditionId: number, outcomeId: number, betRate: number }) => {
    try {
      setBetPlacing(true)

      const slippage = 100 // 100%

      const receipt = await placeBet({
        conditionId,
        outcomeId,
        amount: betAmount,
        betRate,
        slippage,
      })

      const trx = await receipt.wait()

      alert('The bet successfully placed!')
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setBetPlacing(false)
    }
  }

  return {
    isAllowanceFetching,
    isApproving,
    isBetPlacing,
    account,
    allowance,
    approveAmount,
    submitBet,
  }
}


export default usePlaceBetCard
