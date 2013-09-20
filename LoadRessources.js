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
 
var img_bateaudroit = new Image();
var img_bateauboss = new Image();
var img_bateaublack = new Image();
var img_bateaublue = new Image();
var img_bateaured = new Image();
var img_bateaugauche = new Image();
var img_anim_feucanon_gauche = new Image();
var img_anim_feucanon_droit = new Image();
var img_barre_chargement = new Image();
var img_barre_chargement_vie = new Image();
var img_barre_chargement_mana = new Image();
var img_barre_chargement_tour = new Image();
var img_barre_chargement_canon = new Image();
var img_barre_chargement_remplissage = new Image();
var img_barre_chargement_remplissage_vert = new Image();
var img_barre_chargement_remplissage_orange = new Image();
var img_barre_chargement_remplissage_rouge = new Image();
var img_barre_chargement_remplissage_bleue = new Image();
var img_barre_chargement_remplissage_mauve = new Image();
var img_barre_chargement_remplissage_canon = new Image();
var img_boulet = new Image();
var img_ecume = new Image();
var img_ecume_droit = new Image();
var img_anim_glace = new Image();
var img_anim_feu = new Image();
var img_glace = new Image();
var img_statut_manoeuvre = new Image();
var img_statut_bulle_vaudou = new Image();
var img_statut_coque_moisie = new Image();
var img_statut_deviation = new Image();
var img_statut_faille_vaudou = new Image();
var img_statut_fureur_vaudou = new Image();
var img_statut_remplissage = new Image();
var img_menu = new Image();
var img_canon = new Image();
var img_chiffrescombat = new Image();
var cnv_chiffrescombat =null;

var totalimages;
var totalimageschargees;

function initRessources()
{
  totalimages=36;
  totalimageschargees=0

	img_chiffrescombat.onload = function(){
     updateImagesCount();
  };
	img_menu.onload = function(){
     updateImagesCount();
  };	
	img_canon.onload = function(){
    updateImagesCount();
  };			
	img_statut_remplissage.onload = function(){
    updateImagesCount();
  };		
	img_statut_manoeuvre.onload = function(){
    updateImagesCount();
  };  
	img_statut_bulle_vaudou.onload = function(){
	  updateImagesCount();
	}  
	img_statut_coque_moisie.onload = function(){
	  updateImagesCount();
	}	
	img_statut_deviation.onload = function(){
	  updateImagesCount();
	}	
	img_statut_faille_vaudou.onload = function(){
	  updateImagesCount();
	}	
	img_statut_fureur_vaudou.onload = function(){
	  updateImagesCount();
	}	
  img_barre_chargement_remplissage.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_remplissage_vert.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_remplissage_orange.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_remplissage_rouge.onload = function(){
    updateImagesCount();
  };	
  img_barre_chargement_remplissage_bleue.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_remplissage_mauve.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_remplissage_canon.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_vie.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_mana.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_tour.onload = function(){
    updateImagesCount();
  };
  img_barre_chargement_canon.onload = function(){
    updateImagesCount();
  };
  img_anim_feucanon_gauche.onload = function(){
    updateImagesCount();
  };
  img_anim_feucanon_droit.onload = function(){
    updateImagesCount();
  };
  img_bateaudroit.onload = function(){
    updateImagesCount();
  };  
  img_bateaugauche.onload = function(){
    updateImagesCount();
  };  
  img_bateauboss.onload = function(){
    updateImagesCount();
  }; 
  img_bateaured.onload = function(){
    updateImagesCount();
  }; 
  img_bateaublack.onload = function(){
    updateImagesCount();
  }; 
  img_bateaublue.onload = function(){
    updateImagesCount();
  }; 
  img_boulet.onload = function(){
    updateImagesCount();
  };   
  img_ecume.onload = function(){
    updateImagesCount();
  };   
  img_ecume_droit.onload = function(){
    updateImagesCount();
  };
  img_anim_glace.onload = function(){
    updateImagesCount();
  };
  img_anim_feu.onload = function(){
    updateImagesCount();
  };	
  img_glace.onload = function(){
    updateImagesCount();
  };  
	img_chiffrescombat.src = base_site+"/images/fr/combats/chiffres_combat.png";
	img_statut_remplissage.src = base_site+"/images/fr/combats/statut_remplissage.png";
	img_statut_manoeuvre.src = base_site+"/images/fr/combats/statut_manoeuvre2.png";	
	img_statut_bulle_vaudou.src = base_site+"/images/fr/combats/statut_bulle_vaudou.png";	
	img_statut_coque_moisie.src = base_site+"/images/fr/combats/statut_coque_moisie.png";	
	img_statut_deviation.src = base_site+"/images/fr/combats/statut_deviation.png";	
	img_statut_faille_vaudou.src = base_site+"/images/fr/combats/statut_faille_vaudou.png";
	img_statut_fureur_vaudou.src = base_site+"/images/fr/combats/statut_fureur_vaudou.png";			
  img_bateaudroit.src = base_site+"/images/fr/combats/bateau_droit.png";	
  img_bateaublack.src = base_site+"/images/fr/combats/bateau_black.png";	
  img_bateaublue.src = base_site+"/images/fr/combats/bateau_blue.png";	
  img_bateaured.src = base_site+"/images/fr/combats/bateau_red.png";	
  img_bateaugauche.src = base_site+"/images/fr/combats/bateau_gauche.png";	
  img_bateauboss.src = base_site+"/images/fr/combats/Bateau_boss.png";	
  img_anim_feucanon_gauche.src = base_site+"/images/fr/combats/anim_canon_2.png";  
  img_anim_feucanon_droit.src = base_site+"/images/fr/combats/anim_canon_2_droit.png";  
  img_barre_chargement.src = base_site+"/images/fr/combats/barrechargement.png";  
  img_barre_chargement_vie.src = base_site+"/images/fr/combats/barrechargement_vie.png";  
  img_barre_chargement_mana.src = base_site+"/images/fr/combats/barrechargement_mana.png";  
  img_barre_chargement_tour.src = base_site+"/images/fr/combats/barrechargement_tour.png"; 
  img_barre_chargement_canon.src = base_site+"/images/fr/combats/barrechargement_canon.png"; 
  img_barre_chargement_remplissage.src = base_site+"/images/fr/combats/barrechargement_remplissage.png";  
  img_barre_chargement_remplissage_vert.src = base_site+"/images/fr/combats/barrechargement_remplissage_vert.png";  
  img_barre_chargement_remplissage_orange.src = base_site+"/images/fr/combats/barrechargement_remplissage_orange.png";  
  img_barre_chargement_remplissage_rouge.src = base_site+"/images/fr/combats/barrechargement_remplissage_rouge.png";  
  img_barre_chargement_remplissage_bleue.src = base_site+"/images/fr/combats/barrechargement_remplissage_bleue.png";  
  img_barre_chargement_remplissage_mauve.src = base_site+"/images/fr/combats/barrechargement_remplissage_mauve.png";  
  img_barre_chargement_remplissage_canon.src = base_site+"/images/fr/combats/barrechargement_remplissage_canon.png";  
  img_boulet.src = base_site+"/images/fr/combats/Boulet_v6.png";  
  img_ecume.src = base_site+"/images/fr/combats/ecume.png";  
  img_ecume_droit.src = base_site+"/images/fr/combats/ecume_droit.png";
  img_anim_glace.src = base_site+"/images/fr/combats/Glace_anim1.png";
  img_anim_feu.src = base_site+"/images/fr/combats/animfeu.png";
  img_glace.src = base_site+"/images/fr/combats/Glace_fixe.png";
  img_menu.src = base_site+"/images/fr/combats/fond_menu_haut.png";
  img_canon.src = base_site+"/images/fr/combats/statut_canon.png";  
}

function updateImagesCount(){
  totalimageschargees+=1;
}
function checkloading(){
  return (totalimageschargees==totalimages);
}