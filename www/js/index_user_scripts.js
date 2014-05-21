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

function fetchPushes()
{
$.ui.blockUI(0.1);
	$.ui.showMask("Fetching messages...");
	//Check data
	$.ajax({
	   type: "POST",
	   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/pushes",
	   data: {token: token},
	   dataType: "json",
	   success: function(data) {
		$.ui.hideMask();
		$.ui.unblockUI();
		var pushes = data.pushes;
		 if(pushes.length>0){
			var _cont = '';
			var push_array = [];
			for(var i=0;i<pushes.length;i++)
			{
				var pushdatakey = guid();
				var jsdata = { pushid:pushdatakey, appid : pushes[i].appid, msg: pushes[i].message, sent_on: pushes[i].created_on};
				push_array.push(jsdata);
			 _cont += '<li class="widget uib_w_list list-push" data-uib="app_framework/listitem" data-ver="0" data-push="'+pushdatakey+'">'+pushes[i].message+'</li>';
			}
			
			var pushdataval = JSON.stringify(push_array);
			window.sessionStorage.setItem('push', pushdataval);
			
			$('ul#pushesfetch').empty().append(_cont);
		 }
	   },
	   error: function(xhr, ajaxOptions, thrownError) {
			 alert(xhr.status);
			 alert(thrownError);
			 $.ui.hideMask();
			 $.ui.unblockUI();
	   }
	})
}

//Fetch all pushes
function showPushes(div)
{
	$.ui.enableSideMenu();
	var push_sess = window.sessionStorage.getItem('push');
	if(push_sess === undefined || push_sess === null || push_sess.length === 0){
		fetchPushes();
	}else{
	var data_push = JSON.parse(push_sess);
	if(data_push.length > 0){
		var _cont = '';
		for(var j=0;j<data_push.length;j++)
		{
			_cont += '<li class="widget uib_w_list list-push" data-uib="app_framework/listitem" data-ver="0" data-push="'+data_push[j].pushid+'">'+data_push[j].msg+'</li>';	
		}
		$('ul#pushesfetch').empty().append(_cont);
	}else{	fetchPushes();	}	
	}
}


//Fetch application via ajax
function fetchApps()
{
	$.ui.blockUI(0.1);
	$.ui.showMask("Fetching applications...");
	//Check data
	$.ajax({
	   type: "POST",
	   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/apps",
	   data: {token: token},
	   dataType: "json",
	   success: function(data) {
		$.ui.hideMask();
		$.ui.unblockUI();
			 if(data.apps.length>0){
				var _cont = '';
				var apps_array = [];
				for(var i=0;i<data.apps.length;i++)
				{
				//
				var appdata = { appid:data.apps[i].appid, appname : data.apps[i].app_name, app_desc: data.apps[i].app_desc, pin:data.apps[i].pin};
				apps_array.push(appdata);
				 _cont += '<li class="widget uib_w_list list-apps" data-uib="app_framework/listitem" data-ver="0">\
										<a href="#uib_page_3" data-transition="slide">'+data.apps[i].app_name+'</a></li>';
				}
				var appdataval = JSON.stringify(apps_array);
				window.sessionStorage.setItem('apps', appdataval);
				$('ul#pushes').empty().append(_cont);
			 }
			 else{
				alert('Error: '+data.error_response);
			//	return false;
			 }
			 
	   },
	   error: function(xhr, ajaxOptions, thrownError) {
			 alert(xhr.status);
			 alert(thrownError);
			 $.ui.hideMask();
			 $.ui.unblockUI();
	   }
	})
}

//Fetch all applications
function showApps(div)
{
	$.ui.enableSideMenu();
	var app_sess = window.sessionStorage.getItem('apps');
	if(app_sess === undefined || app_sess === null || app_sess.length === 0){
		fetchApps();
	}else{
	var data_app = JSON.parse(app_sess);
	if(data_app.length > 0){
		var _cont = '';
		for(var j=0;j<data_app.length;j++)
		{
			_cont += '<li class="widget uib_w_list list-apps" data-uib="app_framework/listitem" data-ver="0">\
										<a href="#uib_page_3" data-transition="slide">'+data_app[j].appname+'</a></li>';
		}
		$('ul#pushes').empty().append(_cont);
	}else{	fetchApps();	}	
	}
	
}

window.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();


var token; //The Token
var parentid;
var appid;
//$.ui.disableSideMenu();

function register_event_handlers()
 {   	 
         $(document).on("click", "#one-screen", function(evt)
        {
			if(typeof token == 'undefined' || token == 0 || token === null)
			{
				 $.ui.popup( {
						   title:"Oops!",
						   message: 'The device haven\'t yet received its token',
						   cancelText:"Dismiss",
						   cancelCallback: function(){console.log("cancelled");},
						   cancelOnly:true
				});
				return false;
			}
            //Get Prev Data
            var admin_email = $('input#admin_email').val(); //Get email and check if that is true
            var admin_pin = $('input#admin_pin').val();
			$.ui.blockUI(0.1);
			$.ui.showMask("Verifying...");
			//Check data
			$.ajax({
			   type: "POST",
			   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/user",
			   data: {email:admin_email, pin: admin_pin, hardwareid: token },
			   dataType: "json",
			   success: function(data) {
				$.ui.hideMask();
				$.ui.unblockUI();
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
					 $.ui.hideMask();
					 $.ui.unblockUI();
			   }
			})
        });
       
	   //Subscribe button click handler
	    $(document).on("click", "#two-screen", function(evt)
        {
			 //Get Prev Data
            var user_cell = $('input#mobile').val(); //Get email and check if that is true
			$.ui.blockUI(0.1)
			$.ui.showMask("Registering...");
			//Check data
			$.ajax({
			   type: "POST",
			   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/number/save/1",
			   data: {number:user_cell, parentid: parentid, hardwareid: token, appid: appid },
			   dataType: "json",
			   success: function(data) {
					$.ui.hideMask();
					$.ui.unblockUI();
					 if(data.error==0){
						$.ui.loadContent("#uib_page_2",false,false,"slide");
					 }else{ alert('You got some error'); return false; }
					 
			   },
			   error: function(xhr, ajaxOptions, thrownError) {
					 alert(xhr.status);
					 alert(thrownError);
					 $.ui.hideMask();
					 $.ui.unblockUI();
			   }
			})
		});
		
		$(document).on("click", ".list-apps", function(evt)
        {
         activate_subpage("#uib_page_3"); 
        });
		
		$("#uib_page_2").bind("doubleTap",function(){	alert('double tap'); });
		
		$(document).on("click", ".list-push", function(evt)
        {
		//	alert('hello');
			var push_key= $(this).data('push');
			var msg = $(this).text();
			var data_push = JSON.parse(window.sessionStorage.getItem('push'));
			for(var j=0;j<data_push.length;j++)
			{
				if(data_push[j].pushid==push_key)
				{
					$('#push-stat').html('<p>push id= '+data_push[j].pushid+' <br>appid='+data_push[j].appid+' <br> and data='+msg+' sent on='+data_push[j].sent_on+'</p>');
					
				}
			}
		//	$.ui.updatePanel("#push-stat","This is the new content");
		$.ui.loadContent("#uib_page_4",false,false,"slide");
     //    activate_subpage("#uib_page_4"); 
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
	    $.ui.disableSideMenu();
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
              //  alert('Callback Success! Result = '+result)
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
					alert('Ok! got the device registered');
                }
            break;
 
            case 'message':
			
						  // this is the actual push notification. its format depends on the data model from the push server
					//	  alert('push message = '+e.message);
					/*
						  var _cont = '<li class="widget uib_w_list" data-uib="app_framework/listitem" data-ver="0">\
										<a href="#uib_page_3" data-transition="slide">'+e.message+'</a></li>';
						  $('ul#pushes').append(_cont);
					*/
						  $.ui.popup( {
						   title:"Push Received!",
						   message: e.message,
						   cancelText:"Dismiss",
						   cancelCallback: function(){console.log("cancelled");},
						   doneText:"I'm done!",
						   doneCallback: function(){console.log("Done for!");},
						   cancelOnly:false
						 });
						  navigator.notification.beep(3); //Make a beep sound
					//	  $.ui.updateContentDiv("#myDiv","This is the new content");
                          
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
