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

function Bateau()
{
	
  this.sens=1;
  this.barre=null;
  this.barrem=null;  
  this.barredevie=null;
  this.barredemana=null;
  this.nbLastCanon=0;
  this.nbTotalCanon=0;
  this.lastTimeAction=0;  
  this.lastTime =0;
  this.ecume =null;
  this.sortGlace = null;
	this.sortFeu =null;
  this.statut_manoeuvre = null;
	this.statut_faillevaudou = null;
	this.statut_fureurvaudou = null;
	this.statut_deviation = null;
	this.statut_coquemoisie = null;
	this.statut_boucliervaudou = null;
	this.statut_canon=null;
	this.nombreTextes =0;
	this.nom="";
  this.listeTextes = null;
  this.g_feucanon=null;
  this.alphavelocity=0;
  this.dead = false;
  
  this.init=function(){
    this.listeTextes = new Array();
    this.g_feucanon=new Array();
  }
  
	this.ajouteTexteAction=function(texte){
		var decalage=0;
		if (this.sens==1){
			decalage = 80;
		}else{
			decalage = 120;
		}
		this.ajouteTexte(texte,"rgba(255, 52, 3, 1)",10,this.x-this.sens*decalage,100);		
	}
	
  this.kill=function() {
     this.alphavelocity=-0.02;
  }
  
	this.ajouteTexteDegat=function(valeur,couleur,x_decalage){
		var decalage=0;
		if (this.sens==1){
			decalage = 50;
		}else{
			decalage = 80;
		}
		this.listeTextes[this.nombreTextes]=new Textedefilant().initializeTexteGFXdefilant(valeur,couleur,this.x+decalage+x_decalage,this.y+40);
		this.nombreTextes++;		
	}
	
  this.sortDeGlace= function(cible,valeur){
    cible.sortGlace.play();
		cible.ajouteTexteDegat("-"+valeur,1,0);
		this.ajouteTexteAction("Glacier !");
  }

	this.pierre=function(valeur){
		this.ajouteTexteDegat("+"+valeur,0,0);
    this.ajouteTexteAction("Outre de sang !");
	}	
	this.mana=function(valeur){
		this.ajouteTexteDegat("+"+valeur,1,0);
    this.ajouteTexteAction("Pierre de vaudou !");
	}
	
  this.sortDeFeu= function(cible,valeur){
		cible.sortFeu.play();
		cible.ajouteTexteDegat("-"+valeur,3,0);
		this.ajouteTexteAction("Brasier !");
  }

  this.sortIfrit=function(cibles,valeurs){
    var length = cibles.length;              
    for (var i = 0; i < length; i++) {    
      cibles[i].sortFeu.play();
      cibles[i].ajouteTexteDegat("-"+valeurs[i],3,0);
    }
    this.ajouteTexteAction("IFRIT !!!");
  }

  this.sortMyquo=function(cibles,valeurs){
    var length = cibles.length;              
    for (var i = 0; i < length; i++) {    
      cibles[i].sortGlace.play();
      cibles[i].ajouteTexteDegat("-"+valeurs[i],1,0);
    }
    this.ajouteTexteAction("MYQUO !!!");
  }

  this.coqueMoisie= function(){
		this.ajouteTexteAction("Coque Moisie !");
  }

  this.deviation= function(){
		this.ajouteTexteAction("Déviation !");
  }
  this.failleVaudou= function(){
		this.ajouteTexteAction("Faille Vaudou !");
  }
  this.fureurVaudou= function(){
		this.ajouteTexteAction("Fureur Vaudou !");
  }

	this.boucliervaudou= function(){
		this.ajouteTexteAction("Bouclier vaudou !");
  }
	
	this.manoeuvre= function(){
		this.ajouteTexteAction("Manoeuvre !");
  }
	
  this.devieboulets = function(nbBouletsReussis,nbBouletsRates,valeur){
    this.ajouteTexteAction("Déviation !");
    var decalage =0;
    for (var i=0;i<nbBouletsReussis;i++){
      decalage =10*(3-Math.floor(Math.random()*5));
      this.ajouteTexteDegat("-"+valeur,2,decalage);
      this.listeTextes[this.nombreTextes-1].y+=i*10;
    }
    for (i=0;i<nbBouletsRates;i++){
      decalage =10*(3-Math.floor(Math.random()*5));
      this.ajouteTexteDegat("-0",2,decalage);
      this.listeTextes[this.nombreTextes-1].y+=(i+nbBouletsReussis)*10;
    }
    
  }
  
	this.soin = function(cible,valeur) {
		this.ajouteTexteAction("Soin !");
		cible.ajouteTexteDegat("+"+valeur,0,0);
	}
	
  this.feuCanon= function(nbCanons,nbRate, maxCanons,cible,valeur) {
		var listeCanon = new Array();
		//préparation de la liste des canons
		this.ajouteTexteAction("Attaque x"+nbCanons+ " !");
		for(var i=0;i<maxCanons;i++) {
			listeCanon[i]=i;
		}
		var max = maxCanons-1;
		var numCanon=0;
    var reussi=nbCanons-nbRate;
    var offset=0;
    while(nbRate>0) {
      nbRate--;
			numCanon = Math.floor(Math.random()*max);	
      this.g_feucanon[listeCanon[numCanon]].play(offset*200,cible,0);
			listeCanon[numCanon]=listeCanon[max];
      offset++;
			max--;
    }

    for(i=0;i<reussi;i++) {
			numCanon = Math.floor(Math.random()*max);	
      this.g_feucanon[listeCanon[numCanon]].play((offset+i)*200,cible,valeur);
			listeCanon[numCanon]=listeCanon[max];
			max--;
    }

  }
	
	this.ajouteTexte= function(valeur,couleur,fontsize,x,ystart){
		this.listeTextes[this.nombreTextes]=new Textedefilant().initializeTextedefilant(valeur,couleur, fontsize, x+40, this.y+ystart+20);
		this.nombreTextes++;
	}
	
	this.Update = function(){
    
    this.alpha += this.alphavelocity;
    if(this.alpha<0){this.alpha=0;this.dead=true;}
    if(this.alpha>1){this.alpha=1;}    
    
    for(var i=this.nbTotalCanon-1;i>=0;i--){
      this.g_feucanon[i].Update();      
    }
    if (this.dead){
      if (this.barredevie.ValActuel>0){
        this.dead=false;
      }
    }
		for(i=0;i<this.nombreTextes;i++) {
			this.listeTextes[i].Update();
			//suppression des textes p�rim�s
			if (this.listeTextes[i].y<(this.y-40)){
				while ((this.listeTextes[i].y<(this.y-40))&&(this.nombreTextes>i)){
					this.listeTextes[i]=this.listeTextes[this.nombreTextes-1];
					this.nombreTextes--;
				}
			}
		}		
		
	}
	
  this.Render = function(context){
		this.statut_manoeuvre.Render(context);
		this.statut_faillevaudou.Render(context);
		this.statut_fureurvaudou.Render(context);
		this.statut_deviation.Render(context);
		this.statut_coquemoisie.Render(context);
		this.statut_boucliervaudou.Render(context); 
    
    for(var i=this.nbTotalCanon-1;i>=0;i--){
      this.g_feucanon[i].Render(context);      
    }
 
    //Rendu des sorts
    this.sortGlace.Render(context);
    this.sortFeu.Render(context);
		//Rendu des textes
		for(i=0;i<this.nombreTextes;i++) {
			this.listeTextes[i].Draw(context);
		}
  }
	
  this.tirCanon = function() {
    this.currentFrame=0;  
    this.lastFrameChange=0;    
  }
}
Bateau.prototype = new VisualObject;


