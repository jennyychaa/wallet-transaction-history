import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

async function getTransactionHistory(address: string, cursor?: any) {
  const transaction = await Moralis.EvmApi.wallets.getWalletHistory({
    address,
    cursor,
    chain: EvmChain.ETHEREUM,
    limit: 10,
    order: 'DESC',
  })

  /*
   * As illustrated in the mocked design, we want to display five ERC-20 token transfer result items at a time.
   * However, Moralis API sends transaction data of other types so the client-side may receive less than expected.
   * As a workaround, 10 data items will be sent per request.
   *
   * Action Items:
   * - Research best method to store and cache relevant transaction logs.
   * - Ensure that we are sending exactly Y number of data items to the client-side.
   * - Transform the data and send what's necessary in the client-side. See transformTransactionsApiData() @app/utils.
   */
  return {
    transaction,
  }
}

export default {
  getTransactionHistory,
}
