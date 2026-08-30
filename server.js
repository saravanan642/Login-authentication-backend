require("dotenv").config({ quiet: true });

const Express = require("express");
const mongoose = require("mongoose");

const listen = require("./config/listen");
const Databse = require("./config/databse");

const IndexRouter = require("./Routers/Authrouter");

const app = Express();

app.use(Express.json());

app.use(IndexRouter);

listen(app);

Databse(mongoose);