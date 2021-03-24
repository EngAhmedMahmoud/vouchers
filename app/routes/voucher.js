const resource = `${require("../config/setting.json").API_URL}/vouchers`;
const validator = require("../utils/validator");
let validate = validator.requestValidator;
let controller = require("../controllers/vouchers");
module.exports=(app)=>{
  /**
   * @swagger
   * /api/v1/vouchers:
   *    get:
   *       description: This API fetches all vouchers in the system which populated with offers and customers
   *       consumes:
   *       - application/json
   *       produces:
   *       - application/json
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
    app.get(resource, async(req,res,next)=>{
        let {response,code}= await controller.all();
        return res.status(code).json(response);
    });
  /**
   * @swagger
   * /api/v1/vouchers:
   *    post:
   *        description: This end-point for admin role that allow admin to create vouchers for customers
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: body
   *          name: voucher fields
   *          schema:
   *            $ref: '#/definitions/voucherFields'
   *        responses:
   *            200:
   *                description: everything is ok
   *            201:
   *                description: resource created successfully
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   * definitions:
   *     voucherFields:
   *        type: object
   *        required:
   *        - offer
   *        - customer
   *        - expireAt
   *        properties:
   *            offer:
   *                    type: string
   *                    description: This represent offer id 
   *                    example: 6053bb132571e53c32f34e62
   *                    
   *            customer:
   *                    type: string
   *                    description: This represent customer id
   *                    example: 6053bb122571e53c32f34e4f
   *            expireAt:
   *                    type: number
   *                    description: This represent number of days
   *                    example: 5
   */

    app.post(resource,validate([{
        key: "offer",
        type: "body",
        required: true,
        validatorFunctions: ["objectId"]
      },
      {
        key: "customer",
        type: "body",
        required: true,
        validatorFunctions: ["objectId"],
      },
      {
        key: "expireAt",
        type: "body",
        required: true,
        validatorFunctions: ["isNumber"],
      }
    ]),async(req,res,next)=>{
        let {customer,offer,expireAt}=req.body;
        let {response,code}=await controller.create({customer,offer,expireAt});
        return res.status(code).json(response);
      } 
    );
  /**
   * @swagger
   * /api/v1/vouchers/redeem:
   *    post:
   *        description: This end-point for customer role that allow cutomer to redeem vouchers
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        parameters:
   *        - in: body
   *          name: voucher redeem
   *          schema:
   *            $ref: '#/definitions/redeemFields'
   *        responses:
   *            200:
   *                description: everything is ok
   *            400:
   *                description: bad request
   *            500:
   *                description: internal server error
   * definitions:
   *     redeemFields:
   *        type: object
   *        required:
   *        - customer
   *        - code
   *        properties: 
   *            customer:
   *                    type: string
   *                    description: This represent customer id
   *                    example: 6053bb122571e53c32f34e4f
   *            code:
   *                    type: string
   *                    description: This represent voucher code
   *                    example: 5w23bcv
   */

    app.post(`${resource}/redeem`,validate([
      {
        key: "customer",
        type: "body",
        required: true,
        validatorFunctions: ["objectId"],
      },
      {
        key: "code",
        type: "body",
        required: true,
        validatorFunctions: [],
      }
    ]),async(req,res,next)=>{
        let {code,customer}=req.body;
        let response=await controller.redeem({code,customer});
        return res.status(response.code).json(response.response);
    })
}