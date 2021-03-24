let isAuthenticated=true;
const apiRes = require("./../utils/apiResponse");
const resMsgCode=require("./../utils/resMsgCode");
let {UN_AUTHORIZED}=resMsgCode;
module.exports= ((app)=>{
    app.use((req,res,next)=>{
        if(isAuthenticated){
            return next();
        }else{
            let {response,code}=apiRes(null,UN_AUTHORIZED.msg,UN_AUTHORIZED.code);
            return res.status(code).json(response);
        }
})
});