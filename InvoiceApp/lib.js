

var invoice= function(){
    this.customer;
    this.invoiceno;
    this.date;
    this.order;
    this.total;
};

invoice.prototype.toJSONstring = function(){
    return JSON.stringify(this);
};

invoice.prototype.readFromJSONstring = function(usr_str){
    return JSON.parse(usr_str);
};

invoice.prototype.addLineItem = function(){
    var tr = '<tr>'+
                '<td><input type="text" name="productname" list="search" class="form-control productname"></td>'+
                '<td><input type="text" name="quantity" class="form-control quantity"></td>'+
                '<td><input type="text" name="price" class="form-control price"></td>'+
                '<td><input type="text" name="subtotal" class="form-control subtotal" readonly></td>'+
                '<td><input type="button"  class="btn btn-danger remove" value="Remove"></td>'+
            '</tr>';
    $('.details').append(tr);
}

invoice.prototype.removeLineItem = function(tr){
    var con = confirm("Do you want to remove it?");
    if(con)
    {
        tr.remove();
        this.updateTotal();
    }
}

invoice.prototype.updateTotal = function(){
    var gg = 0;
    $('.subtotal').each(function(i,e){
        var amt = $(this).val()-0;
        gg += amt;
    });
    $('.total').val(gg.toFixed(2));
    this.total = gg.toFixed(2);
}

invoice.prototype.calculateSubTotal = function(tr){
    var price = tr.find('.price').val();
    var qty   = tr.find('.quantity').val();
    var amount = price * qty;
    tr.find('.subtotal').val(amount.toFixed(2));
    this.updateTotal();
}

invoice.prototype.save = function(table){
    var flag = true;
    this.customer = $('.customer').val();
    this.invoiceno = $('.invoice').val();
    this.date = $('.date').val()
    var order = [];
    table.find('tr').each(function (i) {
        var product = $(this).find('.productname').val(),
            price = $(this).find('.price').val(),
            quantity = $(this).find('.quantity').val(),
            subtotal = $(this).find('.subtotal').val()
        
        var item = {
            "productname" : product,
            "price" : price,
            "quantity" : quantity, 
            "subtotal" : subtotal
        };
        console.log(item);
        order.push(item);
    });
    this.order = order;
    
    flag = flag && this.checkMandatory() && this.checkOrder();
    console.log("Order " + flag);
    
    var inv = this.toJSONstring();
    var inv1 = this.readFromJSONstring(inv);
    if(flag){
        this.saveToSessionStorage();
        $.post("save.php", inv1, function(data) {
            console.log(data);
        });
        return true;
    } else {
        return false;
    }
}

invoice.prototype.display =  function(){
    console.log(this.toJSONstring());
};

invoice.prototype.saveToSessionStorage = function(){
    sessionStorage.setItem("invoice", this.toJSONstring());
}

invoice.prototype.checkMandatory =  function(){
    if(this.customer != "" && this.invoiceno != "" && this.date !=""){
        return true;
    } else {
        alert("Customer name, invoice number and date are required fields.");
        return false;
    }
}

invoice.prototype.checkOrder = function(){
    var order = this.order;
    var regex = /^[0-9]|\./;
    for(var i=0; i<order.length; i++){
        if(order[i].productname != ""){
            if(regex.test(order[i].price) && regex.test(order[i].quantity)){
                continue;
            } else {
                alert("Please enter a positive number value for price and quantity");
                return false;
            }
        } else {
            alert("Please enter a  value for product name");
            return false;
        }
    }
    return true;
}

$(function(){

    var invoice1 = new invoice();

    $('.add').click(function(){
        invoice1.addLineItem();
    });

    $('.details').delegate('.quantity,.price','keyup',function(){
        var tr = $(this).parent().parent();
        invoice1.calculateSubTotal(tr);
    });

    $('.details').delegate('.remove','click',function(){
        var tr = $(this).parent().parent();
        invoice1.removeLineItem(tr);
    });

    $('.save').click(function(){
        var table = $(".details");
        var result = invoice1.save(table);
        return result;
    });
});
