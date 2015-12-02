/*
 * Copyright © 2012-2015, Intel Corporation. All rights reserved.
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }
/*$(document).on( "pagecreate", function() {
$( document ).on( "swiperight", function( e ) {
			if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
				if ( e.type === "swiperight" ) {
					$( ".left-panel" ).panel( "open" );
				}
       		 }
    	});
});
*/

function SwipperTab()
{
	$(document).on( "swiperight", function( e ) {
							if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
								if ( e.type === "swiperight" ) {
									$( ".left-panel" ).panel( "open" );
								}
							 }
					});
}

var MyFixURL = "http://softwebtechno.com/";

// ...additional event handlers here...
function testajax(){
    $.ajax({
        type: "POST",
        url: MyFixURL+'getcategory.php',
        dataType: 'json',
		cache:false,
        crossDomain: true,
        error: function (jqXHR, textStatus, errorThrown) {
            alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
        },
        success: function (response) {
			alert(JSON.stringify(response));     
		}
	});
}

/* For Load Category */
function loadcategory(){
    var i =1;
	var Category = ""; 
	$.ajax({
        type: "POST",
        url: MyFixURL+'getcategory.php',
        dataType: 'json',
		cache:false,
        crossDomain: true,
        error: function (jqXHR, textStatus, errorThrown) {
            alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
        },
		beforeSend: function(){
			//alert("Waiting..");
			},
        success: function (response) {
			if (response.length > 0)
				   {
					  $.each(response, function(index, element) {
						  if(parseInt(i)%2==0)
						  {
						  	Category += "<div class='ui-block-b'>";
						  }
						  else
						  {
							  Category += "<div class='ui-block-a'>";
						  }
						  Category += "<div class='panel100 productEffect OneConPadding'><a data-transition='flip' href='#shopproductpage' onclick='LoadProducts("+element["catid"]+")' class='ui-bar ui-bar-a NoPadding ImageDiv MyBackground NoConPadding  NoMargin fontAlignCenter' data-corners='false' title=' Navigation ' data-value='"+element["prodid"]+"' role='button'><img src='"+MyFixURL+"icon.png' style='margin:auto;' /></a><a href='#shopproductpage' class='ui-bar ui-bar-a mycustomeTextcss ClickCategory mycustomeUi fontAlignCenter' data-corners='false' title=' "+ element["catname"] +" ' data-value='"+element["catid"]+"' onclick='LoadProducts("+element["catid"]+")'  data-transition='flip' data-role='button' role='button'>"+element["catname"]+" </a></div></div>";
						  i=i+1;
						  //alert(element["catid"]+" "+element["catname"]);           
					  });
				   }
				   $("#CategoryGrid").html(Category);    
		}
	});
}

/* For Load Products from Category */
function LoadProducts(CatId){
	var Products = "";
	var CartSession1=localStorage.getItem("CartItems")!==null?localStorage.getItem("CartItems"):"";
	var i=1;
    $.ajax({
        type: "POST",
        url: MyFixURL+'getproducts.php',
		data:{catId:CatId,CartSession:CartSession1},
        dataType: 'json',
		cache:false,
        crossDomain: true,
        error: function (jqXHR, textStatus, errorThrown) {
            alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
        },
        success: function (response) {
			//alert(response);
				 if (response.length > 0)
				   {
					  $.each(response, function(index, element) {
					  Products += '<div class="panel100 productEffect"><div class="panel20"><a href="#DataDynamic" class="ui-bar ui-bar-a NoPadding ImageDiv MyBackground" data-corners="false" title=" Navigation " data-value="'+element["prodid"]+'" role="button" style="padding:0px;"><img src="'+MyFixURL+'products/'+element["Imageurl"]+'" /></a></div><div class="panel50"><a href="#DataDynamic" class="ui-bar ui-bar-a NoPadding NoBorder fontLeft MyBackground mycustomeTextcss" data-corners="false" title=" Navigation " data-value="'+element["prodid"]+'" style="margin-bottom:0px;" role="button"> '+element["proname"]+' </a><a class="ui-bar ui-bar-a NoPadding fontLeft NoBorder MyBackground smallCustomText" style="margin-top:0px;" data-corners="false" title=" Price per Quote " data-value="'+element["price"]+'" role="button" id="cost1'+element["prodid"]+'">Price : Rs. '+element["price"]+'</a></div><div class="panel30"><div class="input-group" style="margin-top: 6px; margin-bottom: 6px;"><span class="input-group-btn"><button type="button" style="padding: 1px 3px;" class="btn btn-success btn-number" onclick="AddPlusProduct('+element["prodid"]+',1)"  data-type="plus" data-field="1"><span class="glyphicon glyphicon-plus"></span></button></span><input type="text" style="height:24px; padding:0px; text-align: center;" name="Count'+element["prodid"]+'"  id="Count'+element["prodid"]+'" class="form-control input-number" value="'+element["Qty"]+'" min="0" max="99"><span class="input-group-btn"><button type="button" style="padding:1px 3px;" class="btn btn-danger btn-number"  data-type="minus" onclick="AddPlusProduct('+element["prodid"]+',-1)" data-field="-1"><span class="glyphicon glyphicon-minus"></span></button></span></div><div><a class="ui-bar-a NoPadding fontLeft NoBorder MyBackground mycustomeTextcss smallCustomText" style="margin-top:0px;" data-corners="false" title=" Price per Quote " data-value="'+element["price"]+'" role="button" id="cost'+element["prodid"]+'"> Rs. '+element["subTotal"]+'</a></div></div></div>';
						  i=i+1;
						  //alert(element["catid"]+" "+element["catname"]);           
					  });
				   }
				   $("#ProductsGrid").html(Products);
				   //GenerateEvent();    
		}
	});
}

/*
<a class="ui-btn-center ui-btn-corner-all ui-btn panel10 ui-icon-plus ui-btn-icon-notext ui-shadow IncreseQty" title=" Increase Quantity " data-form="ui-icon" data-role="button" role="button" data-transition="pop" onclick="AddPlusProduct('+element["prodid"]+',1)" data-itemvalue="'+element["prodid"]+'"> + </a><div class="panel10"><a class="ui-bar ui-bar-a NoPadding fontLeft NoBorder MyBackground mycustomeTextcss" style="margin-bottom:0px;" data-corners="false" title=" Quantity " data-value="'+element["prodid"]+'" role="button" id="Count'+element["prodid"]+'">'+element["Qty"]+'</a></div><a class="ui-btn-center ui-btn-corner-all ui-btn panel10 ui-icon-minus ui-btn-icon-notext ui-shadow DecreseQty" title=" Decrease Quantity " data-form="ui-icon" data-role="button" role="button" data-transition="pop"  data-itemvalue="'+element["prodid"]+'" onclick="AddPlusProduct('+element["prodid"]+',-1)"> - </a>

 Load Cart */
function LoadCart(){
	var Products = "";
	var CartSession1=localStorage.getItem("CartItems")!==null?localStorage.getItem("CartItems"):"";
	var i=1;
    $.ajax({
        type: "POST",
        url: MyFixURL+'getshopcart.php',
		data:{CartSession:CartSession1},
        dataType: 'json',
		cache:false,
        crossDomain: true,
        error: function (jqXHR, textStatus, errorThrown) {
            alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
        },
        success: function (response) {
				 if (response.length > 0)
				   {
					  $.each(response, function(index, element) {
					  Products += '<div class="panel100 productEffect"><div class="panel20"><a href="#DataDynamic" class="ui-bar ui-bar-a NoPadding ImageDiv MyBackground" data-corners="false" title=" Navigation " data-value="'+element["prodid"]+'" role="button" style="padding:0px;"><img src="'+MyFixURL+element["imgurl"]+'" /></a></div><div class="panel50"><a href="#DataDynamic" class="ui-bar ui-bar-a NoPadding NoBorder fontLeft MyBackground mycustomeTextcss" data-corners="false" title=" Navigation " data-value="'+element["prodid"]+'" style="margin-bottom:0px;" role="button"> '+element["proname"]+' </a><a class="ui-bar ui-bar-a NoPadding fontLeft NoBorder MyBackground smallCustomText" style="margin-top:0px;" data-corners="false" title=" Price per Quote " data-value="'+element["price"]+'" role="button" id="cost1'+element["prodid"]+'">Rs. '+element["price"]+'</a></div><div class="panel30"><div class="input-group" style="margin-top: 6px; margin-bottom: 6px;"><span class="input-group-btn"><button type="button" style="padding: 1px 3px;" class="btn btn-success btn-number" onclick="CartAddPlusProduct('+element["prodid"]+',1)"  data-type="plus" data-field="1"><span class="glyphicon glyphicon-plus"></span></button></span><input type="text" style="height:24px; padding:0px; text-align: center;" name="Count'+element["prodid"]+'"  id="CartCount'+element["prodid"]+'" class="form-control input-number" value="'+element["Qty"]+'" min="0" max="99"><span class="input-group-btn"><button type="button" style="padding:1px 3px;" class="btn btn-danger btn-number"  data-type="minus" onclick="CartAddPlusProduct('+element["prodid"]+',-1)" data-field="-1"><span class="glyphicon glyphicon-minus"></span></button></span></div><div><a class="ui-bar-a NoPadding fontLeft NoBorder MyBackground mycustomeTextcss smallCustomText" style="margin-top:0px;" data-corners="false" title=" Price per Quote " data-value="'+element["price"]+'" role="button" id="Cartcost'+element["prodid"]+'"> Rs. '+element["subTotal"]+'</a></div></div></div>';
						  i=i+1;
						  //alert(element["catid"]+" "+element["catname"]);           
					  });
				   }
				   $("#CartProductsGrid").html(Products);
				   SetGetCookies();
				   //alert(Products);
				   //GenerateEvent();    
		}
	});
}

/* Add to Cart function */
function getShopBottomCart(dataitemId,dataprice,dataqty){
   	var CartSession1=localStorage.getItem("CartItems")!==null?localStorage.getItem("CartItems"):"";
	var GTotal1=localStorage.getItem("GTotal")!==null?localStorage.getItem("GTotal"):"";
	var ItemTotal1=localStorage.getItem("TotalItems")!==null?localStorage.getItem("TotalItems"):"";
    $.ajax({
        type: "POST",
       	url: MyFixURL+"addtocart.php",
		data:{CartSession:CartSession1,GTotal:GTotal1,ItemTotal:ItemTotal1,cartItems:1,itemId:dataitemId,price:dataprice,qty:dataqty},
        dataType: 'json',
		cache:false,
        crossDomain: true,
        error: function (jqXHR, textStatus, errorThrown) {
            alert('new textStatus=' + textStatus + ' errorThrown=' + errorThrown);
        },
        success: function (d) {
			//alert(JSON.stringify(d));
			// Your code.
				if (d.length > 0)
				   {
					  $.each(d,function(index,values){
						localStorage.setItem("CartItems", values["Cart"]);
						localStorage.setItem("TotalItems", values["ItemTot"]);
						localStorage.setItem("GTotal", values["GTotal"]);
						SetGetCookies();
						});
				   }     
		}
	});
}

function BackPage()
{
	window.history.back();
}

function AddPlusProduct(ItemId,chngValue)
{
			   var Count = $("#Count"+ItemId).val();
			   if((parseInt(Count)+chngValue)>=0)
			   {
					var Cost = $("#cost"+ItemId).data("value");
				   $("#cost"+ItemId).html("Rs. "+(parseFloat(Cost)*(parseFloat(Count)+chngValue)));
				   $("#Count"+ItemId).val(parseInt(Count)+chngValue);
				   getShopBottomCart(ItemId,Cost,chngValue);
				   SetGetCookies();
			   }
}

function CartAddPlusProduct(ItemId,chngValue)
{
			   var Count = $("#CartCount"+ItemId).val();
			   if((parseInt(Count)+chngValue)>=0)
			   {
					var Cost = $("#cost1"+ItemId).data("value");
				   $("#Cartcost"+ItemId).html("Rs. "+(parseFloat(Cost)*(parseFloat(Count)+chngValue)));
				   $("#CartCount"+ItemId).val(parseInt(Count)+chngValue);
				   getShopBottomCart(ItemId,Cost,chngValue);
				   SetGetCookies();
			   }
}


function SetGetCookies()
{
		var cartItems = "";
		var TotItems = 0;
		var GtotalP = 0;
		
			   if(localStorage.getItem("CartItems")!==null)
			   {
				   cartItems = localStorage.getItem("CartItems");
			   }
			   if(localStorage.getItem("TotalItems")!==null)
			   {
				   TotItems = localStorage.getItem("TotalItems");
			   }
			   if(localStorage.getItem("GTotal")!==null)
			   {
				   GtotalP = localStorage.getItem("GTotal");
			   }
			   $(".goToshopcart").html(TotItems+" Item(s) - Rs. "+GtotalP);  
			   $(".goToshopcartCount").html(TotItems+" Item(s)");
}