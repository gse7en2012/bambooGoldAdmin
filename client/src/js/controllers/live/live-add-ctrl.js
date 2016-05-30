/**
 * Created by zhuzhipeng on 16/3/21.
 */
'use strict';

angular.module('RDash').controller('LiveAddCtrl', ['$scope', '$cookieStore', 'liveApiService', LiveAddCtrl]);

function LiveAddCtrl($scope, $cookieStore, liveApiService) {
    $scope.sourceLink = 'http://www.placehold.it/480X480/DDDDDD/AAAAAA';


    $scope.channelList = [
        {channel_id: 1, name: '直播'},
        {channel_id: 2, name: '交流'},
        {channel_id: 3, name: '问答'}
    ];

    $scope.allowSeeLvList = [
        {allow_see_lv: 1, name: '普通'},
        {allow_see_lv: 2, name: '会员'},
        {allow_see_lv: 4, name: 'VIP'},
        {allow_see_lv: 8, name: 'VVIP'}
    ];

    $scope.channelId = $scope.channelList[0].channel_id;
    $scope.allowSeeLv = $scope.allowSeeLvList[0].allow_see_lv;

    liveApiService.getVerifyUser().then((data)=> {
        $scope.verifyUserList = data.result;
        $scope.uid= $scope.verifyUserList[0].uid;
    });


    $scope.add = ()=> {
        if (!$scope.channelId) return alert('请选择板块');
        liveApiService.addLiveOpinion({
            content: $scope.content,
            title: $scope.title,
            channel_id: $scope.channelId,
            pictures:$scope.sourceLink,
            uid: $scope.uid,
            allow_see_lv: $scope.allowSeeLv
        }).then(()=> {
            alert('发布成功!');
            location.reload();
        })
    }


    $scope.uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
        uptoken_url: '/files/token',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: 'http://o7ix1x8xp.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
        container: 'u-container',           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb',           //最大文件体积限制
        flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        // dragdrop: true,                   //开启可拖曳上传
        //  drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FilesAdded': function (up, files) {
                plupload.each(files, function (file) {
                    // 文件添加进队列后,处理相关的事情
                });
            },
            'BeforeUpload': function (up, file) {
                // 每个文件上传前,处理相关的事情
            },
            'UploadProgress': function (up, file) {
                // 每个文件上传时,处理相关的事情
            },
            'FileUploaded': function (up, file, info) {
                // 每个文件上传成功后,处理相关的事情
                // 其中 info 是文件上传成功后，服务端返回的json，形式如
                // {
                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                //    "key": "gogopher.jpg"
                //  }
                // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                var domain        = up.getOption('domain');
                var res           = JSON.parse(info);

                $scope.sourceLink = domain + res.key; //获取上传成功后的文件的Url
                $scope.$apply();
                alert('图片上传成功,现在可以点击发布!')
            },
            'Error': function (up, err, errTip) {
                //上传出错时,处理相关的事情
            },
            'UploadComplete': function () {
                //队列文件处理完毕后,处理相关的事情
            },
            'Key': function (up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在 unique_names: false , save_key: false 时才生效
                var key = (new Date()).valueOf() + "";
                // do something with key here
                return key
            }
        }
    });
}