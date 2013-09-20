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

/**
 * Frames per second
 */
var FPS = 30;
/**
 * Time betweend 2 frames
 */
var REFRESH_TIME = 1000/FPS;
var timerupdateanimation;
var timerupdategame;
var timerfeu;
var timerendanimation;
var win=false;
var g_socket=null;
var retour =false;

// A handler to the canvas object
var canvas = null;
// A handler to the canvas context
var context2D = null;
// Background color
var bColor = '#222222';

var base_site = "http://www.myurl.com"; // SET THIS TO YOUR SERVER BASE URL

var g_bateauJoueur=null;
var g_bateauxEnnemis=null;
var g_nbEnnemis=3;
var alreadystarted=false;
var nomJoueur="";
var idc=0;
var lgk=0;
var idu=0;
var lancer_ajax=0;
var barre_vie_monstre=null;
var id_m1=0;
var id_m2=0;
var id_m3=0;
var m_canvas =null;
var m_context =null;
var bg_canvas = null;
var bg_context2D = null;
var partiefinie = false;

var timeping;
var timepong;
var timelag;

var cpt =0;
var real_fps=0;
var timertest=null;
var timerping=null;
var gameEnd = false;
var gamePause= false;


// Diablogue 
var premiere_manoeuvre = 0;


var intervalID = -1;
var QueueNewFrame = function () {
  if (window.requestAnimationFrame)
    window.requestAnimationFrame(updateAnimation);
  else if (window.msRequestAnimationFrame)
    window.msRequestAnimationFrame(updateAnimation);
  else if (window.webkitRequestAnimationFrame)
    window.webkitRequestAnimationFrame(updateAnimation);
  else if (window.mozRequestAnimationFrame)
    window.mozRequestAnimationFrame(updateAnimation);
  else if (window.oRequestAnimationFrame)
    window.oRequestAnimationFrame(updateAnimation);
  else {
    QueueNewFrame = function () {
    };
    intervalID = window.setInterval(updateAnimation, REFRESH_TIME);
  }
};

/* CODE DE TEST POUR ANIMATION
window.onload = test;
function test()
{
	gamestart("krystof",0,3,5,4,0);
	timertest = window.setInterval(testanimation, 4000);
}
function testanimation(){
	g_bateauJoueur.lastTime=(new Date().getTime())/1000;
	g_bateauJoueur.pierre(g_bateauJoueur,100);
	g_bateauJoueur.sortDeGlace(g_bateauxEnnemis[0],45);
	g_bateauJoueur.feuCanon(4,0,4,g_bateauxEnnemis[1],20);
	g_bateauJoueur.sortDeGlace(g_bateauxEnnemis[2],45);
	g_bateauxEnnemis[0].feuCanon(4,0,4,g_bateauJoueur,20);
	g_bateauJoueur.barre.TempsDebut=(new Date().getTime())/1000;
	g_bateauJoueur.barre.TempsFin=g_bateauJoueur.barre.TempsDebut+4;
	g_bateauxEnnemis[0].barredevie.ValActuel-=100;
  if (g_bateauxEnnemis[0].barredevie.ValActuel<0) {
    g_bateauxEnnemis[0].barredevie.ValActuel=1000;
    g_bateauxEnnemis[0].barredevie.ValFin=1000;
  }
}*/

window.onbeforeunload = function (evt){
  try {
    socketsend("endd");
  }catch(ex){      
  }
}

function initsocket() {
  var host = "ws://xxx.xxx.xxx.xxx:xxxx"; // SET THIS TO YOUR SERVER
  try {
    g_socket = new WebSocket(host);
    g_socket.onopen    = function(msg) { 
      socketsend("slgk-"+idc+"-"+idu+"-"+lgk);
    };
    g_socket.onmessage = function(msg) { 
      var message = msg.data.toString();
      var command = message.substr(0, 4);
      switch (command){
        case "lkok":
          if (lancer_ajax>0){
            socketsend("strt");
          }
          timerping =window.setInterval(updatePing, 1000);
          break;
        case "gmst":
          var reg=new RegExp("-", "g");
          var tableau=message.split(reg);
          if (tableau[1]==1){
            gamePause = true;
          }else{
            gamePause = false;
          }   
         
        	start_dialogue(dialogue, 'message1', !gamePause, 0);
          break;
        case "uwin":
          partiefinie=true;
          gameOver(true);
          break;
        case "paus":
          gamepause();
          break;
        case "unps":
          restart();
          break;
        case "ulos":
          partiefinie=true;
          gameOver(false);
          break;
        case "snps":
          var data = message.substr(5,message.length);
          setSnapshot(data);
          break;
        case "pong":
          timepong=new Date().getTime();
          timelag = timepong-timeping;
          break;
      }                 
    };
    g_socket.onclose = function(msg) { 
      window.clearInterval(timerping);
      gamepause();
      if ((!gameEnd)&&(!partiefinie)){
        alert("La connexion avec le serveur a été perdue, veuillez actualiser la page.");
      } 
    };
  }
  catch(ex){ 
  //log(ex); 
  }
}

function setSnapshotBateau(tableau,index,bateau){
  var heureserveur = parseInt(tableau[0]);
  //0 NOM : nom du bateau (joueur ou monstre)
  //1 IDIMG : id de l’image le représentant
  //2 PDVMAX : pdv max du bateau
  bateau.barredevie.ValFin=parseInt(tableau[2+index]);
  //3 PDV : pdv actuels du bateau
  bateau.barredevie.ValActuel=parseInt(tableau[3+index]);  
  //4 MANAMAX : mana max du bateau
  bateau.barredemana.ValFin=parseInt(tableau[4+index]);
  //5 MANA : mana actuel du bateau
  bateau.barredemana.ValActuel=parseInt(tableau[5+index]);
  //6 DEBUT : date de début de la barre de rechargement d’action
  bateau.barre.TempsDebut=parseInt(tableau[6+index]);
  bateau.barrem.TempsDebut=parseInt(tableau[6+index]);
  //7 FIN : date de fin de la barre de rechargement d’action
  bateau.barre.TempsFin=parseInt(tableau[7+index]);
  bateau.barre.RetardNavigateur=(heureserveur)- ((new Date().getTime()));
  bateau.barrem.TempsFin=parseInt(tableau[7+index]);
  bateau.barrem.RetardNavigateur=bateau.barre.RetardNavigateur;
  //8 IDTA : idtype de la dernière action
  var idtype=parseInt(tableau[8+index]);
  //9 IDA : id de la dernière action
  var idaction=parseInt(tableau[9+index]);
  //10 IDN : nombre de paramètres de l’action
  var nbparam=parseInt(tableau[10+index]);
  //ID(1) à ID(IDN) : paramètres de l’action
  var params = new Array();
  
  for(var i=0;i<nbparam;i++){
    params[i]=parseInt(tableau[11+index]);
    index++;
  }
  
  if (bateau.barre.TempsDebut>bateau.lastTimeAction){
    bateau.lastTimeAction=bateau.barre.TempsDebut;
    if (!retour){
      switch(idtype){
        case 1:
          bateau.lastTime=bateau.lastTimeAction;
          if (bateau.sens==1){
            bateau.feuCanon(params[0],params[1],params[2],g_bateauxEnnemis[params[4]],params[3]);
            //11 N3 : nombre de canons max
            //12 N4 : nombre de canons dispo 
            //13 DEBUT : date de début de la barre de rechargement des canons
            //14 FIN : date de fin de la barre de rechargement des canons
            bateau.nbTotalCanon=parseInt(tableau[11+index]);
            bateau.nbLastCanon =parseInt(tableau[12+index]);

            if (bateau.nbLastCanon<bateau.nbTotalCanon){
              bateau.statut_canon.TempsDebut=parseInt(tableau[13+index]);
              bateau.statut_canon.TempsFin=parseInt(tableau[14+index]);
              bateau.statut_canon.RetardNavigateur=bateau.barre.RetardNavigateur;
            }  
          }else{
            //(nbCanons,nbRate, maxCanons,cible,valeur)
            bateau.feuCanon(params[0],params[1],params[2],g_bateauJoueur,params[3]);
          }
       
          break;
        case 2:
          bateau.manoeuvre();
          break;
        case 3:
          switch(idaction){
            case 1:
              if (bateau.sens==1){
                bateau.sortDeFeu(g_bateauxEnnemis[params[1]],params[0]);
              }else{
                bateau.sortDeFeu(g_bateauJoueur,params[0]);
              }
              break;
            case 2:
              if (bateau.sens==1){
                bateau.sortDeGlace(g_bateauxEnnemis[params[1]],params[0]);
              }else{
                bateau.sortDeGlace(g_bateauJoueur,params[0]);
              }
              break;
            case 3:
              bateau.boucliervaudou();
              break;
            case 4:
              if (bateau.sens==1){
                bateau.soin(g_bateauJoueur,params[0]);
              }else{
                bateau.soin(g_bateauxEnnemis[params[1]],params[0]);
              }
              break;
            case 5:
              break;
            case 6:
              bateau.deviation();
              break;
            case 7:
              bateau.failleVaudou();
              break;
            case 8:
              bateau.coqueMoisie();
              break;
            case 9:
              bateau.fureurVaudou();
              break;
            case 10:
              if (bateau.sens==1){
                bateau.soin(g_bateauJoueur,params[0]);
              }else{
                bateau.soin(g_bateauxEnnemis[params[1]],params[0]);
              }
              break;
          }
          break;
        case 4:
          switch(idaction){
            case 1:
              bateau.mana(params[0]);
              break;
            case 2:
              bateau.pierre(params[0]);
              break;
          }
          break;
      }
    }
  }
  
  //15 N4 : nombre de statuts du bateau
  //Pour chaque statut :
  //ID : identifiant du statut
  //DEBUT : heure de début
  //FIN : heure de fin 
  var nbstatuts=parseInt(tableau[15+index]);
  var idstatut=0;
  var tempsdebut=0;
  var tempsfin=0;

  for(var j=0;j<nbstatuts;j++){
    idstatut=parseInt(tableau[16+index]);
    index++;
    tempsdebut=parseInt(tableau[16+index]);
    index++;
    tempsfin=parseInt(tableau[16+index]);
    index++; 

    switch(idstatut){
      case 1:
        bateau.statut_manoeuvre.TempsDebut=tempsdebut;
        bateau.statut_manoeuvre.TempsFin=tempsfin;
        bateau.statut_manoeuvre.RetardNavigateur=bateau.barre.RetardNavigateur;
        break;
      case 2:
        bateau.statut_boucliervaudou.TempsDebut=tempsdebut;
        bateau.statut_boucliervaudou.TempsFin=tempsfin;
        bateau.statut_boucliervaudou.RetardNavigateur=bateau.barre.RetardNavigateur;        
        break;
      case 3:
        bateau.statut_deviation.TempsDebut=tempsdebut;
        bateau.statut_deviation.TempsFin=tempsfin;
        bateau.statut_deviation.RetardNavigateur=bateau.barre.RetardNavigateur; 
        break;
      case 4:
        bateau.statut_faillevaudou.TempsDebut=tempsdebut;
        bateau.statut_faillevaudou.TempsFin=tempsfin;
        bateau.statut_faillevaudou.RetardNavigateur=bateau.barre.RetardNavigateur; 
        break;
      case 5:
        bateau.statut_coquemoisie.TempsDebut=tempsdebut;
        bateau.statut_coquemoisie.TempsFin=tempsfin;
        bateau.statut_coquemoisie.RetardNavigateur=bateau.barre.RetardNavigateur; 
        break;
      case 6:
        bateau.statut_fureurvaudou.TempsDebut=tempsdebut;
        bateau.statut_fureurvaudou.TempsFin=tempsfin;
        bateau.statut_fureurvaudou.RetardNavigateur=bateau.barre.RetardNavigateur; 
        break;
    }
  }  
  
  index +=16;
  return index;
}

function setSnapshot(snapshot){
  var reg=new RegExp("-", "g");
  var tableau=snapshot.split(reg);
  var heureserveur =parseInt(tableau[0]);
  var nbateau1=parseInt(tableau[1]);
  var nbateau2=parseInt(tableau[2]);
  var index = 0;
  
  index=setSnapshotBateau(tableau, 3, g_bateauJoueur);            
  
  for(var i=0;i<g_nbEnnemis;i++){
    if(g_bateauxEnnemis[i]!=null){
    	
    	if(premiere_manoeuvre==0){    		    		
    		var idtype_test=parseInt(tableau[8+index]);		  
		  	var idaction_test=parseInt(tableau[9+index]);		  	
		  	//exemple sur brasier
    		if(idtype_test==2 && idaction_test==1){    		    			
				start_dialogue(dialogue, 'message5', true, 2000);
    		premiere_manoeuvre=1;
    		}
    	}
    	    	
    	// Ici je sais si le monstre a joué ça ou ça
    	
      index = setSnapshotBateau(tableau, index, g_bateauxEnnemis[i]);
      if (!g_bateauxEnnemis[i].dead){       
        if (g_bateauxEnnemis[i].barredevie.ValActuel==0){
          g_bateauxEnnemis[i].kill();							
        }        
      }
    }
  }   
  retour = false;
//0 NOW : Heure actuelle du serveur en millisecondes
//1 N1 : nombre de bateau de l’équipe 1
//2 N2 : nombre de bateau de l’équipe 2
//Pour chaque bateau de l’équipe 1, puis pour chaque bateau de l’équipe 2 :
//3 NOM : nom du bateau (joueur ou monstre)
//4 IDIMG : id de l’image le représentant
//5 PDVMAX : pdv max du bateau
//6 PDV : pdv actuels du bateau
//7 MANAMAX : mana max du bateau
//8 MANA : mana actuel du bateau
//9 DEBUT : date de début de la barre de rechargement d’action
//10 FIN : date de fin de la barre de rechargement d’action
//11 IDTA : idtype de la dernière action
//12 IDA : id de la dernière action
//13 IDN : nombre de paramètres de l’action
//ID(1) à ID(IDN) : paramètres de l’action
//14 N3 : nombre de canons max
//15 N4 : nombre de canons dispo 
//16 DEBUT : date de début de la barre de rechargement des canons
//17 FIN : date de fin de la barre de rechargement des canons
//18 N4 : nombre de statuts du bateau
//Pour chaque statut :
//ID : identifiant du statut
//DEBUT : heure de début
//FIN : heure de fin

}

// Menu de choix du niveau, avant de d�marrer la fonction init
function gamestart(nom,iidc,iduu,idm1,idm2,idm3,immediat,lgky)
{		
  if (!alreadystarted){   	
    gameEnd = false;
    canvas = document.getElementById('canvasCombat');
    context2D = canvas.getContext('2d');
    m_canvas = document.createElement('canvas');
    m_canvas.width = 900;
    m_canvas.height = 480;
    m_context = m_canvas.getContext('2d');		
    
    bg_canvas = document.getElementById('canvasBG');
    bg_context2D = bg_canvas.getContext('2d');
    
    
    nomJoueur=nom;
    initRessources();
    idc=iidc;
    id_m1=idm1;
    id_m2=idm2;
    id_m3=idm3;
    lgk=lgky;
    idu=iduu;
    
    lancer_ajax=immediat;
    if (lancer_ajax>0){
      retour = true;
    }
    // clear the canvas context
    context2D.clearRect(0, 0, canvas.width, canvas.height);
    // Set fill color
    context2D.fillStyle = bColor;
    // Fill canvas with white
    context2D.fillRect(0, 0, canvas.width, canvas.height);	 
    
    timerupdateanimation=setInterval(waitForLoad, REFRESH_TIME);
    alreadystarted=true;
  }  
}

function gameOver(player_win){
  timerendanimation=setInterval(endOfAll, 2500);
  win = player_win;
}


function endOfAll(){
  window.clearInterval(timerendanimation);
  window.clearInterval(timerupdateanimation);
  window.clearInterval(intervalID);
  
  QueueNewFrame = function () {};
  gameEnd = true;
  var bg_canvas = document.getElementById('canvasBG');
  var bg_context2D = bg_canvas.getContext('2d');
  bg_context2D.clearRect(0, 0, 900, 480);
  
  m_context.clearRect(0, 0, 900, 480);
  
  for(var i=0;i<g_nbEnnemis;i++){
    if(g_bateauxEnnemis[i]!=null){
      if (!g_bateauxEnnemis[i].dead){
        g_bateauxEnnemis[i].Draw(m_context);        
      }
    }
  }   
  
  g_bateauJoueur.DrawJoueur(bg_context2D);
  
  var J = jQuery.noConflict();
  if (win){
    J("#gameover_monstre").css('display', 'block');    
    J("#div_menu_combat").css('display', 'none');		
  }else{
    J("#gameover_joueur").css('display', 'block');   
    J("#div_menu_combat").css('display', 'none');  		
  }
  
  context2D.clearRect(0, 0, 900, 480);
  context2D.drawImage(m_canvas,0,0);

}

function socketsend(msg){
  if(!msg) { 
    console.log("message vide");
    return; 
  }
  try { 
    if (g_socket != null) {
      g_socket.send(msg); 
    }else{
      console.log("Objet socket inexistant.");
    }
  } catch(ex) {
    console.log(ex);
    return; 
  }
}


function waitForLoad(){
  if (checkloading()) {
    window.clearInterval(timerupdateanimation);
    initsocket();    
    g_bateauJoueur = new BateauJoueur().initBateau(100,150);
    g_bateauJoueur.AGauche();
    g_bateauJoueur.nom = nomJoueur;

    var nbimg = img_bateau_joueur.length-1;

    for(var i=0;i<nbimg;i++){
      g_bateauJoueur.images[i] = img_bateau_joueur[i];
    }
    g_bateauJoueur.imagecanon=img_bateau_joueur[nbimg];
      
    g_bateauxEnnemis=new Array();
    if(id_m1>0){
      switch (id_m1){
        case 1:
          g_bateauxEnnemis[0] = new BateauJoueur().initBateau(420,30);
          g_bateauxEnnemis[0].ADroite();	
          g_bateauxEnnemis[0].image = img_bateauennemi1;
          break;
        case 2:
          g_bateauxEnnemis[0] = new BateauJoueur().initBateau(420,30);
          g_bateauxEnnemis[0].ADroite();	
          g_bateauxEnnemis[0].image = img_bateauennemi1;
          break;
        case 3:
          g_bateauxEnnemis[0] = new BateauJoueur().initBateau(420,30);
          g_bateauxEnnemis[0].ADroite();	
          g_bateauxEnnemis[0].image = img_bateauennemi1;
          break;
        case 4:
          g_bateauxEnnemis[0] = new BateauBoss().initBateau(420,30);
          g_bateauxEnnemis[0].ADroite();	
          break;
      }
    }else{
      g_bateauxEnnemis[0]=null;
    }
    
    if(id_m2>0){
      switch (id_m2){
        case 1:
          g_bateauxEnnemis[1] = new BateauJoueur().initBateau(600,150);
          g_bateauxEnnemis[1].ADroite();	
          g_bateauxEnnemis[1].image = img_bateauennemi2;
          break;
        case 2:
          g_bateauxEnnemis[1] = new BateauJoueur().initBateau(600,150);
          g_bateauxEnnemis[1].ADroite();	
          g_bateauxEnnemis[1].image = img_bateauennemi2;
          break;
        case 3:
          g_bateauxEnnemis[1] = new BateauJoueur().initBateau(600,150);
          g_bateauxEnnemis[1].ADroite();	
          g_bateauxEnnemis[1].image = img_bateauennemi2;
          break;
        case 4:
          g_bateauxEnnemis[1] = new BateauBoss().initBateau(600,150);
          g_bateauxEnnemis[1].ADroite();	
          break;
      }
    }else{
      g_bateauxEnnemis[1]=null;
    }
    
    if(id_m3>0){
      switch (id_m3){
        case 1:
          g_bateauxEnnemis[2] = new BateauJoueur().initBateau(420,270);
          g_bateauxEnnemis[2].ADroite();	
          g_bateauxEnnemis[2].image = img_bateauennemi3;
          break;
        case 2:
          g_bateauxEnnemis[2] = new BateauJoueur().initBateau(420,270);
          g_bateauxEnnemis[2].ADroite();	
          g_bateauxEnnemis[2].image = img_bateauennemi3;
          break;
        case 3:
          g_bateauxEnnemis[2] = new BateauJoueur().initBateau(420,270);
          g_bateauxEnnemis[2].ADroite();	
          g_bateauxEnnemis[2].image = img_bateauennemi3;
          break;
        case 4:
          g_bateauxEnnemis[2] = new BateauBoss().initBateau(420,270);
          g_bateauxEnnemis[2].ADroite();	
          break;
      }
    }else{
      g_bateauxEnnemis[2]=null;
    }
    var J = jQuery.noConflict();
    J("#div_menu_combat").css('display', 'block');    
    J("#lancer_combat").css('display', 'block'); 
    J("#chargement").css('display', 'none');
    drawBG();
    
    context2D.clearRect(0, 0, 900, 480);
    QueueNewFrame();
    timerupdategame =window.setInterval(updateGame, REFRESH_TIME);    
  }  
}

function drawBG(){
  bg_context2D.clearRect(0, 0, 900, 480);
  bg_context2D.fillStyle = "rgba(124, 52, 3, 1)";
  
  for(var i=0;i<g_nbEnnemis;i++){
    if(g_bateauxEnnemis[i]!=null){
      if (!g_bateauxEnnemis[i].dead){
        g_bateauxEnnemis[i].Draw(bg_context2D);
      }               
    }
  }
  
  g_bateauJoueur.DrawJoueur(bg_context2D);
  
  g_bateauJoueur.barre.Draw(bg_context2D);
  
  g_bateauJoueur.statut_canon.Draw(bg_context2D);
  
  for(var i=0;i<g_nbEnnemis;i++){
    if(g_bateauxEnnemis[i]!=null){
      if (!g_bateauxEnnemis[i].dead){
        g_bateauxEnnemis[i].barrem.Draw(bg_context2D);
        g_bateauxEnnemis[i].barredevie.Draw(bg_context2D);           
      }
    }
  }    
  
  g_bateauJoueur.barredevie.Draw(bg_context2D);
  g_bateauJoueur.barredemana.Draw(bg_context2D);    
}

function gamepause(){
  gamePause=true;
  retour = true;
}

function restart(){
  gamePause=false;
  window.clearInterval(intervalID);
  QueueNewFrame();
}

function updateGame() {
  if (!gamePause){
    for(var i=0;i<g_nbEnnemis;i++){
      if(g_bateauxEnnemis[i]!=null){
        g_bateauxEnnemis[i].Update();          
      }
    }   
    g_bateauJoueur.Update();
  }
}

function updatePing(){
  timeping=new Date().getTime();
  socketsend("ping");    
}

function updateAnimation() {
  window.clearInterval(intervalID);
  if (!gameEnd){
    Draw();
  }
  if (!gamePause){
    QueueNewFrame();
  }
}

function Draw() {
  drawBG();
  m_context.clearRect(0, 0, 900, 480);
  
  g_bateauJoueur.Render(m_context);    
  
  for(var i=0;i<g_nbEnnemis;i++){
    if(g_bateauxEnnemis[i]!=null){
      if (!g_bateauxEnnemis[i].dead){
        g_bateauxEnnemis[i].Render(m_context);          
      }
    }
  }      
  g_bateauJoueur.barre.Render(m_context);
  for(var i=0;i<g_nbEnnemis;i++){
    if(g_bateauxEnnemis[i]!=null){
      if (!g_bateauxEnnemis[i].dead){
        g_bateauxEnnemis[i].barrem.Render(m_context);          
      }
    }
  }
  
  g_bateauJoueur.barredevie.Render(m_context);
  g_bateauJoueur.barredemana.Render(m_context);
  for(var i=0;i<g_nbEnnemis;i++){
    if(g_bateauxEnnemis[i]!=null){
      if (!g_bateauxEnnemis[i].dead){
        g_bateauxEnnemis[i].barredevie.Render(m_context);          
      }
    }
  } 
  
  g_bateauJoueur.statut_canon.Render(m_context);		
  m_context.font = "Bold 10px Arial";
  m_context.fillStyle = "rgba(255, 255, 255, 1)";
  m_context.fillText(g_bateauJoueur.nbLastCanon+"/"+g_bateauJoueur.nbTotalCanon,g_bateauJoueur.statut_canon.x+20,g_bateauJoueur.statut_canon.y+10);	
  
  m_context.fillText("Lag: "+timelag,10,10);
  
  if ((g_bateauJoueur.statut_canon.TempsActuel)>g_bateauJoueur.statut_canon.TempsFin){
    if(g_bateauJoueur.nbLastCanon<g_bateauJoueur.nbTotalCanon){
      g_bateauJoueur.nbLastCanon++;
      if(g_bateauJoueur.nbLastCanon<g_bateauJoueur.nbTotalCanon){
        var tempsRecharge=g_bateauJoueur.statut_canon.TempsFin-g_bateauJoueur.statut_canon.TempsDebut;
        g_bateauJoueur.statut_canon.TempsDebut+=tempsRecharge;
        g_bateauJoueur.statut_canon.TempsFin+=tempsRecharge;
      }
    }
  }
  
  if (gamePause){
    m_context.font = "Bold 36pt Arial";
    m_context.fillStyle = "rgba(0, 0, 0, 0.5)";
    m_context.strokeText("Pause", 405, 250);    
  }
  
  context2D.clearRect(0, 0, 900, 480);
  context2D.drawImage(m_canvas,0,0);

}
