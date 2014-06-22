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

window.AddNewApp = function()
{
//	window.localStorage.setItem('navigate','0');
	window.sessionStorage.removeItem('apps');
	window.sessionStorage.removeItem('push');
	$.ui.loadContent("#mainpage",true,true,"slide");
}

function decorateHeader(el)
{
	$('.sub_tab-1,.sub_tab-2,.sub_tab-3').removeClass('d_header');
	$(el).parent().parent().addClass('d_header');
}

function isBlocked(){
	$.ajax({
	   type: "POST",
	   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/user",
	   data: {token: token },
	   dataType: "json",
	   success: function(data) {
			if(data.blocked){
				window.sessionStorage.removeItem('apps');
				window.sessionStorage.removeItem('push');
				alert('The device has been blocked');
				$.ui.loadContent("#mainpage",true,true,"slide");
			}
	   }
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
			var appid_fetcher = '';
			var app_fetcher = window.sessionStorage.getItem('app_fetcher');
			window.sessionStorage.removeItem('app_fetcher');
			if(app_fetcher === undefined || app_fetcher === null || app_fetcher === ''){
				appid_fetcher = '';
			}else{
				appid_fetcher = app_fetcher;
			}
			for(var i=0;i<pushes.length;i++)
			{
				var pushdatakey = guid();
				var jsdata = { pushid:pushdatakey, appid : pushes[i].appid, msg: pushes[i].message, appname: pushes[i].app_name, sent_on: pushes[i].created_on};
				push_array.push(jsdata);
				if(appid_fetcher != ''){
			if(appid_fetcher == data_push[j].appid){
			 _cont += '<li class="widget uib_w_list list-push" data-uib="app_framework/listitem" data-ver="0" data-push="'+pushdatakey+'">\
			 <div class="app_name">'+pushes[i].app_name+'</div><div class="app_time">'+pushes[i].created_on+'</div><div class="app_push">'+pushes[i].message+'</div></li>';
			} }else{
				 _cont += '<li class="widget uib_w_list list-push" data-uib="app_framework/listitem" data-ver="0" data-push="'+pushdatakey+'">\
			 <div class="app_name">'+pushes[i].app_name+'</div><div class="app_time">'+pushes[i].created_on+'</div><div class="app_push">'+pushes[i].message+'</div></li>';
			}
			}
			
			var pushdataval = JSON.stringify(push_array);
			window.sessionStorage.setItem('push', pushdataval);
			
			$('ul#pushesfetch').empty().append(_cont);
		 }
	   },
	   error: function(xhr, ajaxOptions, thrownError) {
			 checkConnection();
			 $.ui.hideMask();
			 $.ui.unblockUI();
	   }
	})
}

//Fetch all pushes
function showPushes(div)
{
	$.ui.enableSideMenu();
//	isBlocked();
	$('.sub_tab-1,.sub_tab-2,.sub_tab-3').removeClass('d_header');
	$('.sub_tab-2').addClass('d_header');
	var push_sess = window.sessionStorage.getItem('push');
	if(push_sess === undefined || push_sess === null || push_sess.length === 0){
		fetchPushes();
	}else{
	var data_push = JSON.parse(push_sess);
	if(data_push.length > 0){
		var _cont = '';
		var appid_fetcher = '';
		var app_fetcher = window.sessionStorage.getItem('app_fetcher');
		window.sessionStorage.removeItem('app_fetcher');
		if(app_fetcher === undefined || app_fetcher === null || app_fetcher === ''){
			appid_fetcher = '';
		}else{
			appid_fetcher = app_fetcher;
		}
		
		for(var j=0;j<data_push.length;j++)
		{
			if(appid_fetcher != ''){
			if(appid_fetcher == data_push[j].appid){
			_cont += '<li class="widget uib_w_list list-push" data-uib="app_framework/listitem" data-ver="0" data-push="'+data_push[j].pushid+'">\
			<div class="app_name">'+data_push[j].appname+'</div><div class="app_time">'+data_push[j].sent_on+'</div><div class="app_push">'+data_push[j].msg+'</li>';	
			}
			}else{
				_cont += '<li class="widget uib_w_list list-push" data-uib="app_framework/listitem" data-ver="0" data-push="'+data_push[j].pushid+'">\
			<div class="app_name">'+data_push[j].appname+'</div><div class="app_time">'+data_push[j].sent_on+'</div><div class="app_push">'+data_push[j].msg+'</li>';
			}
		}
		$('ul#pushesfetch').empty().append(_cont);
	}else{	fetchPushes();	}	
	}
}

function appfetcher(obj){
	var app_clicked = $(obj).parent().data('appid');
	alert('appid='+app_clicked);
	window.sessionStorage.setItem('app_fetcher',app_clicked);
	$.ui.loadContent("#uib_page3",false,false,"slide");
}

//Profile
function showProfile()
{
	$('.sub_tab-1,.sub_tab-2,.sub_tab-3').removeClass('d_header');
	$('.sub_tab-3').addClass('d_header');
	var cellNumb = window.localStorage.getItem('subscriber_cell');
	var cellName = window.localStorage.getItem('subscriber_name');
	$('.cell_number').text(cellNumb);
	$('.cell_name').text(cellName);
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
				 _cont += '<li class="widget uib_w_list list-apps app-fetch" data-uib="app_framework/listitem" data-appid="'+data.apps[i].appid+'" data-ver="0">\
										<a onclick="appfetcher(this)" data-transition="slide">'+data.apps[i].app_name+'</a></li>';
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
			 checkConnection();
			 $.ui.hideMask();
			 $.ui.unblockUI();
	   }
	})
}

//Fetch all applications
function showApps(div)
{
	$.ui.enableSideMenu();
//	isBlocked();
	$('.sub_tab-1,.sub_tab-2,.sub_tab-3').removeClass('d_header');
	$('.sub_tab-1').addClass('d_header');
	var app_sess = window.sessionStorage.getItem('apps');
	if(app_sess === undefined || app_sess === null || app_sess.length === 0){
		fetchApps();
	}else{
	var data_app = JSON.parse(app_sess);
	if(data_app.length > 0){
		var _cont = '';
		for(var j=0;j<data_app.length;j++)
		{
			_cont += '<li class="widget uib_w_list list-apps" data-uib="app_framework/listitem" data-appid="'+data_app[j].appid+'" data-ver="0">\
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
var connectionStatus = false;
//$.ui.disableSideMenu();

function checkConnection() {
        var networkState = navigator.network.connection.type;
		if(networkState == Connection.NONE)
		{
			window.sessionStorage.removeItem('apps');
			window.sessionStorage.removeItem('push');
			alert('No internet connecitivity. Try again later');
			$.ui.loadContent("#mainpage",true,true,"slide");
			return false;
		}
}
	
function register_event_handlers()
 {   	 
         $(document).on("click", "#one-screen", function(evt)
        {
			if(typeof token == 'undefined' || token == 0 || token === null)
			{
				navigator.notification.alert(
								'The device haven\'t yet received its token',  // message
								'Oops!',            // title
								'Dismiss'                  // buttonName
				);
				return false;
			}
            //Get Prev Data
            var admin_pin = $('input#admin_pin').val();
			var admin_number = $('input#admin_phone').val();
			var admin_name = $('input#admin_name').val();
			if(admin_pin == '' || admin_number == '' || admin_name == '')
			{
				navigator.notification.alert(
								'Please fill all the inputs',  // message
								'Oops!',            // title
								'Dismiss'                  // buttonName
				);
				return false;
			}
			$.ui.blockUI(0.1);
			$.ui.showMask("Verifying...");
			//Check data
			$.ajax({
			   type: "POST",
			   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/user",
			   data: {pin: admin_pin, hardwareid: token },
			   dataType: "json",
			   success: function(data) {
				$.ui.hideMask();
				$.ui.unblockUI();
					 if(data.error==0){
						if(data.hardware==true){	
							$.ui.loadContent("#uib_page_2",false,false,"slide"); //The final page
						}
						else{	
							parentid=data.userid; appid = data.appid; 
							$.ajax({
								   type: "POST",
								   url: "http://sumitjaiswal.com/area51/notifi/admin/rest/number/save/1",
								   data: {number:admin_number, parentid: parentid, hardwareid: token, appid: appid, username: admin_name },
								   dataType: "json",
								   success: function(data) {
										$.ui.hideMask();
										$.ui.unblockUI();
										 if(data.error==0){
											window.localStorage.setItem('navigate','1');
											window.localStorage.setItem('subscriber_cell',admin_number);
											window.localStorage.setItem('subscriber_name',admin_name);
											$.ui.loadContent("#uib_page_2",false,false,"slide");
										 }else{ alert('You got some error'); return false; }
										 
								   },
								   error: function(xhr, ajaxOptions, thrownError) {
										 checkConnection()
										 $.ui.hideMask();
										 $.ui.unblockUI();
								   }
								});
						
						
						} //The number verification page
					 }
					 else{
						checkConnection();
					//	return false;
					 }
					 
			   },
			   error: function(xhr, ajaxOptions, thrownError) {
					 checkConnection()
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
						window.localStorage.setItem('navigate','1');
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
		
		//Touch events
		$("#uib_page_2").bind("swipeLeft",function(){	$.ui.loadContent("#uib_page_3",false,false,"slide"); });
		$("#uib_page_3").bind("swipeLeft",function(){	$.ui.loadContent("#uib_page_1",false,false,"slide"); });
		$("#uib_page_3").bind("swipeRight",function(){	$.ui.loadContent("#uib_page_2",true,true,"slide"); });
		$("#uib_page_1").bind("swipeRight",function(){	$.ui.loadContent("#uib_page_3",true,true,"slide"); });
		
		function force_mobilepage()
		{
			
			var navigate = window.localStorage.getItem('navigate');
			if(navigate != undefined && navigate == '1'){
				
			}else{
				$.ui.loadContent("#uib_page_1",false,false,"slide");
				return false;
			}
		}
		
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
					$('#push-stat').html('<div class="push_name">Push Received On: <span class="time">'+data_push[j].sent_on+'</span></div> <div class="push_details"><span>'+data_push[j].msg+'</span><span class="push_appdet">Sent via: '+data_push[j].appname+'</span></div>');
					
				}
			}
		//	$.ui.updatePanel("#push-stat","This is the new content");
		$.ui.loadContent("#uib_page_4",false,false,"slide");
     //    activate_subpage("#uib_page_4"); 
        });

}

window.setupListUpdate = function(){
	$.ui.ready(function () {
                var scrollerList = $("#uib_page_3").scroller();
                
                scrollerList.addPullToRefresh();
                $.bind(scrollerList, "refresh-release", function () {
                    var self = this;
					fetchPushes();
                    self.hideRefresh();
					/*
                    setTimeout(function () { // get content from your api using ajax and display instead of setTimeout.
                        // add new content at top of list
						/*
						var firstli = $('ul#pushesfetch li:first').data('push');
						var data_push = JSON.parse(window.sessionStorage.getItem('push'));
						var last_pushtime = '';
						for(var j=0;j<data_push.length;j++)
						{
							if(data_push[j].pushid==firstli)	last_pushtime = data_push[j].sent_on;								
						}
                        $("#uib_page_3 ul").prepend("<li><a href='#detailview'>New Item (via Pull Refresh) "+last_pushtime+"</a></li>"); 
						*/
						
             //       }, 2000);
					
                    return false; //tells it to not auto-cancel the refresh
                });
				
                /* Infinite scroller removed
				
                scrollerList.addInfinite();
                $.bind(scrollerList, "infinite-scroll", function () {
                    var self = this;
                    $("#uib_page_3").find("#infinite").text("Loading...")
                    setTimeout(function () { // get content from your api using ajax and display instead of setTimeout.
                        $("#uib_page_3").find("#infinite").text("Load More");
                        // add new content at bottom of list
                        $("#uib_page_3 ul").append("<li><a href='#detailview'>Next Item (via Infinite Scroll)</a></li>");
                        self.clearInfinite();
                    }, 2000);
                });
                
                scrollerList.enable();
				*/
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
		setupListUpdate();
	//Check if device has already been registered
		var hwd_sess = window.localStorage.getItem('token');
		if(hwd_sess != undefined && hwd_sess != ''){
			token = hwd_sess;
		}
		var navigate = window.localStorage.getItem('navigate');
		if(navigate != undefined && navigate == '1'){
			$.ui.loadContent("#uib_page_2",false,false,"slide");
		}
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
					window.localStorage.setItem('token',token);
		//			alert('Ok! got the device registered');
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
					/*
						  $.ui.popup( {
						   title:"Push Received!",
						   message: e.message,
						   cancelText:"Dismiss",
						   cancelCallback: function(){console.log("cancelled");},
						   doneText:"I'm done!",
						   doneCallback: function(){console.log("Done for!");},
						   cancelOnly:false
						 });
					*/
						  navigator.notification.alert(
								e.message,  // message
								'Push Received!',            // title
								'Dismiss'                  // buttonName
						  );
						  navigator.notification.vibrate(2000); //Vibrate for 2 secs
						  navigator.notification.beep(3); //Make beep sound 3 times
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
