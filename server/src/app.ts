import cors from 'cors'
import express from 'express'

import transactionsRouter from './routes/transactions.route'

const app = express()

app.use(cors())
app.use('/transactions', transactionsRouter)

export default app
