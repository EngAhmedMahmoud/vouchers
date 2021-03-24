module.exports=(app)=>{
    require("./../middlewares/auth")(app)
    require("./voucher")(app);
    require("./customer")(app);
    require("./404")(app)
}