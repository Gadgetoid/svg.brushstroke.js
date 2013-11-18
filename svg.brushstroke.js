// svg.brushstroke.js 0.3 - Copyright (c) 2013 Philip Howard - Licensed under the MIT license
SVG.extend(SVG.Shape, {
    bs_getTotalLength: function( obj ){
            switch( obj.type ){
                case 'path':
                    return obj.node.getTotalLength();
                case 'polygon':
                    // TODO: SVG.js seems to have a bug that loses polygon points when animating
                    var d = document.createElement('div'),
                        t = SVG(d),
                        pl = t.path('M'+obj.attr('points')+'z').hide(),
                        l = pl.node.getTotalLength();
                    d=t=pl=null;
                    return l;
                case 'line':
                    var x = obj.node.x2.baseVal.value
                        - obj.node.x1.baseVal.value,
                        y = obj.node.y2.baseVal.value
                        - obj.node.y1.baseVal.value;
                    return Math.sqrt( (x*x) + (y*y) );
                case 'ellipse':
                    var rx = obj.node.rx.baseVal.value,
                        ry = obj.node.ry.baseVal.value,
                        p = ((rx*rx + ry*ry)/2);
                    return Math.ceil(2*Math.PI*Math.sqrt(p));   
                case 'rect':
                    var w = obj.node.width.baseVal.value,
                        h = obj.node.height.baseVal.value;
                    return (w*2) + (h*2);
                default:
                    return -1;
            } 
        },
    brushStroke: function(delay,speed,reverse){
    
        var obj=this,len = this.bs_getTotalLength(obj);
        if(len==-1) return;
        if(typeof speed === 'undefined') speed = len;
        if(typeof reverse === 'undefined') reverse = false;
        
        
        if(typeof jQuery === 'undefined'){
            obj.attr({
                'stroke-dasharray':len,
                'stroke-dashoffset':reverse ? 0:len,
            });
            setTimeout(function(){
                obj.animate(speed).attr({'stroke-dashoffset':reverse ? len:0,});
            },delay);
        }
        else
        {
            jQuery(obj.node).css({
                'transition':'stroke-dashoffset 0s ease-in-out',
                'stroke-dasharray':len,
                'stroke-dashoffset':(reverse)?0:len,
            });
            
            jQuery('document').ready(function(){  
                setTimeout(function(){
                    jQuery(obj.node)
                        .css({'transition':'stroke-dashoffset ' + (speed/1000) + 's ease-in-out' })
                        .css({'stroke-dashoffset':(reverse)?len:0});
                },delay);
            });
        }
        
    }
})
