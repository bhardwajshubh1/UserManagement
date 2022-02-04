import express from 'express'
import { config }  from 'dotenv'
import * as OpenApiValidator from 'express-openapi-validator'
config()
const app = express()

app.use(
    OpenApiValidator.middleware({
      apiSpec: './UserManagement.yaml',
      validateRequests: true,
      validateResponses: false,
    }),
  )

app.listen(process.env.PORT, (): void => {
    console.log(`server running at Port: ${process.env.PORT}`)
})