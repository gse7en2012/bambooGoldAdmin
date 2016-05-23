module.exports = function (sequelize, DataType) {
    return sequelize.define('live_files',
        {
            did: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true, comment: ''},
            allow_see_lv: {type: DataType.INTEGER, allowNull: false},
            uid: {type: DataType.INTEGER, allowNull: false},
            intro: {type: DataType.STRING},
            title: {type: DataType.STRING},
            url: {type: DataType.STRING},
            doc_icon: {type: DataType.STRING},
            status:{type:DataType.INTEGER}
        }, {
            timestamps: true,
            comment: '文件表'
        });
};