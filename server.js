const express = require("express");
const connectDB = require("./config/db");

const app = express();

//MongoDb connection
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api/products", require("./routes/api/products"));
app.use("/api/getProductsById", require("./routes/api/getProductsById"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
