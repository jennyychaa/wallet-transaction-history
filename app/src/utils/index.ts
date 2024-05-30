import { Transactions } from '../components/TransactionLogs'

import {
  Transaction,
  TokenTransfer,
} from '../components/TransactionLogs/models'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const getFormattedDate = (fullDate: string) => {
  const date = new Date(fullDate)
  return `${weekdays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

/*
 * @TODO Move the data transformation implementation to the server-side
 *
 * Due to the time constraints of this project, this has been implemented on the client-side.
 * For additional details, see getTransactionHistory() in @server/controllers/transactions.controllers.ts.
 */
export const transformTransactionsApiData = (
  apiResults: any,
  transactionsData: Transactions | null,
): Transactions => {
  // First, filter out the unnecessary data from the apiResults by checking:
  // - is it a spam transaction?
  // - is it a ERC-20 token transfer?
  const filteredApiResults = apiResults.filter(
    (result: { erc20_transfers: any[]; possible_spam: boolean }) =>
      !result.possible_spam && result.erc20_transfers.length > 0,
  )

  const transactionHistory: Transactions = transactionsData
    ? { ...transactionsData }
    : {}
  // Group the ERC-20 token transfers by date and store releveant transaction data.
  for (let i = 0; i < filteredApiResults.length; i++) {
    const { block_hash, block_timestamp, category, erc20_transfers, summary } =
      filteredApiResults[i]
    const [transactionDate, _] = block_timestamp.split('T')

    let transfers: TokenTransfer[] = []

    for (let j = 0; j < erc20_transfers.length; j++) {
      const { token_symbol, address, direction, value_formatted } =
        erc20_transfers[j]
      transfers.push({
        address,
        symbol: token_symbol,
        direction,
        value: value_formatted,
      })
    }

    const newTransactions: Transaction = {
      hash: block_hash,
      category,
      summary,
      timestamp: block_timestamp,
      transfers,
    }

    if (transactionHistory[transactionDate]) {
      transactionHistory[transactionDate] = [
        ...transactionHistory[transactionDate],
        newTransactions,
      ]
    } else {
      transactionHistory[transactionDate] = [newTransactions]
    }
  }

  return transactionHistory
}
