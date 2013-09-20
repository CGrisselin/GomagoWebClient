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

function SortIfrit()
{
  
  this.sprite=null;
  this.sens=1;
  this.encours=false;
  this.vitesse=10;
  this.cap1=400;
  this.cap2=600;
  this.x=0;
  this.y=0;
  
 	/**
	 * Constructor
	 */
	this.initSortIfrit = function(x,y)
	{
    this.x=x;
    this.y=y;
    this.sprite = new VisualObject();
    this.sprite.initializeVisualObject(img_Ifrit, x, y);
    this.encours=false;
 		return this;		
	}
  
  this.versDroite= function(){
    this.sens = 1;
  }
  this.versGauche= function(){
    this.sens = -1;
  }
  
  this.play = function(){
    this.sprite.x=this.x;
    this.sprite.y=this.Y;
    this.sprite.alpha=0;
    this.encours=true;
  }
  
  this.Render =function(context){
    if (this.encours){
     this.sprite.Draw(context);
     this.sprite.x+=this.sens*this.vitesse;
     if (Math.abs(this.sprite.x-this.x)<this.cap1){
      if (this.sprite.alpha<1) {
        this.sprite.alpha+=0.1;
      }       
     }
     if (Math.abs(this.sprite.x-this.x)>this.cap2){
      if (this.sprite.alpha>0) {
        this.sprite.alpha-=0.1;
      }       
     }
    }
  }
  
}