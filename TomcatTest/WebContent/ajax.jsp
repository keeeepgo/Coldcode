 <body>
   <% 
   String userName = request.getParameter("name"); 
   if(userName!=null){ 
   userName = new String(userName.getBytes("ISO-8859-1"), "utf-8");//è§£å³ä¹±ç çé®é¢ 
   } 
   String returnString = ""; 
   returnString="你的名字" + userName; 
   out.print(returnString); %>
 </body>