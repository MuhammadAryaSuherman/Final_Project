const express = require('express');
const cors = require("cors");
const app = express();
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');
const productRoutes = require('./routes/produk');
const orderRoutes = require("./routes/order")

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:5173",
      allowedHeaders:
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      optionsSuccessStatus: 200,
    })
  );
  

app.use("/uploads", express.static("uploads"));
app.use('/', userRoutes);
app.use('/', reviewRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
