function freshtable(id) {
    layui.use('table', function() {
        var table = layui.table;
        table.render({
            elem: '#people-table',
            width: 1200,
            where: {
                success: function(result) {
                    console.log(result);
                }
            },
            cols: [
                [ //标题栏
                    {
                        field: 'id',
                        title: 'ID',
                        width: 150,
                        sort: true
                    }, {
                        field: 'password',
                        title: '登录密码',
                        width: 200
                    }, {
                        field: 'username',
                        title: '姓名',
                        width: 200
                    }, {
                        field: 'tel',
                        title: '电话',
                        width: 250
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
            page: false
        });
    });
}
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
    $("[href='account.html']").attr("href", "account.html?id=" + id);
    var imgurl = "http://192.168.0.122:8080/images/" + id + ".jpg";
    var infourl = "http://192.168.0.122:8080/api/user/" + id;
    $.ajax({
        type: 'get',
        url: imgurl,
        cache: false,
        // dataType: "jsonp", //跨域采用jsonp方式 
        processData: false,
        timeout: 10000, //超时时间，毫秒
        success: function(XHR, TS) {
            $("#status").attr("src", imgurl);
        }
    });
    $.ajax({
        type: 'get',
        url: infourl,
        cache: false,
        // dataType: "jsonp", //跨域采用jsonp方式 
        processData: false,
        timeout: 10000, //超时时间，毫秒
        success: function(XHR, TS) {
            if (XHR["id"] != null) {
                $("#username").text(XHR["username"]);
                console.log($("#username").text());
            }
        }
    });
    layui.use(['table', 'element', 'layer', 'laydate'], function() {
        var table = layui.table,
            layer = layui.layer,
            laydate = layui.laydate;
        laydate.render({
            elem: '#date',
            type: 'date'
        });
        //展示已知数据
        table.render({
            elem: '#people-table',
            width: 1200,
            cols: [
                [ //标题栏
                    {
                        field: 'id',
                        title: 'ID',
                        width: 150,
                        sort: true
                    }, {
                        field: 'password',
                        title: '登录密码',
                        width: 200
                    }, {
                        field: 'username',
                        title: '姓名',
                        width: 200
                    }, {
                        field: 'tel',
                        title: '电话',
                        width: 250
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
            page: false
        });
        //监听工具条
        table.on('tool(demo)', function(obj) {
            var data = obj.data;
            if (obj.event === 'del') {
                layer.confirm('真的删除该人员么', function(index) {
                    var urlstr = "http://192.168.0.122:8080/api/user/" + obj.data.id;
                    $.ajax({
                        url: urlstr,
                        type: 'DELETE',
                        success: function(result) {
                            // Do something with the result
                            // obj.del();
                            freshtable();
                        }
                    });
                    layer.close(index);
                });
            } else if (obj.event === 'edit') {
                layer.open({
                    type: 2,
                    title: '编辑人员',
                    maxmin: true,
                    skin: 'layui-layer-molv',
                    area: ['500px', '600px'],
                    content: 'newpeople.html?id=' + obj.data.id + '&edit' + '&parentid=' + id,
                    cancel: function(thisindex, layero) {
                        layer.confirm('确认退出？所有修改不会保存！', {icon: 3, title:'提示'}, function(index){
                            layer.close(index);
                            layer.close(thisindex);
                        });
                        return false;
                    }
                });
            }
        });
        var $ = layui.$,
            active = {
                newRow: function() {
                    layer.open({
                        type: 2,
                        title: '新增人员',
                        maxmin: true,
                        skin: 'layui-layer-molv',
                        area: ['500px', '600px'],
                        content: 'newpeople.html?id=0&new&parentid=' + id, //弹框显示的u500
                        cancel: function(thisindex, layero) {
                            layer.confirm('确认退出？所有修改不会保存！', {icon: 3, title:'提示'}, function(index){
                              //do something
                              layer.close(index);
                              layer.close(thisindex);
                            });
                            return false;
                        }
                    });
                    freshtable(id);
                },
            };
        $('.demoTable .layui-btn').on('click', function() {
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });
        $("#fresh").click(function() {
            freshtable(id);
        });
    });
});