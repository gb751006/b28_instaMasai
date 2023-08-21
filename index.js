const express = require('express');
const {userRouter} = require('./routes/userRoutes')
const {postRouter} = require('./routes/postRoutes')
const cors = require("cors");
const {connection} = require('./db')
require('dotenv').config()
const app = express();

app.use(express.json());
app.use(express.json())

app.use(cors());

app.use("/users",userRouter);
app.use("/posts",postRouter);















app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log(`serever running at ${process.env.port}`)
        console.log("conneted to db")
    } catch (error) {
        console.log(error.message)
    }
})













