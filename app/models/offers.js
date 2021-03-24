"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Offer = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    termsOfUse:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Number,
        default: Date.now
    },
    updatedAt:{
        type:Number,
        default: Date.now
    }
});
module.exports = mongoose.model("Offer",Offer,"offers");