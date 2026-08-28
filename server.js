require("dotenv").config({quiet: true})
const Express = require("express")

const mongoose = require("mongoose");

const listen = require("./config/listen");
const Databse = require("./config/databse");

const app = Express();

listen(app);
Databse(mongoose);



