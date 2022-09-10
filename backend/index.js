import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
// import placeRouter from "./routes/place.js";
import placesRouter from "./routes/places.js"
const port = 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json({limit:"40mb", extended:true}));
app.use(express.urlencoded({limit:"40mb", extended:true}));
app.use(cors());

//signup api
app.use("/users", userRouter); 
// 
//creation of places
// app.use("/places", placeRouter); 
//

//new creation
app.use("/placess", placesRouter); 
const MONGODB_URL = "mongodb+srv://wimtiaz14:qwerty12345@cluster0.14t6exh.mongodb.net/?retryWrites=true&w=majority"

//mongodb+srv://wimtiaz14:<password>@cluster0.14t6exh.mongodb.net/?retryWrites=true&w=majority
// app.get("/",(req,res)=>
// {
//     res.send("Hello Express");
// })

// app.listen(port,()=>
// {
//     console.log(`Backend running on port ${port}`)
// })

mongoose.connect(MONGODB_URL)
.then(()=>{
    app.listen(port,() =>{
        console.log(`server running on port ${port}`)
    })
}).catch((error)=>console.log(`${error} Not Connect`))