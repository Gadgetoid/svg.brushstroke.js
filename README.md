svg.brushstroke.js
==================

This is a plugin for the [svg.js](http://svgjs.com) library to animate line drawing.

Svg.brushstroke.js is licensed under the terms of the MIT License.

## Usage

Include this plugin after including svg.js in your html document.

```javascript
var draw = SVG('paper'),
    path = draw.path('M10,20L30,40'),
    delay = 100,
    speed = 1000;

path.brushStroke(delay,speed);
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
