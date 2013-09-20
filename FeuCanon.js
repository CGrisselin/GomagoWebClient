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

function FeuCanon()
{
  this.boulet=null;
  this.sens= 1;
	this.decay=0;
	this.starttime=0;
	this.cible = null;
	this.valeur=0;
	/**
	 * Constructor
	 */
	this.initFeuCanon = function(x,y)
	{
		this.initializeAnimatedObject(img_anim_feucanon_gauche,x, y, 10);
    this.boulet = new VisualObject().initializeVisualObject(img_boulet, x, y+40);
		this.timebetweenframes = 60;
    this.repeat=false;
		return this;		
	}
  
	this.AGauche = function() {
		this.image = img_anim_feucanon_gauche;   
    this.sens=1;
	}

	this.ADroite = function() {
		this.image = img_anim_feucanon_droit;
    this.sens=-1;
	}
  
	this.Update = function(){
		var now = new Date().getTime();
    if ((this.boulet.xvelocity!=0)&&(now>(this.starttime+this.decay))){
			if (((Math.abs(this.boulet.x-this.x)>200) &&(this.sens==1))||((Math.abs(this.boulet.x-this.x)>200) &&(this.sens==-1))) {
				this.boulet.xvelocity =0;
        var decalage =10*(3-Math.floor(Math.random()*5));
				this.cible.ajouteTexteDegat("-"+this.valeur,2,decalage);
			}
			this.boulet.ComputeNextPosition();
			this.boulet.ValidateMove();	
		}
	}
	
  this.Render =function(context){    
		var now = new Date().getTime();
    if ((this.boulet.xvelocity!=0)&&(now>(this.starttime+this.decay))){
			this.Draw(context);
      this.boulet.Draw(context);
    }
  }
  
  this.play = function(decay,cible,valeur)
  {
		this.starttime = new Date().getTime();
		this.decay = decay;
		this.valeur = valeur;
    this.currentFrame = 0;
		this.lastFrameChange = 0;
    this.boulet.x=this.x;
    this.boulet.xvelocity =30*this.sens;
		this.cible = cible;
  }
}
FeuCanon.prototype = new AnimatedObject;