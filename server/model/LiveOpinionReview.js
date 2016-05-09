module.exports = function (sequelize, DataType) {
    return sequelize.define('live_opinion_review', {
            opinion_review_id:{type: DataType.INTEGER, primaryKey: true, autoIncrement: true,comment:''},
            uid: {type: DataType.INTEGER,allowNull: false},
            content:{type:DataType.STRING},
           // create_time:{type:DataType.DATE},
            target_id:{type:DataType.INTEGER,comment:'被赞的观点id'},
            target_type:{type:DataType.INTEGER},
            status:{type:DataType.INTEGER,defaultValue:1,comment:'0-不可用1可用'},
            like_count:{type:DataType.INTEGER,defaultValue:0,comment:'点赞数'}
    },{
            timestamps:true,
            comment:'观点评论表'
        }
    );
}