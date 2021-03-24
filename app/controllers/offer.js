const offerModel = require("../models/offers");
class Offer{
    /**
     * Get offer details by its id
     * @param {String} id 
     * @returns {Object}
     */
    async get(id){
        try{
            return await offerModel.findById(id);
        }catch(err){
            return false;
        }
        
    }
}
module.exports=new Offer();