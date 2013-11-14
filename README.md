svg.brushstroke.js
==================

This is a plugin for the [svg.js](http://svgjs.com) library to animate line drawing.

Svg.brushstroke.js is licensed under the terms of the MIT License.

Find a demo here: [http://jsfiddle.net/gadgetoid/Gh66f/](http://jsfiddle.net/gadgetoid/Gh66f/)

## Usage

Include this plugin after including svg.js in your html document.

```javascript
var draw = SVG('paper'),
    delay = 100,
    speed = 1000;

draw.path('M50,50 C75,80 125,20 150,50')
    .attr({
        fill: 'none',
        stroke: '#000',
        'stroke-width': 2,
    })
    .brushStroke(delay,speed);
```

## Using with Svg.import.js

Use the block functionality in [Svg.import.js](https://github.com/wout/svg.import.js) to draw SVG as it is loaded.

```javascript
var id = 1;
draw.svg(rawSvg, function() {
  // Ignore groups
  if(this.type=='g') return;
  
  var delay = 50*id;
  
  this.attr({
      fill: 'none',
      stroke: '#444',
      'stroke-width': 1,
  });
  
  this.lineFill && this.lineFill(delay);

  id++
})
```
