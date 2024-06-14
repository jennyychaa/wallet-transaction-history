import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

import { transformTransactionsApiData } from '../../utils'
import { Transaction } from '../TransactionLog'
import Status, { StatusType } from '../Status'
import TransactionLog from '../TransactionLog'

export interface Transactions {
  [key: string]: Transaction[]
}

interface TransactionLogsProps {
  address: string
}

function TransactionLogs({ address }: TransactionLogsProps) {
  const [status, setStatus] = useState<StatusType>('idle')
  const [pageCursor, setPageCursor] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<Transactions | null>(null)

  const fetchTransactionsData = async () => {
    setStatus('loading')

    if (status === 'idle') {
      try {
        const response = await axios.get(
          `https://wallet-transaction-history-server.vercel.app/transactions/${address}?cursor=${pageCursor || ''}`,
        )

        if (response.status !== 200) {
          setStatus('error')
          throw new Error(
            'Uh oh, something happened fetching the transaction data...',
          )
        }

        const { cursor, result } = response.data.transaction

        // If there are more transaction history to fetch, set the status to "idle".
        // Otherwise, set the status to "success".
        if (cursor) setStatus('idle')
        else setStatus('success')

        const updatedTransactions = transformTransactionsApiData(
          result,
          transactions,
        )
        setPageCursor(cursor)
        setTransactions(updatedTransactions)
      } catch (error) {
        setStatus('error')
        console.error(
          'Uh oh, something happened fetching the transaction data...',
          error,
        )
      }
    }
  }

  useEffect(() => {
    fetchTransactionsData()

    return () => {
      setPageCursor(null)
      setTransactions(null)
    }
  }, [address])

  return (
    <>
      <InfiniteScroll
        dataLength={transactions ? Object.keys(transactions).length : 0}
        hasMore={!!pageCursor}
        loader={<></>}
        next={fetchTransactionsData}
      >
        {transactions ? (
          Object.entries(transactions).map(([date, transactions]) => (
            <TransactionLog
              key={date}
              date={date}
              transactions={transactions}
            />
          ))
        ) : (
          <></>
        )}
      </InfiniteScroll>
      <Status type={status} />
    </>
  )
}

export default TransactionLogs
