<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>
<h1>使用 POST 方法读取数据</h1>
<ul>
<li><p><b>账号:</b>
	<%String account = request.getParameter("account");%>
    <%=account%>
</p></li>
<li><p><b>密码:</b>
   <%= request.getParameter("password")%>
</p></li>
</ul>
</body>
</html>