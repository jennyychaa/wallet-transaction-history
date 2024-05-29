import styled from '@emotion/styled'

import { TokenTransfer } from '.'
import { getFormattedDate } from '../../utils'

export type TransactionCategory = 'token receive' | 'token send' | 'token swap'

export interface Transaction {
  hash: string
  category: TransactionCategory
  timestamp: string
  transfers: TokenTransfer[]
}

interface TransactionItemsProps {
  date: string
  transaction: Transaction[]
}

const ItemsWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.layout.space400};
`

const TransactionDate = styled.p`
  color: ${({ theme }) => theme.colors.gray};
`

const TransactionItems = ({ date, transaction }: TransactionItemsProps) => {
  const formattedDate = getFormattedDate(date)

  return (
    <ItemsWrapper>
      <TransactionDate>{formattedDate}</TransactionDate>
    </ItemsWrapper>
  )
}

export default TransactionItems
