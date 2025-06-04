import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import axios from "axios";

//global variables
const currency = "usd";
const deliveryCharge = 10;

//GATEWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing Orders using CASH ON dELIVERY
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//placing order using stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      // success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      // cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      success_url: `${req.headers.origin}/verify?gateway=stripe&orderId=${newOrder._id}&success=true`,
      cancel_url: `${req.headers.origin}/verify?gateway=stripe&orderId=${newOrder._id}&success=false`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//placing order using paystack
const placeOrderPaystack = async (req, res) => {
  try {
    const { userId, items, amount, address, email } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Paystack",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await new orderModel(orderData).save();

    // Use origin from headers or fallback to hardcoded URL
    const frontendUrl = req.headers.origin || "http://localhost:5173"; // fallback your dev frontend URL

    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        metadata: {
          orderId: newOrder._id,
          userId,
        },
        callback_url: `${frontendUrl}/verify?orderId=${newOrder._id}&gateway=paystack`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_KEY_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (paystackResponse.data.status) {
      return res.json({
        success: true,
        authorization_url: paystackResponse.data.data.authorization_url,
        order: newOrder,
      });
    } else {
      return res.json({ success: false, message: "Paystack init failed" });
    }
  } catch (error) {
    console.log("Paystack error:", error.response?.data || error.message);
    res.json({ success: false, message: error.message });
  }
};

//Verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Verify Paystack
const verifyPaystack = async (req, res) => {
  try {
    const { reference, orderId, userId } = req.body;

    // Step 1: Verify payment with Paystack
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_KEY_SECRET}`,
      },
    });

    const paystackData = response.data;

    if (paystackData.status && paystackData.data.status === "success") {
      // Step 2: Update order as paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      return res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment not successful" });
    }
  } catch (error) {
    console.log("Paystack verification error:", error);
    res.json({ success: false, message: error.message });
  }
};


//All orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//All orders data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update order staus from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderPaystack,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyPaystack
};
