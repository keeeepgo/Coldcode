<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'show.jsp' starting page</title>
    
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
<link rel="stylesheet" type="text/css" href="styles.css">
-->
<script type="text/javascript" src="jquery-1.3.2.min.js"/>
<script type="text/javascript">
  function doFind(){
  $.ajax({
  cache: true,
  type: "POST",
  url:"ajax.jsp", //把表单数据发送到ajax.jsp
  data:$('#ajaxFrm').serialize(), //要发送的是ajaxFrm表单中的数据
  async: false,
  error: function(request) {
  alert("发送请求失败！");},
  success: function(data) {
  $("#ajaxDiv").html(data); //将返回的结果显示到ajaxDiv中
  }
  });
  }
</script>
  </head>
  
  <body>
    <form id="ajaxFrm" >
     <input type="text" name="name">
    <input type="button" onClick="doFind();" value="调用一下ajax" >
    </form>
    <div id="ajaxDiv"></div>
  </body>
</html>