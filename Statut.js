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
 
 function Statut()
{
  this.TempsDebut=0;
  this.TempsActuel=0;
  this.TempsFin=3;
  this.RetardNavigateur=0;
  this.img=null;
	
	this.initStatut = function(image,x,y)
	{
		this.initializeVisualObject(image, x, y);		
		this.img=image.src;
		return this;
	}	
	
  this.Render = function(context){
    //remplissage : d�but 3, taille 60
    this.TempsActuel=(new Date().getTime())+this.RetardNavigateur;
    var tailleremplissage =0;
    if (((this.Tempsfin-this.TempsDebut)!=0)&&(this.TempsActuel<this.TempsFin)){
      tailleremplissage = ((this.TempsActuel-this.TempsDebut)/(this.TempsFin-this.TempsDebut));
	  //context.fillText("tr : "+tailleremplissage,this.x,this.y+50);
	  if (tailleremplissage>1) {
	    tailleremplissage=1;
	  }
	  if (tailleremplissage<0) {
		tailleremplissage=0;
	  }
    }else{
      tailleremplissage = 1;
    }
    
    if (tailleremplissage<1) {
			this.Draw(context);			
			//context.drawImage(img_barre_chargement_remplissage_orange, this.x, this.y,tailleremplissage*25,22);
			
			if(this.img!='http://www.gomago.eu/images/fr/combats/barrechargement_canon.png'){
			  this.Draw(context);			
			  context.drawImage(img_statut_remplissage, this.x, this.y,tailleremplissage*25,22);
			}else{
			  this.Draw(context);			
			  context.drawImage(img_barre_chargement_remplissage_canon, this.x+19, this.y+1,tailleremplissage*59,10);
			}
		}	
  }
}
Statut.prototype = new VisualObject;


