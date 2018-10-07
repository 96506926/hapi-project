const Joi=require('joi');
const {paginationDefine}=require('../utils/router-helps');
const models=require('../models');
const GROUP_NAME='shops';

module.exports=[
    {
        method:'GET',
        path:`/${GROUP_NAME}`,
        handler:async (request,reply)=>{
            //通过await来异步查取数据
            const {rows:results,count:totalCount}=await models.shops.findAndCountAll({
                attributes:[
                    'id',
                    'name'
                ],
                limit:request.query.limit,
                offset:(request.query.page-1)*request.query.limit
            });
            reply({results,totalCount});
        },
        config:{
            auth:false,
            validate:{
                query:{
                    ...paginationDefine
                }
            },
            tags:['api',GROUP_NAME],
            description:'获取店铺列表'
        }
    },
    {
        method:'GET',
        path:`/${GROUP_NAME}/{shopId}/goods`,
        handler:async (request,reply)=>{
            //增加带有where的条件查询
            const {rows:results,count:totalCount}=await models.goods.findAndCountAll({
                where:{
                    shop_id:request.params.shopId
                },
                attributes:[
                    'id','name'
                ],
                limit:request.query.limit,
                offset:(request.query.page-1)*request.query.limit
            });
            reply({results,totalCount});  
        },
        config:{
            auth:false,
            tags:['api',GROUP_NAME],
            description:'获取店铺的商品列表',
            validate:{
                params:{
                    shopId:Joi.string().required().description('店铺的Id')
                },
                query:{
                    ...paginationDefine
                }
            }
        }
    }
]