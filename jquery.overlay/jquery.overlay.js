jQuery.overlay = (function($){
/*  Grey out page with a white div right on top. close by clicking away.
    Written by Charles Knight, charles@rabidaudio.com - 2014
    
    TODO - this can be done without jQuery. Eventually remove the dependancy.
*/
    if($===undefined) throw "jQuery is required to use this module";
    var module={};
    module.on = false;
    module.update = function(){
        var ob = $('#ol-overbox')[0];
        //Vertical
        var h = $(ob).height();
        var wh = $(window).height();
        $(ob).css('top', parseInt((wh-h)/2) + $(window).scrollTop() );
        //Horizontal
        var w = $(ob).width();
        var ww = $(window).width();
        $(ob).css('right', parseInt((ww-w)/2) + $(window).scrollLeft() );
    };
        
    module.create = function(content, overbox_classes, overlay_classes){
        module.destroy();
        var ob = $('<div/>', {
            id: 'ol-overbox',
            class: "overbox"+(overbox_classes ? " "+overbox_classes : "")
        }).appendTo(document.body);
        var ol = $('<div/>', {
            id: 'ol-overlay',
            class: "overlay"+(overlay_classes ? overlay_classes : "")
        }).appendTo(document.body);
        $(ob).append(content);
        $(window).scroll(module.update);
        $(window).resize(module.update);
        $(ol).click(module.destroy);
        module.on=true;
        setTimeout(module.update,0); //inital positioning
        return ob;
    };

    module.destroy = function(){
        module.on= false;
        $('div[id|=ol]').remove();
        $(window).off('scroll').off('resize');
    };
    return module;
}(jQuery));
