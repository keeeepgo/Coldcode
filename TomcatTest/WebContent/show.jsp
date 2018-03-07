<html>
  <head>

    
    <title>My JSP 'show.jsp' starting page</title>
    
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
<link rel="stylesheet" type="text/css" href="styles.css">
-->
<script type="text/javascript" src="jquery.js"/>
<script type="text/javascript">
  function doFind(){
  $.ajax({
  cache: true,
  type: "POST",
  url:"ajax.jsp", //æè¡¨åæ°æ®åéå°ajax.jsp
  data:$('#ajaxFrm').serialize(), //è¦åéçæ¯ajaxFrmè¡¨åä¸­çæ°æ®
  async: false,
  error: function(request) {
  alert("åéè¯·æ±å¤±è´¥ï¼");},
  success: function(data) {
  $("#ajaxDiv").html(data); //å°è¿åçç»ææ¾ç¤ºå°ajaxDivä¸­
  }
  });
  }
</script>
  </head>
  
  <body>
    <form id="ajaxFrm" >
     <input type="text" name="name">
    <input type="button" onClick="doFind();" value="è°ç¨ä¸ä¸ajax" >
    </form>
    <div id="ajaxDiv"></div>
  </body>
</html>