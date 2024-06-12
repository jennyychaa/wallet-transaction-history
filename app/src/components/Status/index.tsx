import styled from '@emotion/styled'

import ExclamationIcon from '../../assets/exclamation.svg?react'
import SuccessIcon from '../../assets/success.svg?react'
import Loader from '../Loader'

/*
 * Assumptions: StatusType
 * idle: waiting to fetch transaction data.
 *  - instead of success, this state is used after successfully fetching transaction data when there are additional data to fetch.
 * loading: in the process of fetching transaction data.
 * success: successfully fetched transaction data and there are no additional data to fetch.
 * error: network error in fetching the transaction data (e.g., 404, 500, etc).
 */
export type StatusType = 'idle' | 'loading' | 'success' | 'error'

interface StatusProps {
  type: StatusType
}

const StatusMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => `
    grid-gap: ${theme.layout.space100};
    margin-top: ${theme.layout.space400};
    font-size: ${theme.typography.fs75};
    color: ${theme.colors.gray};

    strong {
      font-weight: ${theme.typography.weightHeavy};
    }
  `};
`

const ErrorStatusMessage = styled(StatusMessage)`
  color: ${({ theme }) => theme.colors.red};
`

const Status = ({ type }: StatusProps) => {
  if (type === 'loading') return <Loader />

  if (type === 'success')
    return (
      <StatusMessage>
        <SuccessIcon />
        <span>You are all caught up</span>
      </StatusMessage>
    )

  if (type === 'error')
    return (
      <ErrorStatusMessage>
        <ExclamationIcon />
        <span>
          Oops, there was an error loading transactions.{' '}
          <u>
            <strong>Try again</strong>
          </u>
        </span>
      </ErrorStatusMessage>
    )

  return <></>
}

export default Status
