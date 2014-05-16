(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
         $(document).on("click", ".uib_w_13", function(evt)
        {
         activate_subpage("#uib_page_3"); 
        });
        
        
        $(document).on("click", ".uib_w_16", function(evt)
        {
         activate_subpage("#uib_page_2sub"); 
        });
}
 $(document).ready(register_event_handlers);
})();
