import { config } from 'dotenv'
config()
import express from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import appRoutes from './routes/index'

const app = express()

app.use(express.json())

app.use(
    OpenApiValidator.middleware({
      apiSpec: './UserManagement.yaml',
      validateRequests: true,
      validateResponses: false,
    }),
  )

app.use('/api/v1', appRoutes)

app.listen(process.env.PORT, (): void => {
    console.log(`server running at Port: ${process.env.PORT}`)
})