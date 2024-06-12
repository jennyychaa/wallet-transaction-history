import Moralis from 'moralis'
import { config } from 'dotenv'

import app from './app'

config()

const MORALIS_API_KEY = process.env.API_KEY
const port = process.env.PORT || 3000

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  })

  app.listen(port, () => {
    console.log(`[server]: Server is running on ${port} 🚀`)
  })
}

startServer()
