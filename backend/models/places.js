import mongoose from "mongoose";

const placeSchema = mongoose.Schema({
   placetitle:{
        type:String,
      
    },
    placedescription:{
        type:String,
        
    },
    placelocation:{
        type:Number,
      
    },
    placename:{
        type:String,
      
    },
    placetags:{
        type:[String],
        
    },
    placeimage:{
        type:String,
      
    },
    c:{
        type: Number
    }
   

},{timestamps:true});

//model

export default mongoose.model("places",placeSchema);


