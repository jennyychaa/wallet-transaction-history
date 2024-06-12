import cors from 'cors'
import express from 'express'

import transactionsRouter from './routes/transactions.route'

const app = express()

app.use(cors())
app.use(
  cors({
    origin: 'https://wallet-transaction-history-server.vercel.app',
  }),
)
app.use('/transactions', transactionsRouter)

export default app
