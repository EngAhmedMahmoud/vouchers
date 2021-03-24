const mongoose = require("mongoose");
const config = require("../config/setting.json")
const dbUrl = process.env.dbUrl||config.DATABASE.REMOTE;
const seed = require("./dbSeed");
mongoose.connect(dbUrl,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
    console.log("DB connected successfully");
    await seed.saveCustomers();
    await seed.saveOffers();
}).catch((err)=>{
    console.log("DB err",err)
});