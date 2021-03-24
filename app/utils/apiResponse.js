module.exports=(data,err,code)=>{
    if(data){
        if(data instanceof Array === false){
            data = [data]
        }
        return {
            response:{
                success:true,
                data
            },
            code
        }
    }else{
        if(err instanceof Array === false){
            err = [err]
        }
        
        return {
            response:{
                success:false,
                err
            },
            code
        }
    }

}