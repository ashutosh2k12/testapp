(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
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
        $(document).on("click", ".uib_w_10", function(evt)
        {
         activate_page("#uib_page_2"); 
        });
        $(document).on("click", ".uib_w_5", function(evt)
        {
         activate_page("#uib_page_1"); 
        });
        $(document).on("click", ".uib_w_18", function(evt)
        {
         activate_subpage("#uib_page_2sub"); 
        });
}
 $(document).ready(register_event_handlers);
})();
