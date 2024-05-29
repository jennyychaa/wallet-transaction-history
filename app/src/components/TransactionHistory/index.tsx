import { useEffect, useState } from 'react'
import axios from 'axios'

import Status, { StatusType } from '../Status'
import TransactionItems, { Transaction } from './TransactionItems'

type TransferDirection = 'receive' | 'send'

export interface TokenTransfer {
  name: string
  symbol: string
  toAddress: string
  fromAddress: string
  direction: TransferDirection
  value: string
}

interface Transactions {
  [key: string]: Transaction[]
}

interface TransactionHistoryProps {
  address: string
}

function TransactionHistory({ address }: TransactionHistoryProps) {
  const [status, setStatus] = useState<StatusType>('idle')
  const [transactions, setTransactions] = useState<Transactions | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading')

      try {
        const response = await axios.get('http://localhost:3000/transactions')

        console.log({ response })

        if (response.status !== 200) {
          throw new Error('new error')
        }

        setStatus('success')
        setTransactions(response.data)
      } catch (error) {
        setStatus('error')
        console.error(
          'Uh oh, something happened fetching the transaction data...',
          error,
        )
      }
    }

    void fetchData()
  }, [])

  return (
    <>
      {transactions &&
        Object.entries(transactions).map(([date, transaction]) => (
          <TransactionItems date={date} transaction={transaction} />
        ))}
      <Status type={status} />
    </>
  )
}

export default TransactionHistory
