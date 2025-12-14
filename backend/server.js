import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'
import analyticsRouter from './routes/analyticsRoute.js'
import adminRouter from './routes/adminRoute.js'

//App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//Middlewares
app.use(express.json())

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://www.shopabasi.com',
  'https://shopabasi.com',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
].filter(Boolean)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

// Trust proxy to get correct IP addresses
app.set('trust proxy', true)

//API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req,res)=>{
  res.send("API working")
})

app.listen(port, ()=> console.log("Server started on PORT : "+ port))