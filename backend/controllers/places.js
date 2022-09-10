import Place from "../models/places.js";
import mongoose from "mongoose";

//get all data
export const getalldata =async (req,res)=>{
    const workouts =await Place.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get single data
export const getsingledata =async (req,res)=>{
    const {id} = req.params   
    //if id not found
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"NO SUCH DATA"})
    } 
    const workout =await Place.findById(id)
    if(!workout){
        return res.status(404).json({error:"No such Data"})
    }
    res.status(200).json(workout)
}

//creat new data to db
export const createdata = async (req,res)=>{
    const {placetitle, placedescription, placelocation ,placename ,placetags , placeimage,placerating } = req.body
    try{
     const workout = await Place.create({placetitle, placedescription, placelocation, placename,placetags ,placeimage ,placerating})
     res.status(200).json(workout)
    }
    catch(error){
     res.status(400).json({error:error.message})
    }
}

//delete data
export const deletedata = async (req,res)=>{
    const {id} = req.params 
   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"NO SUCH DATA"})
    } 
    const workout= await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(400).json({error:"No such Data"})
    }
    res.status(200).json(workout)
   

}


//update data
export const updatedata = async (req,res)=>{
    const {id} = req.params 
   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"NO SUCH DATA"})
    } 
    const workout= await Place.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!workout){
        return res.status(400).json({error:"No such Data"})
    }
    res.status(200).json(workout)
   

}



