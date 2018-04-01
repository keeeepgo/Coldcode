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
$(document).ready(function() { 
    var url = 'http://192.168.0.122:8080/api/users';
    layui.use('table', function() {
        var table = layui.table;
        table.render({
            elem: '#people-table',
            width: 800,
            url: url,
            cols: [
                [ //标题栏
                    {
                        field: 'id',
                        title: 'ID',
                        width: 100,
                        sort: true,
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
                        title: '住址',
                    }, {
                        fixed: 'right',
                        width: 150,
                        align: 'center',
                        toolbar: '#bar'
                    } //这里的toolbar值是模板元素的选择器
                ]
            ],
            skin: 'row' //表格风格
                ,
            even: true,
            page: true
        });
        //监听工具条
        table.on('tool(demo)', function(obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                layer.open({
                    type: 2,
                    title: '人员详情',
                    maxmin: true,
                    skin: 'layui-layer-molv',
                    area: ['900px', '700px'],
                    content: 'peopledetail.html?id=' + obj.data.id,
                });
            }
        });
        $("#fresh").click(function() {
            freshtable();
        });
        $("#search").click(function() {
            var want = $("#searchinput").val();
            if (want == "") {
                layer.msg("关键字不能为空");
                return;
            }
            layui.use('table', function() {
                var table = layui.table;
                table.render({
                    elem: '#people-table',
                    width: 800,
                    url: url,
                    cols: [
                        [ //标题栏
                            {
                                field: 'id',
                                title: 'ID',
                                width: 100,
                                sort: true,
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
                                title: '住址',
                            }, {
                                fixed: 'right',
                                width: 150,
                                align: 'center',
                                toolbar: '#bar'
                            } //这里的toolbar值是模板元素的选择器
                        ]
                    ],
                    done: function(res, curr, count) {
                        for (var i = 0; i < res.data.length; i++) {
                            have = 0;
                            delete res.data[i]["LAY_TABLE_INDEX"];
                            delete res.data[i]["endDate"];
                            delete res.data[i]["password"];
                            for (var key in res.data[i]) {
                                if (res.data[i][key] == want) {
                                    have = 1;
                                    // console.log(res.data[i]);
                                }
                            }
                            if (have == 0) {
                                res.data.splice(i, 1);
                                console.log('test' + i);
                                console.log(res.data);
                                i--;
                            }
                            // console.log(res.data[i]);
                        }
                        table.render({
                            elem: '#people-table',
                            data: res.data,
                            width: 800,
                            cols: [
                                [ //标题栏
                                    {
                                        field: 'id',
                                        title: 'ID',
                                        width: 100,
                                        sort: true,
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
                                        title: '住址',
                                    }, {
                                        fixed: 'right',
                                        width: 150,
                                        align: 'center',
                                        toolbar: '#bar'
                                    } //这里的toolbar值是模板元素的选择器
                                ]
                            ],
                            skin: 'row' //表格风格
                                ,
                            even: true,
                            page: true
                        });
                    }
                });
            });
        });
    });
});