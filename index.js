const bodyParser = require("body-parser");
const express = require("express");
const dbConnection = require("./config/dbConnection");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
dbConnection();

app.use("/", userRoutes);
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
