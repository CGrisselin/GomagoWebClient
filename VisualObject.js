/*	Animated-HTML5
	Copyright (C) 2012 - Christophe Grisselin		
 	https://github.com/CGrisselin/animated-html5
	
 	This JavaScript code in this page is free software: you can
    redistribute it and/or modify it under the terms of the GNU
    General Public License (GNU GPL) as published by the Free Software
    Foundation, either version 3 of the License, or (at your option)
    any later version.  The code is distributed WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS
    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

    As additional permission under GNU GPL version 3 section 7, you
    may distribute non-source (e.g., minimized or compacted) forms of
    that code without the copy of the GNU GPL normally required by
    section 4, provided you include this license notice and a URL
    through which recipients can access the Corresponding Source.
 */	
 
 function VisualObject()
 {
	this.image = null;
	this.DrawBoundingbox = false;
	this.alpha = 1;
  
	/**
	 * Draw this object on the context2d passed in paramater
	 * @param {CanvasRenderingContext2D} context
	 */
    this.Draw = function(context)
    {
      context.globalAlpha=this.alpha;
      context.drawImage(this.image, this.x , this.y);
			if (this.DrawBoundingbox)
			{
				context.fillStyle = "rgba(255, 255, 0, 0.5)";
				context.fillRect (this.x+this.X1collide, this.y+this.Y1collide, this.X2collide-this.X1collide, this.Y2collide-this.Y1collide);
			}
      context.globalAlpha=1;
    }

		this.DrawFromCamera = function(context,camera)
    {
      context.drawImage(this.image, this.x-camera.x , this.y-camera.y);
			if (this.DrawBoundingbox)
			{
				context.fillStyle = "rgba(255, 255, 0, 0.5)";
				context.fillRect (this.x+this.X1collide-camera.x, this.y+this.Y1collide-camera.y, this.X2collide-this.X1collide, this.Y2collide-this.Y1collide);
			}
    }		
	/**
	 * Constructor.
	 * @param {Image} image image
	 * @param {Number} x coord x
	 * @param {Number} y coord y
	 */
    this.initializeVisualObject = function(image, x, y)
    {
        this.initializeObject(x, y);
        this.image = image;
        return this;
    }
 }
VisualObject.prototype = new GameObject;