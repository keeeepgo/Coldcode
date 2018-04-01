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
        });
    });
});