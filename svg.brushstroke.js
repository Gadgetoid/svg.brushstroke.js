SVG.extend(SVG.Shape, {
    brushStroke: function(delay,speed){
        function getLength( obj ){
            switch( obj.type ){
                case 'path':
                    return obj.node.getTotalLength();
                case 'polygon':
                    var pl = draw.path('M'+obj.attr('points')+'z').hide();
                    console.log(pl.node.getTotalLength());
                    return pl.node.getTotalLength();
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
        }
        var obj=this,len = getLength(obj);
        if(len==-1) return;
        if(typeof speed === 'undefined') speed = len;
        obj.attr({
            'stroke-dasharray':len,
            'stroke-dashoffset':len,
        });
        setTimeout(function(){
            obj.animate(speed).attr({'stroke-dashoffset':0,});
        },delay);
    }
})
