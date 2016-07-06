# InvoiceApp
Build a small application to create invoices.

 1. User can click a button/link to create invoice.
 2. User can specify customer name, date and invoice number.
 3. User can add multiple line items by selecting products from a product search component.
 4. Products/line items include Product Name, Quantity, Price, Total
 5. Line item fields for Quantity and Price are editable.
 6. Form is auto-saved or provides a Save button the user can click.



Steps to run the application. 
1. Execute create_statements.sql to create the schema and tables. I used MySQL Workbench for the database purposes. 
2. The files should be placed on a server so that php can work. 
3. In db/db.php, make the changes in the below shown lines. Update it according to your SQL connection.  
$con = mysql_connect('127.0.0.1','root','password') or die('can not connect to server');  
$con = mysql_connect(<sql server>,<sql username>,<sql password>) or die('can not connect to server'); 
4. run portal.html on the server and start creating invoices.
