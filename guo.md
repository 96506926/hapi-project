migrations目录

用于管理数据库表结构迁移的配置目录


seeders目录

用于在数据库完成migrations初始化后,填补一些打底数据的配置目录
初始化完成目录中暂无内容



创建数据库 node_modules/.bin/sequelize db:create
会自动读取config/config下的数据库参数连接并配置
通过 --env参数,指定为生产环境创建项目数据库

node_modules/.bin/sequelize db:create --env production



sequelize db:migrate命令可以最终帮助我们将migration目录下的迁移行为定义,
按时间戳的顺序,最终完成数据库表结构的自动化创建

再数据库中会默认创建一个名为SequelizeMeta的表,用于记录在数据库上所运行的迁移历史版本


node_modeules/.bin/sequelize db:migrate


向表中追加字段
node_moduels/.bin/sequelize migration:create --name add-columns-to-shops-table





seeders种子数据填充

可以使用seeders来完成,使用方式与数据库结构迁移相识

sequelize seed:create












