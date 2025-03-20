import express from 'express'
import connectDB from './database'
import { CreateRouter } from './router/users'



const app = express()
const PORT = 3000

connectDB()

app.use(express.json())

app.use(
  CreateRouter
)
app.listen(PORT, () => {
  console.log(`Example app leistening on port ${PORT}`)
})