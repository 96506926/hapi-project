const Joi=require('joi');
const {jwtHeaderDefine}=require('../utils/router-helps');
const models=require('../models');
const GROUP_NAME='orders';
module.exports=[
    {
        method:'POST',
        path:`/${GROUP_NAME}`,
        handler:async (request,reply)=>{
            // reply();
            await models.sequelize.transaction((t)=>{
                const result=models.orders.create(
                    {user_id:request.auth.credentials.userId},
                    {transaction:t}
                ).then(order=>{
                    const goodsList=[];
                    console.log(order.dataValues);
                    request.payload.goodsList.forEach(item=>{
                        goodsList.push(models.order_goods.create({
                            order_id:order.dataValues.id,
                            goods_id:item.goodId,
                            //此处单价的数值应该从商品表中反查写入
                            single_price:4.9,
                            count:item.count
                        }))
                    })
                    return Promise.all(goodsList);
                })
                return result;
            }).then(()=>{
                //事务已被提交
                reply('success');
            }).catch((err)=>{
                console.log(err);
                //事务已被回滚
                reply('error');
            })
        },
        config:{
            validate:{
                payload:{
                    goodsList:Joi.array().items(
                        Joi.object().keys({
                            goodId:Joi.number().integer(),
                            count:Joi.number().integer()
                        })
                    )
                },
                ...jwtHeaderDefine
            },
            tags:['api',GROUP_NAME],
            description:'创建订单'
        }
    },
    {
        method:'POST',
        path:`/${GROUP_NAME}/{orderId}/pay`,
        handler:async (request,reply)=>{
            reply();
        },
        config:{
            validate:{
                params:{
                    orderId:Joi.string().required()
                },
                ...jwtHeaderDefine
            },
            tags:['api',GROUP_NAME],
            description:'支付某条订单'
        }
    }
]