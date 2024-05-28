import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'

import styled from '@emotion/styled'

import { Status } from './components/Status'
import TransactionSearch from './components/TransactionSearch'

const Layout = styled.div`
  max-width: ${(props) => props.theme.layout.pageWrapperMaxWidth};
  margin: 0 auto;
`

function App() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<{ result: string } | null>(null)

  const [address, setAddress] = useState<string>('')

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      setStatus('loading')
      try {
        const response = await axios.get('http://localhost:3000/example')
        if (response.status !== 200) {
          throw new Error('Error fetching data')
        }

        setStatus('success')
        setData(response.data)
      } catch (error) {
        setStatus('error')
      }
    }

    void fetchData()
  }, [])

  return (
    <Layout>
      <TransactionSearch
        placeholder="Enter Etherum wallet address to see transaction history"
        onChange={handleOnChangeSearch}
        value={address}
      />
    </Layout>
  )
}

export default App
