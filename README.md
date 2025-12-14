# E-Commerce Application

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. The application includes a customer-facing frontend, an admin dashboard for product management, and a robust backend API with payment integration.

## 📋 Project Overview

This e-commerce application is a complete solution with three main modules:

- **Frontend**: Customer-facing web interface for browsing and purchasing products
- **Admin Panel**: Administrative dashboard for managing products, orders, and inventory
- **Backend API**: Express.js server with MongoDB database and payment gateway integration

## 🏗️ Project Structure

```
ECOMMERCE-APP/
├── frontend/          # Customer-facing React application
├── admin/             # Admin dashboard React application
└── backend/           # Node.js/Express API server
```

## 🚀 Tech Stack

### Frontend & Admin

- **React** (v19.1.0) - UI library
- **React Router DOM** (v7.6.1) - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** (v4.1.8) - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Toastify** - Notification system
- **Lucide React** (Admin only) - Icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express** (v5.1.0) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.15.1) - MongoDB ODM
- **Cloudinary** (v2.6.1) - Image hosting and manipulation
- **JWT** - Authentication and authorization
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cors** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Payment Integration

- **Paystack** - Primary payment gateway for online transactions
- **Stripe** - Secondary payment option
- **Razorpay** - Additional payment provider
- **React Paystack** - Paystack integration for React

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account for image uploads
- Paystack account for payment processing

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
PAYSTACK_KEY_SECRET=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. Start the server:

```bash
npm run server
```

The server will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

4. Start the development server:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Admin Panel Setup

1. Navigate to the admin directory:

```bash
cd admin
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the admin directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

4. Start the development server:

```bash
npm run dev
```

The admin panel will run on `http://localhost:5174` (or next available port)

## 🔐 Authentication

### User Authentication

- Users can register and login with email and password
- Passwords are hashed using bcrypt for security
- JWT tokens are issued upon successful login
- Tokens are stored in browser localStorage
- Each protected API request includes the JWT token in the authorization header

### Admin Authentication

- Separate admin login system
- Admin credentials can be created using the `create-admin` script:

```bash
npm run create-admin
```

- Admin routes are protected with middleware that validates JWT and admin role

## 📊 Database Schema

### User Model

- Email (unique)
- Password (hashed)
- Name
- Phone
- Address
- City
- State
- Zip Code
- Country
- CreatedAt timestamp

### Product Model

- Name
- Description
- Price
- Images (array of Cloudinary URLs)
- Category (Men, Women, Unisex)
- SubCategory (Topwear, Bottomwear, Winterwear)
- Brand/Collection
- Sizes (S, M, L, XL, XXL)
- BestSeller (boolean flag)
- Date

### Order Model

- User ID (reference)
- Items (array with product details)
- Amount (total price)
- Status (Pending, Processing, Shipped, Delivered, Cancelled)
- PaymentMethod (COD, Paystack, Stripe, Razorpay)
- Payment (boolean - payment complete status)
- Address (delivery address)
- Date
- OrderId (unique identifier)

### Cart Items

- User ID
- Product ID
- Size
- Quantity

## 🛒 Workflow & Features

### Customer Journey

#### 1. Browse Products

- Users visit the frontend and view the product collection
- Products are organized by categories (Men, Women, Unisex)
- Each category has collections/brands
- Users can filter by:
  - Category
  - Brand/Collection
  - SubCategory
  - Price range
  - Search by product name

#### 2. Product Details

- Click on a product to view detailed information
- See product images, description, price, available sizes
- Bestseller badge for popular items
- Read shipping and care instructions

#### 3. Shopping Cart

- Add products with selected size to cart
- Adjust quantity in cart
- View cart total with tax calculation
- Persistent cart (stored in context and localStorage)

#### 4. Checkout

- Enter delivery address
- Select payment method:
  - **Cash on Delivery (COD)**: Pay when item is delivered
  - **Paystack**: Online payment via Paystack gateway

#### 5. Payment Processing

- **Paystack Flow**:

  - User clicks "Pay with Paystack"
  - Redirected to Paystack payment page
  - Enter payment details (card/mobile money)
  - After successful payment, redirected to verification page
  - Backend verifies payment with Paystack API
  - Order is confirmed and payment status updated

- **COD Flow**:
  - Order is created with pending payment status
  - Customer receives order confirmation
  - Pays cash upon delivery

#### 6. Order Tracking

- Users can view their orders
- Track order status in real-time
- View order history and details

### Admin Operations

#### 1. Admin Login

- Secure login with admin credentials
- Access to admin dashboard

#### 2. Add Products

- Form to create new products with:
  - Product name and description
  - Upload up to 4 product images
  - Set category (Men, Women, Unisex)
  - Select subcategory (Topwear, Bottomwear, Winterwear)
  - Specify brand/collection
  - Set price
  - Select available sizes
  - Mark as bestseller
- Images are uploaded to Cloudinary
- Product data stored in MongoDB

#### 3. View Products

- List all products in the system
- See product details, images, prices
- Quick access to edit/delete products

#### 4. Remove Products

- Delete products from inventory
- Remove associated images from Cloudinary
- Update database records

#### 5. Manage Orders

- View all customer orders
- Track order status
- Update order status (Pending → Processing → Shipped → Delivered)
- View customer information and delivery address

## 🔌 API Endpoints

### User Routes (`/api/user`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /verify` - Verify JWT token

### Product Routes (`/api/product`)

- `POST /add` - Add new product (admin only)
- `GET /list` - Get all products
- `POST /remove` - Remove product (admin only)
- `POST /single` - Get single product details

### Cart Routes (`/api/cart`)

- `POST /add` - Add item to cart
- `POST /remove` - Remove item from cart
- `POST /get` - Get user's cart

### Order Routes (`/api/order`)

- `POST /place` - Create new order (COD)
- `POST /placepaystack` - Create order with Paystack payment
- `POST /verify` - Verify Paystack payment
- `POST /userorders` - Get user's orders
- `GET /list` - Get all orders (admin only)
- `POST /status` - Update order status (admin only)

## 💳 Payment Gateway Integration

### Paystack

- **Implementation**: Backend initializes payment via Paystack API
- **Flow**:

  1. Frontend sends order details to backend
  2. Backend creates order in database with "pending" status
  3. Backend calls Paystack API to initialize transaction
  4. Paystack returns authorization URL
  5. Frontend redirects user to Paystack payment page
  6. After payment, Paystack redirects to callback URL with transaction reference
  7. Backend verifies payment using transaction reference
  8. If verified, order status updated to "completed"

- **Environment Variables**:
  - `PAYSTACK_KEY_SECRET` - Secret key for API calls
  - `PAYSTACK_PUBLIC_KEY` - Public key for frontend integration

### Cash on Delivery (COD)

- Simple order creation without payment verification
- Order status: Pending (awaiting payment)
- Payment marked as complete when order is delivered by admin

## 🖼️ Image Management

### Cloudinary Integration

- All product images are uploaded to Cloudinary
- Benefits:
  - Automatic image optimization and CDN distribution
  - Multiple image formats and sizes
  - URL-based image management (no local storage)
  - Scalable image hosting

### Upload Process

1. User selects image in admin panel
2. Multer middleware processes the file
3. File is uploaded to Cloudinary
4. Cloudinary returns secure URL
5. URL is stored in product document in MongoDB

## 🔐 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Authentication**: Token-based authentication for protected routes
- **CORS**: Cross-Origin Resource Sharing configured for security
- **Environment Variables**: Sensitive data stored in .env files
- **Admin Middleware**: Protected admin routes with role verification
- **Auth Middleware**: JWT verification on protected endpoints

## 🚀 Deployment

### Frontend & Admin

Built and deployed using Vercel's automatic deployment from git push.

- `vercel.json` configuration included for custom build settings

### Backend

Can be deployed to:

- Heroku
- Railway
- AWS
- DigitalOcean
- Any Node.js hosting platform

## 🛠️ Available Scripts

### Backend

```bash
npm run server    # Start server with nodemon (auto-reload)
npm start         # Start server normally
npm run create-admin  # Create admin user
```

### Frontend & Admin

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 📱 Responsive Design

- Mobile-first design approach
- Fully responsive using Tailwind CSS
- Optimized for:
  - Mobile devices (320px and up)
  - Tablets (768px and up)
  - Desktop (1024px and up)

## 🎯 Key Features

✅ User authentication and authorization
✅ Product browsing with advanced filtering
✅ Shopping cart functionality
✅ Multiple payment methods (COD, Paystack)
✅ Order management and tracking
✅ Admin dashboard for inventory management
✅ Image upload and management via Cloudinary
✅ Responsive design for all devices
✅ JWT-based security
✅ Real-time order status updates

## 🤝 Contributing

To contribute to this project:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Create a pull request with description

## 📄 License

ISC

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ by Abdulsamad25**
