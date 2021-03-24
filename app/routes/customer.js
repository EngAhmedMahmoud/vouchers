const resource = `${require("../config/setting.json").API_URL}/customers`;
const validator = require("../utils/validator");
let validate = validator.requestValidator;
let controller = require("../controllers/vouchers");
module.exports=(app)=>{
  /**
   * @swagger
   * /api/v1/customers/{customer}/vouchers:
   *    get:
   *       description: This API fetches all valid vouchers in the system which populated with offers and customer for specific customer
   *       consumes:
   *       - application/json
   *       produces:
   *       - application/json
   *       parameters:
   *            - in: path
   *              name: customer
   *              type: string
   *              required: true
   *              description: This represent customer id
   *       responses:
   *          200:
   *              description: every thing is ok and vouchers fetched successfully
   *          400:
   *              description: bad request which means that something is missed and not processed correctly
   *          500:
   *              description: Internal server error which means that there are some errors happened on server side
   * 
   *    
   */
    app.get(`${resource}/:customer/vouchers`,validate([{
        key: "customer",
        type: "params",
        required: true,
        validatorFunctions: ["objectId"],
    }]), async(req,res,next)=>{
        let customer = req.params&&req.params.customer;
        let {response,code}= await controller.all({customer,isUsed:false});
        return res.status(code).json(response);
    });
}