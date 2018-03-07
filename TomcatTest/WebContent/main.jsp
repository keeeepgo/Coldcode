<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>

<h2>include 动作实例</h2>
<jsp:include page="date.jsp" flush="true" />

<h2>Jsp 使用 JavaBean 实例</h2>
<jsp:useBean id="test" class="main.TestBean" />
 
<jsp:setProperty name="test" 
                    property="message" 
                    value="菜鸟教程..." />
 
<p>输出信息....</p>
 
<jsp:getProperty name="test" property="message" />

</body>
</html>

