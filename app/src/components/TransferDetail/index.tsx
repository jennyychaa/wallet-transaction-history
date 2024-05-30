import styled from '@emotion/styled'

import PersonIcon from '../../assets/person.svg?react'
import SwapIcon from '../../assets/swap.svg?react'
import { Transaction, TransactionCategory } from '../TransactionLog'

type TransferDirection = 'receive' | 'send'

export interface TokenTransfer {
  address: string
  direction: TransferDirection
  symbol: string
  value: string
}

const DetailWrapper = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => `
    grid-gap: ${theme.layout.space300};
    margin-bottom: ${theme.layout.space400};
  `};
`

const DetailContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => `
    grid-gap: ${theme.layout.space100};
    width: calc(100% - ${theme.layout.space100} - 40px);
    font-size: ${theme.typography.fs87};

    @media (min-width: ${theme.breakpoints.tablet_small}) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `};
`

const TransferIconWrapper = styled.div`
  border-radius: 100%;
  padding: 6px 8px;
`

const PersonIconWrapper = styled(TransferIconWrapper)`
  background-color: ${({ theme }) => theme.colors.lightPurple};
`

const SwapIconWrapper = styled(TransferIconWrapper)`
  background-color: ${({ theme }) => theme.colors.lighterGreen};
`

const TransferCategory = styled.p`
  margin-top: 0;
  margin-bottom: ${({ theme }) => theme.layout.space100};
`

const TransferSummary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray};
`

const TransferValue = styled.p<{ direction: TransferDirection }>`
  margin-top: 0;
  color: ${({ direction, theme }) =>
    direction === 'receive' ? theme.colors.green : theme.colors.gray};
`

const getTransferIcon = (category: TransactionCategory) => {
  switch (category) {
    case 'token swap':
      return (
        <SwapIconWrapper>
          <SwapIcon />
        </SwapIconWrapper>
      )
    default:
      return (
        <PersonIconWrapper>
          <PersonIcon />
        </PersonIconWrapper>
      )
  }
}

const getTransferCategoryLabel = (category: TransactionCategory) => {
  switch (category) {
    case 'token receive':
      return 'Credit'
    case 'token send':
      return 'Debit'
    case 'token swap':
      return 'Swap'
    default:
      return ''
  }
}

const TransferDetail = ({
  category,
  summary,
  transfers,
}: Omit<Transaction, 'hash' | 'timestamp'>) => {
  return (
    <DetailWrapper>
      {getTransferIcon(category)}
      <DetailContentWrapper>
        <div>
          <TransferCategory>
            {getTransferCategoryLabel(category)}
          </TransferCategory>
          <TransferSummary>{summary}</TransferSummary>
        </div>
        <div>
          {transfers.map(({ address, direction, symbol, value }) => {
            const updatedValue = parseFloat(value).toFixed(2)
            const transferValue = `${updatedValue} ${symbol}`

            return (
              <TransferValue key={address} direction={direction}>
                {direction === 'receive'
                  ? `+${transferValue}`
                  : `-${transferValue}`}
              </TransferValue>
            )
          })}
        </div>
      </DetailContentWrapper>
    </DetailWrapper>
  )
}

export default TransferDetail
