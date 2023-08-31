const express=require("express");
const colors=require("colors");
const moragan=require("morgan");
const dotenv=require("dotenv");
const cors=require('cors')
// const { connect } = require('mongoose');
const connectDB = require('./config/db');

dotenv.config();

//mongodb connection
connectDB();

//rest object
const app=express();

//middlewares
app.use(cors({
    origin: 'http://localhost:3000',
  }));
app.use(express.json());
app.use(moragan('dev'));

//routes
app.use('/api/v1/user',require('./routes/userRoutes'));

app.use('/api/v1/admin',require('./routes/adminRoutes'));
//routes setup
// app.get("/",(req,res)=>{
//     res.status(200).send({
//         message:"server running",
//     });
// });

//port
const port=process.env.PORT || 8080;

//listen port
app.listen(port,()=>{
    console.log(
        `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white
    );
});