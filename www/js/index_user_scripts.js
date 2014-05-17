 function register_events_handlers()
 {
    
    
         
        $(document).on("click", ".uib_w_14", function(evt)
        {
         activate_subpage("#uib_page_3"); 
        });
        $(document).on("click", ".uib_w_15", function(evt)
        {
         activate_subpage("#uib_page_3"); 
        });
        $(document).on("click", ".uib_w_16", function(evt)
        {
         activate_subpage("#uib_page_3"); 
        });
}

var token; //The Token
var parentid;
var appid;
function register_event_handlers()
 {   
         $(document).on("click", "#one-screen", function(evt)
        {
            //Get Prev Data
            var admin_email = $('input#admin_email').val(); //Get email and check if that is true
            var admin_pin = $('input#admin_pin').val();

			//Check data
			$.ajax({
			   type: "POST",
			   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/user",
			   data: {email:admin_email, pin: admin_pin, hardwareid: token },
			   dataType: "json",
			   success: function(data) {
					 if(data.error==0){
						if(data.hardware==true){	
							$.ui.loadContent("#uib_page_2",false,false,"slide"); //The final page
						}
						else{	parentid=data.userid; appid = data.appid; $.ui.loadContent("#uib_page_1",false,false,"slide");  } //The number verification page
					 }
					 else{
						alert('Error: '+data.error_response);
					//	return false;
					 }
					 
			   },
			   error: function(xhr, ajaxOptions, thrownError) {
					 alert(xhr.status);
					 alert(thrownError);
			   }
			})
        });
       
	   //Subscribe button click handler
	    $(document).on("click", "#two-screen", function(evt)
        {
			 //Get Prev Data
            var user_cell = $('input#mobile').val(); //Get email and check if that is true
			alert('user entered='+user_cell+' and token='+token);
			//Check data
			$.ajax({
			   type: "POST",
			   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/number/save/1",
			   data: {number:user_cell, parentid: parentid, hardwareid: token, appid: appid },
			   dataType: "json",
			   success: function(data) {
					 if(data.error==0){
						$.ui.loadContent("#uib_page_2",false,false,"slide");
					 }else{ alert('You got some error'); return false; }
					 
			   },
			   error: function(xhr, ajaxOptions, thrownError) {
					 alert(xhr.status);
					 alert(thrownError);
			   }
			})
		});
		
		$(document).on("click", ".uib_w_list", function(evt)
        {
         activate_subpage("#uib_page_3"); 
        });

}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
    //    initPushPlug();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		register_event_handlers();
        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"16692000019","ecb":"app.onNotificationGCM"});
    },
        // result contains any message sent from the plugin call
        successHandler: function(result) {
                alert('Callback Success! Result = '+result)
        },
        //Any errors? 
        errorHandler:function(error) {
                alert(error);
        },
        onNotificationGCM: function(e) {

        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
					token = e.regid;
                }
            break;
 
            case 'message':
						  // this is the actual push notification. its format depends on the data model from the push server
					//	  alert('push message = '+e.message);
						  var _cont = '<li class="widget uib_w_list" data-uib="app_framework/listitem" data-ver="0">\
										<a href="#uib_page_3" data-transition="slide">'+e.message+'</a></li>';
						  $('ul#pushes').append(_cont);
                          
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }
};
