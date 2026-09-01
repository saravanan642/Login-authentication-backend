require("dotenv").config({ quiet: true });

const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const listen = require("./config/listen");
const Databse = require("./config/databse");


const IndexRouter = require("./Routers/Authrouter");

const app = Express();
app.use(cors());
app.use(Express.json());

app.use(IndexRouter);

listen(app);

Databse(mongoose);