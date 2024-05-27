import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

type Status = 'idle' | 'loading' | 'success' | 'error'

function App() {
  const [status, setStatus] = useState<Status>('idle')
  const [data, setData] = useState<{ result: string } | null>(null)

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
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p>Error fetching data</p>}
        {status === 'success' && data && <p>{data.result}</p>}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
