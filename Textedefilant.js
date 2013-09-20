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

 function Textedefilant()
 {
	this.texte = "";
	this.couleur = "";
	this.duree =0;
	this.fontsize =0;
	this.gfx=false;
	
	
	this.Update = function()
	{
		this.ComputeNextPosition();
		this.ValidateMove();	
	}
	/**
	 * Draw this object on the context2d passed in paramater
	 * @param {CanvasRenderingContext2D} context
	 */
    this.Draw = function(context)
    {		
			
			if (this.gfx){

				var valasc=0;
				var posx=0;
				var i =0;
				for(i=0;i<this.texte.length;i++){
					valasc=this.texte.charCodeAt(i);
					//console.log(valasc);
					//chiffres 0 � 9
					if ((valasc>47)&&(valasc<58)){
						posx=valasc-48;
					}
					// -
					if (valasc==45){
						posx=10;
					}
					// +
					if (valasc==43){
						posx=11;
					}

					context.drawImage(img_chiffrescombat, posx*20, this.couleur*26, 20, 26, this.x+i*20, this.y+26, 20, 26);
				}
				
			}else{
				

				if (this.fontsize>12){
					if(context.font!="Bold "+this.fontsize+"pt Arial"){
						context.font = "Bold "+this.fontsize+"pt Arial";
						context.fillStyle = "rgba(0, 0, 0, 0.5)";
						context.strokeText(this.texte, this.x, this.y);
					}
				}else{
					if(context.font!="Bold "+this.fontsize+"pt Arial"){
						context.font = "Bold "+this.fontsize+"pt Arial";
					}
				}
				context.fillStyle = this.couleur;
				context.fillText(this.texte, this.x, this.y);
			}
    }

	/**
	 * Constructor.
	 * @param {String} texte texte
	 * @param {String} texte texte
	 * @param {Number} x coord x
	 * @param {Number} y coord y
	 */
    this.initializeTexteGFXdefilant = function(texte, couleur, x, y)
    {
        this.initializeObject(x, y);
				this.gfx =true;
        this.texte = texte;			
				this.couleur = couleur;
				this.yvelocity = -2;
        return this;
    }		
		
	/**
	 * Constructor.
	 * @param {String} texte texte
	 * @param {String} texte texte
	 * @param {Number} x coord x
	 * @param {Number} y coord y
	 */
    this.initializeTextedefilant = function(texte, couleur, fontsize, x, y)
    {
        this.initializeObject(x, y);
        this.texte = texte;
				this.fontsize=fontsize;
				this.couleur = couleur;
				this.yvelocity = -2;
        return this;
    }
 }
Textedefilant.prototype = new GameObject;