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
$(document).on( "pagecreate", function() {
$( document ).on( "swiperight", function( e ) {
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( ".left-panel" ).panel( "open" );
            }
        }
    	});
});

// ...additional event handlers here...
function testajax(){
    $.ajax({
        type: "POST",
        url: 'http://softwebtechno.com/getcategory.php',
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

/*	$.ajax({
        type:'POST',
		dataType: 'json',
        crossDomain: true,
        url:'http://time.jsontest.com/',
        error: function(response, d, a){
            alert(response + d + a) ;  
        },
        success: function (response){
            alert(JSON.stringify(response));        
        }
    });
*/
}