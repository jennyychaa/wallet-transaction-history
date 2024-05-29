import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

async function getTransactionHistory(address: string, cursor?: any) {
  const transaction = await Moralis.EvmApi.wallets.getWalletHistory({
    address,
    cursor,
    chain: EvmChain.ETHEREUM,
    limit: 15,
    order: 'DESC',
  })

  /*
   * @TODO Transform the data received from Moralis Wallet API
   *
   * TO-DO LIST:
   * 1. Fetch X number of transaction logs from Moralis API but only send Y (e.g., 5, 10) to the client-side.
   *
   * The API results return information that currently isn't relevant to our application.
   * We only want to send valid data related to ERC-20 token transfers so client-side doesn't have to deal with bloated data.
   *
   * Action Items:
   * - Research best method to store and cache relevant transaction logs.
   * - Transform the data and send what's necessary in the client-side. See transformTransactionsApiData() @app/utils.
   */
  return {
    transaction,
  }
}

export default {
  getTransactionHistory,
}
