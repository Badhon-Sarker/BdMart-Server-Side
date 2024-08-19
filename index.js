const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = 5000


// middleware

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        
        
      ],
      credentials: true,
      optionSuccessStatus: 200,
}))
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello bro!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})