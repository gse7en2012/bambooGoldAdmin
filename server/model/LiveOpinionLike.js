module.exports = function (sequelize, DataType) {
    return sequelize.define('live_opinion_like', {
            opinion_like_id:{type: DataType.INTEGER, primaryKey: true, autoIncrement: true,comment:''},
            uid: {type: DataType.INTEGER,allowNull: false},
           // create_time:{type:DataType.DATE},
            target_id:{type:DataType.INTEGER,comment:'被赞的观点id'},
            target_type:{type:DataType.INTEGER},
            status:{type:DataType.INTEGER,defaultValue:1,comment:'0-不可用1可用'}
    },{
            timestamps:true,
            comment:'观点点赞表'
        }
    );
}