module.exports=(sequelize,DataTypes)=>{
    return sequelize.define('goods',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        shop_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        thumb_url:DataTypes.STRING
    },{tableName:'goods'})
}