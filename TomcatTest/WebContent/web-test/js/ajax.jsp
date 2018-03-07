 <body>
   <% 
   String userName = request.getParameter("name"); 
   if(userName!=null){ 
   userName = new String(userName.getBytes("ISO-8859-1"), "utf-8");//解决乱码的问题 
   } 
   String returnString = ""; 
   returnString="你好，" + userName; 
   out.print(returnString); %>
 </body>