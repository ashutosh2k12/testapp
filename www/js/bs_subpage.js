
window.activate_subpage = function(sel, have_state)
{
    var $dn = $(sel);
    $dn.parents(".upage").find(".upage-content").addClass("hidden");
    $dn.removeClass("hidden");
    var parent_sel = "#" + $dn.parents(".upage").attr("id");
    var parent_vis = $(parent_sel).is(":visible");
    if(parent_vis)
    {
        if(!have_state){ window.history.pushState({usubpage:sel}, sel, document.location.origin + document.location.pathname + "#" +sel); }
    }
    else
    {
        //now activate parent page
        activate_page(parent_sel);
        window.history.replaceState({usubpage:sel}, sel, document.location.origin + document.location.pathname + "#" + sel);
    }
}


/* this function not used by jQueryMobile or Intel App Framework */
window.activate_page = function(sel, have_state)
{
    var $dn = $(sel);
    var is_vis = $dn.is(":visible");
    if(!is_vis)
    {
        $dn.parents("body").find(".upage").addClass("hidden");
        $dn.removeClass("hidden");
        
        if(!have_state){ window.history.pushState({upage:sel}, sel, document.location.origin + document.location.pathname +sel); }
    }
}




window.onpopstate = function(event) 
{
    //console.log("onpopstate location: " + document.location + ", state: " + JSON.stringify(event.state), ", length:", window.history.length);
    if(event.state)
    {
        if(event.state.usubpage){ activate_subpage(event.state.usubpage, true); }
        else if(event.state.upage){ activate_page(event.state.upage, true); }
    }
};


$(document).ready(function(){ setTimeout(function(){ var sel = "#mainsub"; window.history.pushState({usubpage:sel}, sel, document.location.origin + document.location.pathname + "#" + sel); }, 300); });