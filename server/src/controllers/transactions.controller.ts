import Moralis from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

async function getTransactionHistory(address: string, cursor?: any) {
  const transactions = await Moralis.EvmApi.wallets.getWalletHistory({
    address,
    cursor,
    chain: EvmChain.ETHEREUM,
    limit: 5,
    order: 'DESC',
  })

  return { transactions }
}

export default {
  getTransactionHistory,
}
