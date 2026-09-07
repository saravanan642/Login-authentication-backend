require("dotenv").config({ quiet: true });

const Express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const Session = require("express-session");

const MongoDBSession = require("connect-mongodb-session")(Session);

const listen = require("./config/listen");

const Databse = require("./config/databse");

const IndexRouter = require("./Routers/Authrouter");

const app = Express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(Express.json());


// MongoDB Session Store

const store = new MongoDBSession({

    uri: process.env.MONGO_URL,

    collection: "userSessions"

});


// Session Middleware

app.use(
    Session({

        secret: process.env.Session_Key,

        resave: false,

        saveUninitialized: false,

        store: store

    })
);


// Router MUST be after Session

app.use(IndexRouter);


// Database and Server

Databse(mongoose);

listen(app);