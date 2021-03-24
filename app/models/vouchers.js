"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Voucher = new Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    isUsed:{
        type:Boolean,
        default:false,
    },
    customer:{
        type:Schema.Types.ObjectId,
        ref:"Customer"
    },
    offer:{
        type:Schema.Types.ObjectId,
        ref:"Offer"
    },
    usedAt:{
        type:Number
    },
    expireAt:{
        type:Number
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
module.exports = mongoose.model("Voucher",Voucher,"vouchers");