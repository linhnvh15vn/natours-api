const dotenv = require("dotenv");
const app = require("./app");
const { default: mongoose } = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then((_) => {
  console.log("MongoDB connection successful!");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
