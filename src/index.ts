import express from 'express'
import { config }  from 'dotenv'
config()
const app = express()


app.listen(process.env.PORT, (): void => {
    console.log(`server running at Port: ${process.env.PORT}`)
})