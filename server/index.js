const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const employeeRoutes = require("./routes/employeeRoutes");

app.use("/employees", employeeRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
