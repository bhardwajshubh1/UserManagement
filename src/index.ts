import { config } from 'dotenv'
config()
import express, { Request, Response } from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import { elasticHealthCheck } from './config/elasticsearch.config'
import { ErrorResponseType } from './interfaces/common.interface'
import appRoutes from './routes/index'

const app = express()

app.use(express.json())

elasticHealthCheck()

app.use(
    OpenApiValidator.middleware({
      apiSpec: './UserManagement.yaml',
      validateRequests: true,
      validateResponses: false,
    }),
  )

app.use('/api/v1', appRoutes)

app.use('*', (req: Request, res: Response) => {
  const responseObject: ErrorResponseType = {
    code: 404,
    message: 'Route not Found'
  }

  res.status(404).json(responseObject)
})

app.listen(process.env.PORT, (): void => {
    console.log(`server running at Port: ${process.env.PORT}`)
})