import cors from 'cors'
import express from 'express'

import transactionsRouter from './routes/transactions.route'

const app = express()

app.use(cors())
app.use(
  cors({
    origin: 'https://wallet-transaction-history-app.vercel.app',
  }),
)

app.get('/', (_, res) => res.send('Server successfully running ✅'))
app.use('/transactions', transactionsRouter)

export default app
