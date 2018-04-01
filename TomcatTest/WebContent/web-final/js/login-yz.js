$(document).ready(function() { 
    layui.use(['form', 'layer'], function() {
        var $ = layui.jquery,
            form = layui.form,
            layer = layui.layer;
        // 验证
        form.verify({
            account: function(value) {},
            password: function(value) {}
        });
        // 提交监听
        form.on('submit(sub)', function(data) {
            $('#info').attr("action", $('#info').attr("action") + "?id=" + $('#id').val());
            layer.alert(JSON.stringify(data.field), {
                title: '最终的提交信息'
            });
        });
    });
});