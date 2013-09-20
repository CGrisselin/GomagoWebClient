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
 
function BarreVie()
{
  this.ValDebut=0;
  this.ValActuel=0;
  this.ValFin=3;
	this.mana = false;
  
	this.initBarre = function(x,y,vie)
	{
		if(vie){
			this.initializeVisualObject(img_barre_chargement_vie, x, y);			
			return this;
		}else{
			this.initializeVisualObject(img_barre_chargement_mana, x, y);
			return this;
		}
	}	

  this.Render = function(context){
    var tailleremplissage =0;
    if (((this.ValFin-this.ValDebut)!=0)&&(this.ValActuel<this.ValFin)){
      tailleremplissage = 59*((this.ValActuel-this.ValDebut)/(this.ValFin-this.ValDebut));
			//context.fillText("tr : "+tailleremplissage,this.x,this.y+50);
			if (tailleremplissage>59) {
				tailleremplissage=59;
			}
			if (tailleremplissage<0) {
			tailleremplissage=0;
			}
			if ((tailleremplissage<1)&&(tailleremplissage>0)) {
			tailleremplissage=1;
			}
			
    }else{
      tailleremplissage = 59;
    }
    
    if (this.mana){
          context.drawImage(img_barre_chargement_remplissage_mauve, this.x+19, this.y+1,tailleremplissage,10);
          context.fillStyle = "rgba(250, 250, 250, 1)";
    }else{
      if (tailleremplissage>38){
        context.drawImage(img_barre_chargement_remplissage_vert, this.x+19, this.y+1,tailleremplissage,10);
        context.fillStyle = "rgba(0, 0, 0, 1)";
      }else{
        if (tailleremplissage>19){
          context.drawImage(img_barre_chargement_remplissage_bleue, this.x+19, this.y+1,tailleremplissage,10);
          context.fillStyle = "rgba(0, 0, 0, 1)";
        }else{
          context.drawImage(img_barre_chargement_remplissage_rouge, this.x+19, this.y+1,tailleremplissage,10);
          context.fillStyle = "rgba(250, 250, 250, 1)";
        }
      }
    }

		
		context.font = "Bold 10px Arial";		  
    context.fillText(this.ValActuel,this.x+20,this.y+10);
  }

}
BarreVie.prototype = new VisualObject;


