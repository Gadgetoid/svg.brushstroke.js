// svg.brushstroke.js 0.4 - Copyright (c) 2013 Philip Howard - Licensed under the MIT license
SVG.extend(SVG.Shape, {
    bs_forgetLength: function(){
        this.forget('bs_len');    
    },
    bs_getTotalLength: function( obj ){
            if( typeof obj === 'undefined' ) obj = this;
            var len = -1;
        
        // Performance: Store length for later retrieval
            if( typeof obj.remember('bs_len') === 'number' ) return obj.remember('bs_len');
        
            switch( obj.type ){
                case 'path':
                    len = obj.node.getTotalLength();
                    break;
                case 'polygon':
                    // TODO: SVG.js seems to have a bug that loses polygon points when animating
                    var d = document.createElement('div'),
                        t = SVG(d),
                        pl = t.path('M'+obj.attr('points')+'z').hide(),
                        l = pl.node.getTotalLength();
                    d=t=pl=null;
                    len=l;
                    break;
                case 'line':
                    var x = obj.node.x2.baseVal.value
                        - obj.node.x1.baseVal.value,
                        y = obj.node.y2.baseVal.value
                        - obj.node.y1.baseVal.value;
                    len=Math.sqrt( (x*x) + (y*y) );
                    break;
                case 'ellipse':
                    var rx = obj.node.rx.baseVal.value,
                        ry = obj.node.ry.baseVal.value,
                        p = ((rx*rx + ry*ry)/2);
                    len = Math.ceil(2*Math.PI*Math.sqrt(p));   
                    break;
                case 'rect':
                    var w = obj.node.width.baseVal.value,
                        h = obj.node.height.baseVal.value;
                    len = (w*2) + (h*2);
                    break;
            }
            obj.remember('bs_len', len);
            return len;
        },
    brushStroke: function(delay,speed,reverse){
    
        var obj=this,len = this.bs_getTotalLength(obj),p=false;
        if(len==-1) return;
        if(typeof speed === 'undefined') speed = len;
        if(typeof reverse === 'undefined') reverse = false;
        
        if(typeof reverse === 'number'){
            p=true;
            if(parseInt(reverse)==reverse) reverse/=100;
            reverse=1-reverse;
        }

        if(typeof jQuery === 'undefined'){
            obj.attr({
                'stroke-dasharray':len,
                'stroke-dashoffset':reverse ? 0:len,
            });
            setTimeout(function(){
                obj.animate(speed).attr({'stroke-dashoffset': p ? len*reverse : (reverse?len:0),});
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
                        .css({'stroke-dashoffset': p ? len*reverse : (reverse?len:0),});
                },delay);
            });
        }
        
    }
})
