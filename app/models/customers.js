"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Customer = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
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
module.exports = mongoose.model("Customer",Customer,"customers");