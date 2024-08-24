"use strict";

require("dotenv").config();
const app = require("./app");
const { default: mongoose } = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then((_) => {
  console.log("MongoDB connection successful!");
});

mongoose.set("debug", true);
mongoose.set("debug", { color: true });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
