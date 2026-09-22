const dns = require("dns");
dns.setServers(["8.8.8.8"]);


require ("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { protectRoute } = require("./Middlewares/AuthMiddleware");
const { MONGO_URL} = process.env;


mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

const {HoldingsModel} = require("./model/Holdingsmodel");
const {PositionsModel} = require("./model/PositionsModel");
const {OrdersModel} = require("./model/OrdersModel");
const User = require("./model/UsersModel");

const PORT = process.env.PORT || 3002;
// const url = process.env.MONGO_URL;

const app= express();



const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", authRoute);

// app.get("/addHoldings", async(req,res)=>{
//     let tempHoldings=[
//   {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
// ];
//  tempHoldings.forEach((item)=>{
//    let newHolding = new HoldingsModel({
//     name:item.name,
//     qty:item.qty,
//     avg:item.avg,
//     price:item.price,
//     net:item.day,
//     day:item.day
//    });

//    newHolding.save();
//  });
//  res.send("Done!")
// })

// app.get("/addPositions", async(req,res)=>{
//     const tempPositions = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

// tempPositions.forEach((item)=>{
//     let newPositions = new PositionsModel({
//          product: item.product,
//          name: item.name,
//          qty: item.qty,
//          avg: item.avg,
//          price: item.price,
//          net: item.net,
//          day: item.day,
//          isLoss: item.isLoss
//     });
//     newPositions.save();
// })

// res.send("allDone!");
// })

app.get("/me", protectRoute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

app.post("/newOrder", protectRoute,async (req, res) => {
  console.log("REQUEST BODY:", req.body);
  try {
    const { name, qty, price, mode } = req.body;

    const newQty = Number(qty);
    const newPrice = Number(price);

    // =========================
    // BUY
    // =========================
    if (mode === "BUY") {

      // Save BUY order
      const newOrder = new OrdersModel({
        userId: req.user._id,
        name,
        qty: newQty,
        price: newPrice,
        mode: "BUY",
      });

      await newOrder.save();

      // Check if stock already exists in holdings
      const existingHolding = await HoldingsModel.findOne({ 
        userId:req.user._id,
        name });

      if (existingHolding) {

        const oldQty = Number(existingHolding.qty);
        const oldAvg = Number(existingHolding.avg);

        const totalQty = oldQty + newQty;

        const newAvg =
          ((oldQty * oldAvg) + (newQty * newPrice)) / totalQty;

        existingHolding.qty = totalQty;
        existingHolding.avg = newAvg;
        existingHolding.price = newPrice;

        await existingHolding.save();

      } else {

        // First time buying this stock
        const newHolding = new HoldingsModel({
          userId: req.user._id,
          name,
          qty: newQty,
          avg: newPrice,
          price: newPrice,
          net: "0%",
          day: "0%",
        });

        await newHolding.save();
      }

      return res.status(200).json({
        success: true,
        message: "BUY order placed successfully",
      });
    }


    // =========================
    // SELL
    // =========================
    if (mode === "SELL") {

      // 1. Check whether stock exists
      const existingHolding = await HoldingsModel.findOne({ 
        userId: req.user._id,
        name });

      if (!existingHolding) {
        return res.status(400).json({
          success: false,
          message: `You don't own ${name}`,
        });
      }


      // 2. Check available quantity
      const availableQty = Number(existingHolding.qty);

      if (newQty > availableQty) {
        return res.status(400).json({
          success: false,
          message: `Not enough quantity. You have only ${availableQty} shares of ${name}`,
        });
      }


      // 3. Save SELL order
      const newOrder = new OrdersModel({
        userId: req.user._id,
        name,
        qty: newQty,
        price: newPrice,
        mode: "SELL",
      });

      await newOrder.save();


      // 4. Reduce holding quantity
      const remainingQty = availableQty - newQty;

      if (remainingQty === 0) {

        // No shares left → remove holding
        await HoldingsModel.deleteOne({ _id: existingHolding._id });

      } else {

        // Shares still remaining
        existingHolding.qty = remainingQty;

        await existingHolding.save();
      }


      return res.status(200).json({
        success: true,
        message: "SELL order placed successfully",
      });
    }


    // =========================
    // INVALID MODE
    // =========================

    return res.status(400).json({
      success: false,
      message: "Invalid order mode",
    });

  } catch (error) {

    console.log("ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/addHoldings", protectRoute, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({
      userId: req.user._id,
    });

    res.json(holdings);
  } catch (error) {
    console.log("HOLDINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch holdings",
    });
  }
});

app.get("/addPositions", protectRoute, async (req, res) => {
  try {
    const positions = await PositionsModel.find({
      userId: req.user._id,
    });

    res.json(positions);
  } catch (error) {
    console.log("POSITIONS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch positions",
    });
  }
});

app.get("/allOrders", protectRoute, async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      userId: req.user._id,
    });

    res.json(orders);
  } catch (error) {
    console.log("ORDERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    //  mongoose.connect(url)
    //     .then(() => {
    //         console.log("MongoDB connected");
    //     })
    //     .catch((err) => {
    //         console.log("MongoDB connection failed:", err);
    //     });
})