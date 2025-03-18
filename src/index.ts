import express, {Response, Request} from 'express'
import { createServer } from 'http'


const app = express()
const PORT = 3000


app.use(express.json())

app.get('/', (req: Request, res: Response) =>{
  res.send('Hello World!!')
}
)
app.listen(PORT, () => {
  console.log(`Example app leistening on port ${PORT}`)
})