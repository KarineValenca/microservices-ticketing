import mongoose from 'mongoose'
import { DatabaseConnectionError } from './errors/database-connection-error'
import { app } from './app'

const start = async() => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-svc:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('Connected to mongodb')
  }catch (err) {
    throw new DatabaseConnectionError()
  }
  
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!")
  })
}

start()