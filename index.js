const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT;

//create express server
const app = express();

//connect
dbConnection();

//Public path
app.use(express.static("public"));

//CORS
app.use(cors({ origin: true, credentials: true }));

//Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routing
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
//requests Listener
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
