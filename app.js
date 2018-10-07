// //APP入口

require('env2')('./.env');
const Hapi=require('hapi');
const config=require('./config');
//引入自定义的hapi-swagger插件配置
const pluginHapiSwagger=require('./plugins/hapi-swagger');
const routesHelloHapi=require('./routes/hello-hapi');
const hapiAuthJWT2=require('hapi-auth-jwt2');
const pluginHapiAuthJWT2=require('./plugins/hapi-auth-jwt2');
const pluginHapiPagination=require('./plugins/hapi-pagination');
const pluginHapiGoods=require('./plugins/hapi-good');
const routesShopHapi=require('./routes/shops');
const routesOrdersHapi=require('./routes/orders');
const routesUserHapi=require('./routes/users');


const server=new Hapi.Server();

//配置服务器启动host与端口
server.connection({
    port:config.port,
    host:config.host
});


const init=async ()=>{

    //通过server.register挂载swagger插件配置
    await server.register([
        //为系统使用hapi-swagger
        ...pluginHapiSwagger,
        pluginHapiPagination,
        hapiAuthJWT2,
        pluginHapiGoods
    ]);

    pluginHapiAuthJWT2(server);

    server.route([
        //创建一个简单的hello hapi接口
        ...routesHelloHapi,
        ...routesShopHapi,
        ...routesOrdersHapi,
        ...routesUserHapi
    ]);

    //启动服务
    await server.start();
    console.log(`Server running at:${server.info.uri}`);
}


init();




