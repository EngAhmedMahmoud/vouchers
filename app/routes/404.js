const resMsgCode = require("./../utils/resMsgCode");
module.exports=(app)=>{
    app.use((req,res,next)=>{
        return res.status(resMsgCode.NOT_FOUND.code).json({
            msg:resMsgCode.NOT_FOUND.msg
        })
    })
}