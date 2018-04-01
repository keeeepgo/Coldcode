$(document).ready(function() {
    $("#camshow").hide();
    $("#photoup").click(function() {
        $("#photoup").hide();
        $("#camshow").show();
        layui.use("layer", function() {
            var layer = layui.layer;
            Webcam.set({
                width: 320,
                height: 240,
                dest_width: 320,
                dest_height: 240,
                crop_width: 200,
                crop_height: 200,
                image_format: "jpeg",
                jpeg_quality: 90,
                force_flash: false,
                flip_horiz: true,
                fps: 45,
                upload_name: 'image'
            });
            Webcam.attach("#webcam");
            Webcam.on("error", function(err) {
                $("#photoup").show();
                $("#camshow").hide();
                if (err.name == "NotAllowedError") {
                    layer.alert("为了拍照，请允许申请摄像头的权限");
                } else if (err.name == "NotFoundError") {
                    layer.alert("摄像头不存在");
                } else {
                    layer.alert("摄像头加载失败，\n错误信息:" + err.message);
                }
            });
        });
    });
    var blob;
    $("#take").click(function() {
        $("#photoup").show();
        $("#camshow").hide();
        Webcam.snap(function(data_url) {
            $("#pre-photo").attr("src", data_url);
            $("#tip").text("即将上传的照片预览：");
            var raw_image_data = data_url.replace(/^data\:image\/\w+\;base64\,/, '');
            blob = new Blob([Webcam.base64DecToArr(raw_image_data)], {
                type: 'image/jpeg'
            });
            console.log(blob);
            $("#pre-photo").attr("alt", "blob上传");
            $("#sub").attr("class", "layui-btn layui-btn-normal");
            $("#sub").attr("disabled", false);
        });
    }); 

    var searchStr = location.search;
    //由于searchStr属性值包括“?”，所以除去该字符
    searchStr = searchStr.substr(1);
    //将searchStr字符串分割成数组，数组中的每一个元素为一个参数和参数值
    var searchs = searchStr.split("&");
    //获得第一个参数和值
    var address = searchs[0].split("=");
    //获取到登陆用户的id
    var id = address[1];
    $("[name='id']").val(id);
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
            $("#pre-photo").attr("src", imgurl);
            $("#status").attr("src", imgurl);
            $("#tip").text("已上传的照片：");
            $("#sub").attr("class", "layui-btn layui-btn-normal");
            $("#sub").attr("disabled", false);
        },
        error: function(XHR, TS) {
            layer.alert('获取已上传图片失败');
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
                $("[name='username']").val(XHR["username"]);
                $("[name='tel']").val(XHR["tel"]);
                $("[name='password']").val(XHR["password"]);
                $("#username").text(XHR["username"]);
                $("#topeopletable").attr("href", "peopletable.html?id=" + id);
            } else {
                layer.alert('欢迎您第一次登录本系统，请完善个人信息', {
                    icon: 6
                });
            }
        },
        error: function(XHR, TS) {
            layer.alert('获取已填信息失败');
        }
    });
    $("#fileup").change(function() {
        var f = this.files[0]; // 获得文件对象
        var maxsize = 1024 * 100;
        if (f.size > maxsize) {
            layer.alert("上传的图片不能超过100KB!");//检查文件大小 
            $(this).val('');
            return;
        }
        var url = window.URL.createObjectURL(f);
        $("#pre-photo").attr("src", url);
        $("#pre-photo").attr("alt", "文件上传");
        $("#sub").attr("class", "layui-btn layui-btn-normal");
        $("#sub").attr("disabled", false);
        $("#tip").text("即将上传的照片预览：");
    });
    layui.use(['form', 'layedit', 'layer', 'element'], function() {
        var form = layui.form,
            layer = layui.layer;
        //自定义验证规则
        form.verify({
            name: function(value) {
                if (value.length < 2) {
                    return '名字至少得2个字符';
                }
            },
            pwd: function(value) {
                if ($('#pwd1').val() != $('#pwd2').val()) {
                    $('#pwd1').val("");
                    $('#pwd2').val("");
                    return '两次填写的密码不一致！';
                } else if (value.length < 6 || value.length > 12) {
                    return '密码必须6到12位';
                }
            }
        });
        //监听提交
        form.on('submit(sub)', function(data) {
            if ($("#pre-photo").attr("alt") == "blob上传") {
                $("#fileup").attr("disabled", true);
            }
            var waiting = layer.open({
                type: 3
            });
            var from = document.getElementById("info");
            var form = new FormData(from);
            if ($("#pre-photo").attr("alt") == "blob上传") {
                form.append("image", blob, id + ".jpeg");
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://192.168.0.122:8080/api/userUpdate/' + id, true);
            xhr.send(form);
            xhr.onreadystatechange = function(e) {
                if (this.readyState == 4) {
                    console.log(this);
                    console.log(this.responseText);
                    layer.close(waiting);
                    if (this.status == 200) {
                        if (this.responseText == "更新成功") {
                            layer.confirm("上传成功,点击确认可返回主界面",{icon: 1, title:'提示'}, function(index){
                                $("#topeopletable").attr("href", "peopletable.html?id=" + id);
                                layer.close(index);
                                window.location.href = 'peopletable.html?id=' + id;
                            });
                        } else {
                            layer.alert(this.responseText+",请重新尝试上传");
                        }
                    } else {
                        layer.alert("上传失败请重试", {
                            icon: 2
                        });
                    }
                }
            };
            return false;
        });
    });
});