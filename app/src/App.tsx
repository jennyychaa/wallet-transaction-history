import { ChangeEvent, useState } from 'react'
import { isAddress } from 'web3-validator'
import styled from '@emotion/styled'

import TransactionSearch from './components/TransactionSearch'
import TransactionHistory from './components/TransactionHistory'

const Layout = styled.div`
  max-width: ${(props) => props.theme.layout.pageWrapperMaxWidth};
  margin: 0 auto;
`

function App() {
  const [address, setAddress] = useState<string>('')

  const isValidWalletAddress = isAddress(address)

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  return (
    <Layout>
      <TransactionSearch
        isValidWalletAddress={isValidWalletAddress}
        onChange={handleOnChangeSearch}
        placeholder="Enter Etherum wallet address to see transaction history"
        type="search"
        value={address}
      />
      {isValidWalletAddress && <TransactionHistory address={address} />}
    </Layout>
  )
}

export default App
