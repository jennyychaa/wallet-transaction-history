import { Request, Response } from 'express'
import { Router } from 'express'

import transactionController from '../controllers/transactions.controller'

const transactionsRouter = Router()

transactionsRouter.get('/:address', async (req: Request, res: Response) => {
  const { address } = req.params || {}
  const { cursor } = req.query || {}

  try {
    const data = await transactionController.getTransactionHistory(
      address,
      cursor,
    )
    res.status(200)
    res.json(data)
  } catch (e) {
    console.error(e)
    res.status(500).send({
      message: 'There was an error fetching the transaction history...',
      e,
    })
  }
})

export default transactionsRouter
