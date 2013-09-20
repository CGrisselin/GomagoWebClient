/*	Gomago Fight WebClient
	Copyright (C) 2012 - Fantasy Factories		
 	Developped by Christophe Grisselin and Nicolas Poissonnet
	
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

function SortGlace()
{
  this.anim = null;
 	/**
	 * Constructor
	 */
	this.initSortGlace = function(x,y)
	{
		this.anim = new AnimatedObject().initializeAnimatedObject(img_anim_glace,x, y, 14);
 		this.anim.timebetweenframes = 70;
		this.anim.currentFrame=14;
    this.anim.scale = 1;
    this.anim.repeat=false;
 		return this;		
	}
  
  this.play = function(){
    this.anim.backward=false;
    this.anim.currentFrame=0;
		this.lastFrameChange = 0;
  }
  
  this.Render =function(context){
     this.anim.Draw(context);
  }
}
