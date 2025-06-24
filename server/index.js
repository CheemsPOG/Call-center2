const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const agentStatusRoutes = require("./routes/agentStatusRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/agent-status", agentStatusRoutes);
app.use("/notifications", notificationRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
