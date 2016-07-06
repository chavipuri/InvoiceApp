<?php
    include('db/db.php');

    $customer = $_POST['customer'];
    $invoice = $_POST['invoiceno'];
    $date = $_POST['date'];
    $order = $_POST['order'];
    $total = $_POST['total'];

    $res2 = true;
    $res1 = mysql_query("INSERT INTO steel.invoice(customer_name,invoice_no,date,total_amt) values('$customer','$invoice','$date', '$total')");
    $id = mysql_insert_id();
    if($id > 0)
    {
        for($i=0;$i<count($order);$i++)
        {
            $productname  = $order[$i]['productname'];
            $quantity     = $order[$i]['quantity'];
            $price        = $order[$i]['price'];
            $amount       = $order[$i]['subtotal'];

            $res2 = $res2 && $res1 && mysql_query("INSERT INTO steel.INVOICE_DETAILS(invoice_id,product_name,quantity,price, amount) 
					                values('$id','$productname','$quantity','$price', '$amount')");
        }
    }
    if($res2){
        echo "Successfully inserted records";
    } else {
        echo "Insertion failed";
    }
?>