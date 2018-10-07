const config=require('../config');

const validate=(decoded,request,callback)=>{
    /**
     * 接口POST /users/createJWT中的jwt签发规则
     * 
     * const payload={
     *  userId:jwtInfo.userId
     *  exp:Math.floor(new Date().getTime()/1000)+60*60
     * };
     * 
     * return JWT.sign(payload,process.env.JWT_SECRET);
     */

     //decoded为JWT payload被解码后的数据
     let error;
     const {userId}=decoded;
     if(!userId){
        return callback(error,false,userId);
     }
     const credentials={
         userId
     };
     //再路由接口的handler通过request.auth.credentials获取jwt decoded的值
     return callback(error,true,credentials);
}

module.exports=(server)=>{
    server.auth.strategy('jwt','jwt',{
        key:process.env.JWT_SECRET,
        verifyFunc:validate
    });
    server.auth.default('jwt');
};