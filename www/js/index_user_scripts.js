(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
         $(".uib_w_9").click(function(evt)
        {
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($(".uib_w_2"));  
        });
        $(".uib_w_14").click(function(evt)
        {
         activate_subpage("#Profile_page"); 
        });
        $("#home-btn").click(function(evt)
        {
         activate_subpage("#mainsub"); 
        });
        $("#favorites-btn").click(function(evt)
        {
         activate_subpage("#Favorite_page"); 
        });
        $("#messages-btn").click(function(evt)
        {
         activate_subpage("#Messages_page"); 
        });
        $("#profile-btn").click(function(evt)
        {
         activate_subpage("#Profile_page"); 
        });
}
 $(document).ready(register_event_handlers);
})();
