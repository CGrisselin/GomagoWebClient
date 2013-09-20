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
function BarreCharge()
{
  this.TempsDebut=0;
  this.TempsActuel=0;
  this.TempsFin=3;
  this.RetardNavigateur=0;

	
	this.initBarre = function(x,y)
	{
		this.initializeVisualObject(img_barre_chargement_tour, x, y);
		return this;
	}	

  this.Render = function(context){
    //remplissage : d�but 3, taille 60
    this.TempsActuel=(new Date().getTime())+this.RetardNavigateur;
    var tailleremplissage =0;
    if (((this.Tempsfin-this.TempsDebut)!=0)&&(this.TempsActuel<this.TempsFin)){
      tailleremplissage = 59*((this.TempsActuel-this.TempsDebut)/(this.TempsFin-this.TempsDebut));
	  //context.fillText("tr : "+tailleremplissage,this.x,this.y+50);
	  if (tailleremplissage>59) {
	    tailleremplissage=59;
	  }
	  if (tailleremplissage<0) {
			tailleremplissage=0;
	  }
    }else{
      tailleremplissage = 59;
    }
    
    context.drawImage(img_barre_chargement_remplissage, this.x+19, this.y+1,tailleremplissage,10);
    //context.fillText("t : "+this.TempsDebut+"-"+this.TempsActuel+"-"+this.TempsFin+".",this.x,this.y+30);
		//context.fillText("r : "+this.RetardNavigateur+".",this.x,this.y+40);
  }

}
BarreCharge.prototype = new VisualObject;


