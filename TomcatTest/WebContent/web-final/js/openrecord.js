$(document).ready(function() {
    var searchStr = location.search;
    //由于searchStr属性值包括“?”，所以除去该字符
    searchStr = searchStr.substr(1);
    //将searchStr字符串分割成数组，数组中的每一个元素为一个参数和参数值
    var searchs = searchStr.split("&");
    //获得第一个参数和值
    var address = searchs[0].split("=");
    //获取到登陆用户的id
    var id = address[1];
    var imgurl = "http://192.168.0.122:8080/images/" + id + ".bmp";
    var infourl = "http://192.168.0.122:8080/api/user/" + id;
    $.ajax({
        type: 'get',
        url: imgurl,
        cache: false,
        processData: false,
        timeout: 10000, //超时时间，毫秒
        success: function(XHR, TS) {
            $("#pre-photo").attr("src", imgurl);
            $("#tip").text("照片预览：");
        }
    });
    $.ajax({
        type: 'get',
        url: infourl,
        cache: false,
        processData: false,
        timeout: 10000, //超时时间，毫秒
        success: function(XHR, TS) {
            console.log(XHR);
            if (XHR["id"] != null) {
                $("#username").text(XHR["username"]);
                $("#tel").text(XHR["tel"]);
                var endDate = XHR["endDate"];
                if (XHR["id"] < 10000000) {
                    $("#type").text("业主");
                } else if (endDate == "9999-12-31") {
                    $("#type").text("常驻人员");
                    $("#people-show").remove();
                } else {
                    $("#type").text("访客");
                    $("#people-show").remove();
                }
                $("#endDate").text(endDate);
            } else {
                $("#people-table").remove();
                $("#people-show").text("该人员不是业主(或加载失败)");
            }
        },
        error: function() {
            $("#people-table").remove();
            $("#people-show").text("该人员不是业主(或加载失败)");
        }
    });
    layui.use(['table', 'element', 'layer'], function() {
        var table = layui.table,
            layer = layui.layer;
        //展示已知数据
        table.render({
            elem: '#people-table',
            width: 800,
            cols: [
                [ //标题栏
                    {
                        field: 'id',
                        title: 'ID',
                        width: 100,
                        sort: true
                    }, {
                        field: 'password',
                        title: '登录密码',
                        width: 100
                    }, {
                        field: 'username',
                        title: '姓名',
                        width: 100
                    }, {
                        field: 'tel',
                        title: '电话',
                        width: 150
                    }, {
                        field: 'endDate',
                        title: '访问期限',
                        sort: true
                    }, {
                        fixed: 'right',
                        width: 150,
                        align: 'center',
                        toolbar: '#bar'
                    } //这里的toolbar值是模板元素的选择器
                ]
            ],
            url: 'http://192.168.0.122:8080/api/users/' + id,
            skin: 'row' //表格风格
                ,
            even: true,
            page: true
        });
        table.on('tool(demo)', function(obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.open({
                    type: 2,
                    title: '人员详情',
                    maxmin: true,
                    skin: 'layui-layer-molv',
                    area: ['500px', '600px'],
                    content: 'peopledetail.html?id=' + obj.data.id,
                });
            }
        });
    });
    $("#fresh").click(function() {
        freshtable();
    });

    function freshtable() {
        layui.use('table', function() {
            var table = layui.table;
            table.render({
                elem: '#people-table',
                width: 800,
                url: url,
                cols: [
                    [{
                        field: 'id',
                        title: 'ID',
                        width: 100,
                        sort: true
                    }, {
                        field: 'username',
                        title: '姓名',
                        width: 100,
                        sort: true
                    }, {
                        field: 'tel',
                        title: '电话',
                        width: 150
                    }, {
                        field: 'address',
                        title: '住址'
                    }, {
                        fixed: 'right',
                        width: 150,
                        align: 'center',
                        toolbar: '#bar'
                    }]
                ],
                skin: 'row',
                even: true,
                page: true
            });
        });
    }
});