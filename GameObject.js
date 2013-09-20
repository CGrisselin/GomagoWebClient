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

 function GameObject()
 {
	this.x = 0;
	this.y = 0;
	
	// Indicate if this object can collide with another
	this.solid = false;
	
	// Boudingbox
	this.X1collide = 0;
	this.Y1collide = 0;
	this.X2collide = 0;
	this.Y2collide = 0;
	
	// ** Movement utility
	// Indicate that this object can't move
	this.fixed = true;
	this.xvelocity = 0;
	this.yvelocity = 0;
	this.nextx = 0;
	this.nexty = 0;
		
	
	/**
	 * Constructor.
	 * @param {Number} x coord x
	 * @param {Number} y coord y
	 */
	this.initializeObject = function(x, y)
	{
        this.x = x;
        this.y = y;
		return this;
	}

	/**
	 * Set the collide box
	 * @param {Object} x1
	 * @param {Object} y1
	 * @param {Object} x2
	 * @param {Object} y2
	 */
	this.SetCollideBox = function(x1, y1, x2, y2)
	{
		this.X1collide = x1;
		this.Y1collide = y1;
		this.X2collide = x2;
		this.Y2collide = y2;	
		this.solid = true;	
	}

	/**
	 * Compute the next position
	 */
	this.ComputeNextPosition = function()
	{
		this.nextx = this.x + this.xvelocity;
		this.nexty = this.y + this.yvelocity;		
	}

	/**
	 * Validate the next move
	 */
	this.ValidateMove = function() 
	{
		this.x = this.nextx;
		this.y = this.nexty;
	}

	/**
	 * Indicate if current object will collide the object passed in parameter
	 * @param {Object} randomObject
	 */
	this.WillCollideHorizontal = function(randomObject)
	{		
		return  (randomObject.solid && !(((this.nextx + this.X1collide) >= (randomObject.x + randomObject.X2collide))   		// trop à droite
		 		|| ((this.nextx + this.X2collide) <= (randomObject.x + randomObject.X1collide)) 		// trop à gauche
		 		|| ((this.y + this.Y1collide) >= (randomObject.y + randomObject.Y2collide)) 		// trop en bas
		 		|| ((this.y + this.Y2collide) <= (randomObject.y + randomObject.Y1collide))));  	// trop en haut
	}	

	this.WillCollideVertical = function(randomObject)
	{		
		return  (randomObject.solid && !(((this.x + this.X1collide) >= (randomObject.x + randomObject.X2collide))   		// trop à droite
		 		|| ((this.x + this.X2collide) <= (randomObject.x + randomObject.X1collide)) 		// trop à gauche
		 		|| ((this.nexty + this.Y1collide) >= (randomObject.y + randomObject.Y2collide)) 		// trop en bas
		 		|| ((this.nexty + this.Y2collide) <= (randomObject.y + randomObject.Y1collide))));  	// trop en haut
	}	
	
	this.WillCollide = function(randomObject)
	{		
		return  (randomObject.solid && !(((this.nextx + this.X1collide) >= (randomObject.x + randomObject.X2collide))   		// trop à droite
		 		|| ((this.nextx + this.X2collide) <= (randomObject.x + randomObject.X1collide)) 		// trop à gauche
		 		|| ((this.nexty + this.Y1collide) >= (randomObject.y + randomObject.Y2collide)) 		// trop en bas
		 		|| ((this.nexty + this.Y2collide) <= (randomObject.y + randomObject.Y1collide))));  	// trop en haut
	}	
		
	/**
	 * Indicate if current object collide the object passed in parameter
	 * @param {Object} randomObject
	 */
	this.IsCollide = function(randomObject)
	{		
		return  (randomObject.solid && !(((this.x + this.X1collide) >= (randomObject.x + randomObject.X2collide))   		// trop à droite
		 		|| ((this.x + this.X2collide) <= (randomObject.x + randomObject.X1collide)) 		// trop à gauche
		 		|| ((this.y + this.Y1collide) >= (randomObject.y + randomObject.Y2collide)) 		// trop en bas
		 		|| ((this.y + this.Y2collide) <= (randomObject.y + randomObject.Y1collide))));  	// trop en haut
	}	
 }
