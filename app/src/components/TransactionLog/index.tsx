import { lazy, Suspense } from 'react'
import styled from '@emotion/styled'

import { getFormattedDate } from '../../utils'
import { TokenTransfer } from '../TransferDetail'
import Loader from '../Loader'

const TransactionDetail = lazy(() => import('../TransferDetail'))

export type TransactionCategory = 'token receive' | 'token send' | 'token swap'

export interface Transaction {
  hash: string
  category: TransactionCategory
  summary: string
  timestamp: string
  transfers: TokenTransfer[]
}

interface TransactionLogProps {
  date: string
  transactions: Transaction[]
}

const ItemsWrapper = styled.div`
  margin: ${({ theme }) => `${theme.layout.space400} 0`};
`

const TransactionDate = styled.p`
  ${({ theme }) => `
    margin: 0 0 ${theme.layout.space400};
    color: ${theme.colors.gray};
  `};
`

const TransactionLog = ({ date, transactions }: TransactionLogProps) => {
  return (
    <ItemsWrapper>
      <TransactionDate>{getFormattedDate(date)}</TransactionDate>
      <Suspense fallback={<Loader />}>
        {transactions.map(({ hash, category, summary, transfers }) => (
          <TransactionDetail
            key={hash}
            category={category}
            summary={summary}
            transfers={transfers}
          />
        ))}
      </Suspense>
    </ItemsWrapper>
  )
}

export default TransactionLog
