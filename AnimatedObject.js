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

 function AnimatedObject(){ 
 	this.currentFrame = 0;	
	this.maxFrame = 0;
	this.frameWidth = 0;
	this.lastFrameChange = 0;
	this.timebetweenframes = 40; // ms
  this.offsetFrame =1;
  this.repeat = true;
  this.backward = false;
  this.scale = 1;
  
	/**
	 * Draw the object
	 * @param {Object} context
	 */
  this.Draw = function(context) 
	{
		var thisFrame = new Date().getTime();
		if (this.lastFrameChange == 0) {
      this.lastFrameChange=thisFrame;
    }
    var sourceX = this.frameWidth * this.currentFrame;		
 	  if ((this.currentFrame<this.maxFrame)&&!(this.currentFrame<0)){
      context.drawImage(this.image, sourceX, 0, this.frameWidth, this.image.height, this.x, this.y, this.frameWidth*this.scale, this.image.height*this.scale);
    }
		if ((thisFrame-this.lastFrameChange)>this.timebetweenframes)
		{
			var nbskipped = Math.floor((thisFrame-this.lastFrameChange)/this.timebetweenframes);

			for (var i=0;i<nbskipped;i++)
			{
				if (this.backward){
					this.currentFrame -= this.offsetFrame;
					if ((this.currentFrame <0)&&this.repeat) this.currentFrame = this.maxFrame;	        
				}else{
					this.currentFrame += this.offsetFrame;
					if ((this.currentFrame >= this.maxFrame)&&this.repeat) this.currentFrame = 0;	        
				}
			}			
			this.lastFrameChange = thisFrame;
		}					
		if (this.DrawBoundingbox)
		{
			context2D.fillStyle = "rgba(255, 255, 0, 0.5)";
 			context2D.fillRect (this.x+this.X1collide, this.y+this.Y1collide, this.X2collide-this.X1collide, this.Y2collide-this.Y1collide);
		}		
	}

	this.DrawFromCamera = function(context,camera) 
	{
		var thisFrame = new Date().getTime();		
    var sourceX = this.frameWidth * this.currentFrame;		
 	    context.drawImage(this.image, sourceX, 0, this.frameWidth, this.image.height, this.x, this.y, this.frameWidth, this.image.height);
		if ((thisFrame-this.lastFrameChange)>this.timebetweenframes)
		{
			this.maxFrame = Math.round(this.image.width/this.frameWidth);
	 		this.currentFrame += 1;
			if (this.currentFrame == this.maxFrame) this.currentFrame = 0;	
			this.lastFrameChange = thisFrame;
		}					
		if (this.DrawBoundingbox)
		{
			context2D.fillStyle = "rgba(255, 255, 0, 0.5)";
 			context2D.fillRect (this.x+this.X1collide-camera.x, this.y+this.Y1collide-camera.y, this.X2collide-this.X1collide, this.Y2collide-this.Y1collide);
		}		
	}
	
	/**
	 * Set a new animation to the object
	 * @param {Object} animation
	 * @param {Object} nbframes
	 */
	this.SetAnimation = function(animation, nbframes)
	{
    this.image = animation;
		this.maxFrame=nbframes;
		this.frameWidth = this.image.width/this.maxFrame;
	}
	
	/**
	 * Constructor
	 * @param {Object} animation
	 * @param {Object} x
	 * @param {Object} y
	 * @param {Object} nbframes
	 */
  this.initializeAnimatedObject = function(animation, x, y, nbframes)
	{
    this.initializeObject(x, y);
    this.image = animation;
		this.maxFrame=nbframes;
		this.currentFrame = 0;	
		this.frameWidth = this.image.width/this.maxFrame;
    return this;		
	}
	
	
 }
AnimatedObject.prototype = new VisualObject;
