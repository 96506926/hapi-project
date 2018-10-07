//routes/hello-hapi.js
const Joi=require('joi');
const {jwtHeaderDefine}=require('../utils/router-helps');
module.exports=[
    {
        method:'GET',
        path:'/',
        handler:(request,reply)=>{
            console.log(request.auth.credentials);//控制台输出{userId:1}
            reply('hapi');
        },
        config:{
            validate:{
                ...jwtHeaderDefine
            },
            tags:['api','tests'],
            description:"测试"
        }
    }
]