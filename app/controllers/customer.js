const customerModel = require("../models/customers");
class Customer{
    /**
     * Get customer details by id
     * @param {String} id 
     * @returns {Object} 
     */
    async get(id){
        try{
            return await customerModel.findById(id);
        }catch(err){
            return false;
        }
    }
}
module.exports=new Customer();