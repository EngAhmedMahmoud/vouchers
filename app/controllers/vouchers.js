"use strict";
const voucherModel = require("../models/vouchers");
const offerController = require("./offer");
const customerController = require("./customer");
const apiRes = require("../utils/apiResponse");
const apiMsgCode = require("../utils/resMsgCode");
class Voucher{
    /**
     * Voucher.create is a function used for creating customer vouchers
     * voucher code generated randomly 
     * expireAt represent number of days this number converted into milliseconds
     * @param {Object} voucher customer,offer,expireAt
     * @returns {Object} response in case of success or fail
     */
    async create(voucher){
        try{
        let {offer,customer,expireAt} = voucher;
        let checkOffer=await offerController.get(offer);
        if(!checkOffer){
            return apiRes(null,"Offer not exist",apiMsgCode.BAD_REQ.code);
        }
        let checkCustomer=await customerController.get(customer);
        if(!checkCustomer){
            return apiRes(null,"Customer not exist",apiMsgCode.BAD_REQ.code);
        }
        expireAt = this.calcExpireAt(expireAt);
        let code = this.generateCode(8);
        let newVoucher = new voucherModel({
            offer,
            customer,
            code,
            expireAt
        });
        let saved=await newVoucher.save();
        return apiRes(saved,null,apiMsgCode.CREATED.code);
    }catch(err){
        console.log(err)
        return apiRes(null,apiMsgCode.SERVER_ERROR.msg,apiMsgCode.SERVER_ERROR.code);
    }
    }
    /**
     * Get all vouchers in the system if the default condition is passed
     * incase of condition is object of {isUsed, customer} it returns valid vouchers for specific customer
     * @param {Object} condition 
     * @returns {Object} response in case of success or fail
     */
    async all(condition={}){
        try{
            let vouchers = await voucherModel.find(condition).populate("offer",
            "title discount").populate("customer","email");
            return apiRes(vouchers,null,apiMsgCode.OK.code);
        }catch(err){
            console.log(err);
            return apiRes(null,apiMsgCode.SERVER_ERROR.code,apiMsgCode.SERVER_ERROR.code);

        }
    }
    /**
     * This function used for generating a random string based on length passed to function
     * @param {Number} length 
     * @returns {String} code
     */
    generateCode(length=8) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    /**
     * This function take number of days converted into ms
     * Then convert the current date in ms 
     * finally summation will be the validity of voucher
     * @param {Number} expireAt 
     * @returns {Number} total number of ms for voucher validity
     */
    calcExpireAt(expireAt){
        let expireAtInMS = expireAt*24*60*60*1000;
        let currentTimeInMS = new Date().getTime();
        return expireAtInMS+currentTimeInMS;
    }
    /**
     * based on customer id and voucher code 
     * if voucher code is valid the response will be the discount and offer title
     * and voucher used only for one time if customer try again err msg will appears to him
     * if voucher not valid it display error for customer
     * @param {String} customer
     * @param {String} code 
     * @returns {Object} api response in case of success or fail
     */
    async redeem({customer,code}){
        try{
            let checkCustomer=await customerController.get(customer);
            if(!checkCustomer){
                return apiRes(null,"Customer not exist",apiMsgCode.BAD_REQ.code);
            }
            let voucher = await voucherModel.findOne({code,customer,isUsed:false}).populate("offer","title discount");
            if(voucher){
                //check expire
                let currentTimeInMS = new Date().getTime();
                if(currentTimeInMS>voucher.expireAt){
                    return apiRes(null,"This voucher expire",apiMsgCode.BAD_REQ.code); 
                }else{
                   await voucherModel.findByIdAndUpdate(voucher._id,{isUsed:true,usedAt:new Date().getTime()});
                   let data = {
                       title:voucher["offer"].title,
                       msg:`congratulation you have got ${voucher["offer"].discount}%`,
                       discount:voucher["offer"].discount
                   }
                   return apiRes(data,null,apiMsgCode.OK.code);
                }
            }else{
                return apiRes(null,"Invalid voucher",apiMsgCode.BAD_REQ.code); 
            }
        }catch(err){
            console.log(err)
            return apiRes(null,"Error happened during redeem voucher",apiMsgCode.BAD_REQ.code);
        }
    }
     
}
module.exports=new Voucher();