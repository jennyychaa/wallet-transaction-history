import cors from 'cors'
import express from 'express'

import transactionsRouter from './routes/transactions.route'

const app = express()

app.use(cors())
app.use(
  cors({
<<<<<<< deployment-updates
    origin: 'https://wallet-transaction-history-app.vercel.app',
=======
    origin: 'https://wallet-transaction-history-server.vercel.app',
>>>>>>> main
  }),
)
app.use('/transactions', transactionsRouter)

export default app
