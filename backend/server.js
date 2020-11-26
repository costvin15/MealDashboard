import express from 'express'
import mongoose from 'mongoose'

import routes from './routes'

// mongoose.connect('mongodb://localhost:27017/mealdashboard', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }, error => console.error(error))

const app = express()

app.use(express.json())
app.use('/api', routes)

app.listen(8080, () => console.log('🚀 Server running at 8080'))
