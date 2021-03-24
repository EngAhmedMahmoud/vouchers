const seeder = require("../config/seed.json");
const Customer = require("../models/customers");
const Offer = require("../models/offers");
/**
 * save customers in db
 * if there is no data in customer model it will seed data from seeder
 */
const saveCustomers =async ()=>{
    try{
        let check = await Customer.find();
        if(check.length){
            console.log(check.length,'customers in db') 
        }else{
            await Customer.insertMany(seeder.customers);
            console.log("seeding customers done successfully :)")
        }
    }catch(err){
        //here we can log error in file for monitor performance and finding bugs
        console.log(err)
    }
    
}
/**
 * save offers in db
 * if there is no data in offer model it will seed data from seeder
 */
const saveOffers=async()=>{
    try{
        let check = await Offer.find();
        if(check.length){
            console.log(check.length,'offers in db') 
        }else{
            await Offer.insertMany(seeder.offers);
            console.log("seeding offers done successfully :)")
        }
    }catch(err){
        //here we can log error in a file for monitor performance and finding bugs
        console.log(err)
    }
   
}
module.exports={
    saveCustomers,saveOffers
}