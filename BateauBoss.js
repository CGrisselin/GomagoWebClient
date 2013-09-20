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

function BateauBoss()
{

	this.initBateau = function(x,y)
	{
    this.init();
    this.nbLastCanon=4;
    this.nbTotalCanon=4;
		this.initializeVisualObject(img_bateauboss, x, y);
    this.ecume = new VisualObject().initializeVisualObject(img_ecume, x, y+18);
    
    for(var i=this.nbTotalCanon-1;i>=0;i--){
      this.g_feucanon[i]= new FeuCanon().initFeuCanon(this.x+114+13*i, this.y+100-i*5); 
      this.g_feucanon[i].repeat = false;
      this.g_feucanon[i].currentFrame=10;
    }
    
    this.sortGlace = new SortGlace().initSortGlace(this.x-190, this.y-120);
    this.sortFeu = new SortFeu().initSortFeu(this.x-150, this.y-140);
    
    this.sortGlace = new SortGlace().initSortGlace(this.x-110, this.y-140);
    this.sortFeu = new SortFeu().initSortFeu(this.x-160, this.y-90);
    
    this.barrem = new BarreChargem().initBarre(this.x+50, this.y+197);
    this.barredevie = new BarreVie().initBarre(this.x+50, this.y+184, true);    
    this.barredemana = new BarreVie().initBarre(this.x+50, this.y+197, false);    
    this.statut_canon = new Statut().initStatut(img_barre_chargement_canon, this.x+50, this.y+210);    
    this.barre = new BarreCharge().initBarre(this.x+50, this.y+235);
    this.barredemana.mana = true;
    
	this.statut_manoeuvre = new Statut().initStatut(img_statut_manoeuvre, this.x+50, this.y-20);
	this.statut_faillevaudou = new Statut().initStatut(img_statut_faille_vaudou, this.x+80, this.y-20);
	this.statut_fureurvaudou = new Statut().initStatut(img_statut_fureur_vaudou, this.x+110, this.y-20);
	this.statut_deviation = new Statut().initStatut(img_statut_deviation, this.x+50, this.y+10);
	this.statut_coquemoisie = new Statut().initStatut(img_statut_coque_moisie, this.x+80, this.y+10);
	this.statut_boucliervaudou = new Statut().initStatut(img_statut_bulle_vaudou, this.x+110, this.y+10);

    this.statut_canon = new Statut().initStatut(img_canon, this.x+60, this.y-30);


		return this;
	}	

	this.AGauche = function() {
		//this.image = img_bateaugauche;
    this.ecume.image = img_ecume;
    this.ecume.x = this.x+10;
    this.ecume.y = this.y+50;
    
    for(var i=this.nbTotalCanon-1;i>=0;i--){
      this.g_feucanon[i].initializeObject(this.x+114+13*i, this.y+100-i*5);      
      this.g_feucanon[i].AGauche();
    }

    this.sens=1;

	}

	this.ADroite = function() {
		//this.image = img_bateaudroit;
    this.ecume.x = this.x-18;
    this.ecume.y = this.y+50;
    this.ecume.image = img_ecume_droit;
    this.sens=-1;
    
   for(var i=this.nbTotalCanon-1;i>=0;i--){
      this.g_feucanon[i].initializeObject(this.x+24-13*i, this.y+101-i*5);      
      this.g_feucanon[i].ADroite();
    }    //this.g_feucanon[2].ADroite();
    //this.g_feucanon[3].ADroite();
	
	   this.sortGlace = new SortGlace().initSortGlace(this.x-80, this.y-140);
		this.sortFeu = new SortFeu().initSortFeu(this.x-120, this.y-90);
		
		this.barrem = new BarreChargem().initBarre(this.x+80, this.y+197);
		this.barredevie = new BarreVie().initBarre(this.x+80, this.y+184, true);    
		this.barredemana = new BarreVie().initBarre(this.x+80, this.y+197, false);    
		this.statut_canon = new Statut().initStatut(img_barre_chargement_canon, this.x+80, this.y+210);    
		this.barre = new BarreCharge().initBarre(this.x+80, this.y+235);
		this.barredemana.mana = true;
		
		this.statut_manoeuvre = new Statut().initStatut(img_statut_manoeuvre, this.x+80, this.y-20);
		this.statut_faillevaudou = new Statut().initStatut(img_statut_faille_vaudou, this.x+110, this.y-20);
		this.statut_fureurvaudou = new Statut().initStatut(img_statut_fureur_vaudou, this.x+140, this.y-20);
		this.statut_deviation = new Statut().initStatut(img_statut_deviation, this.x+80, this.y+10);
		this.statut_coquemoisie = new Statut().initStatut(img_statut_coque_moisie, this.x+110, this.y+10);
		this.statut_boucliervaudou = new Statut().initStatut(img_statut_bulle_vaudou, this.x+140, this.y+10);
	}
	
  this.tirCanon = function() {
    this.currentFrame=0;  
    this.lastFrameChange=0;    
  }
}
BateauBoss.prototype = new Bateau;


