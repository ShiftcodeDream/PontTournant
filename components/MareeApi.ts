import {Dayjs}from "dayjs";
import dayjs from "dayjs";
import {TideDb} from "@/components/db/TidesDb";

const url = 'https://www.horaire-maree.fr/maree/CHERBOURG/';

const MOCKUP = `
<!DOCTYPE HTML>
<html lang="fr">
    <head>
            	<!-- Google tag (gtag.js) --> 
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-G3WN7HXC87"></script>
		<script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-G3WN7HXC87'); </script>

		<!-- Favicon -->
		<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png?v=3">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3">
		<link rel="manifest" href="/site.webmanifest?v=3">
		<link rel="mask-icon" href="/safari-pinned-tab.svg?v=3" color="#5bbad5">
		<link rel="shortcut icon" href="/favicon.ico?v=3">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="theme-color" content="#ffffff">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Horaire Mar&eacute;e - Les horaires de mar&eacute;es pour Cherbourg        </title>
            
            <link href="/assets/css/insider.css" rel="stylesheet" type="text/css" />
            <link href="/assets/css/mobile.css" rel="stylesheet" type="text/css" />


        <!--[if IE 6]> <link rel="stylesheet" href="/style_general_interieur_IE6.css" type="text/css" media="all" /> <![endif]-->
        <!--[if IE 7]> <link rel="stylesheet" href="/style_general_interieur_IE7.css" type="text/css" media="all" /> <![endif]-->
        <!--[if IE 8]> <link rel="stylesheet" href="/style_general_interieur_IE8.css" type="text/css" media="all" /> <![endif]-->

        <meta name="description" content="Horaires et coefficients des grandes mar&eacute;es pour Cherbourg." />
        <meta http-equiv="pragma" content="no-cache">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="keywords" content="Maree, Horaire, Horaire marée, Horaires marées, Horaires des marées, Heures des marées, Annuaire des marées, Coefficient maree, Calendrier des marées, Grandes marées, Table des marées, Marées 2010, Marées 2011, Marées 2012, Pleine mer, Basse mer, Calcul des marées" />

        <script language="JavaScript">
        function favoris() {
        if ( navigator.appName != 'Microsoft Internet Explorer' )
        { window.sidebar.addPanel("Horaire Marée - Tous les horaires de marée en un seul clic","https://www.horaire-maree.fr",""); }
        else { window.external.AddFavorite("https://www.horaire-maree.fr","Horaire Marée - Tous les horaires de marée en un seul clic"); } }
        </script>

        
<!-- MANU START -->
<script type="text/javascript" src="/assets/js/prebid-config.js"></script>
<script type="text/javascript" src="/assets/js/prebid3.2.0.js"></script>
<script type="text/javascript" src="/assets/js/prebid-partners.js"></script>
<!-- MANU END -->
     <!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent -->
	<script type="text/javascript">
	    window.cookieconsent_options = {"message":"Les cookies nous permettent de personnaliser le contenu, les annonces et d'analyser notre trafic. Nous partageons des informations sur l'utilisation de notre site avec nos partenaires de publicité et d'analyse qui peuvent combiner celles-ci avec d'autres informations que vous leur avez fournies ou qu'ils ont collectées lors de votre utilisation de leurs services.","dismiss":"Ok","learnMore":"En savoir plus","link":"https://www.google.com/intl/fr/policies/privacy/partners/","theme":"dark-floating"};
	</script>

	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.10/cookieconsent.min.js"></script>
	<!-- End Cookie Consent plugin -->

 <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
<script>
  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];
</script><script>
  googletag.cmd.push(function() {
    googletag.defineSlot('/21746666232/horairesmarees/banniere_haute', [728, 90], 'div-gpt-ad-1542058571925-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script><script>
  googletag.cmd.push(function() {
    googletag.defineSlot('/21746666232/horairesmarees/hp_sky', [[160, 600], [120, 600]], 'div-gpt-ad-1542058762132-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script><script>
  googletag.cmd.push(function() {
    googletag.defineSlot('/21746666232/horairesmarees/sky_1', [[160, 600], [120, 600]], 'div-gpt-ad-1542058859556-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script><script>
  googletag.cmd.push(function() {
    googletag.defineSlot('/21746666232/horairesmarees/sky_2', [[160, 600], [120, 600]], 'div-gpt-ad-1542058889305-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script><script>
  googletag.cmd.push(function() {
    googletag.defineSlot('/21746666232/horairesmarees/mpu_droite', [[300, 600], [300, 250]], 'div-gpt-ad-1542058801090-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>


    </head>

    <body>
        <div id="fb-root"></div>
        <script>(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>

        <div id ="contentHead">
    <div id="header">
        <h1><a href="https://www.horaire-maree.fr/">HORAIRE-MAR&Eacute;E.FR</a></h1>
        <h3>Tous les horaires de mar&eacute;e en un seul clic</h3>
    </div>

    <div id="socialheader">
        <div class="fb-like" data-href="https://www.horaire-maree.fr" data-send="true" data-layout="box_count" data-width="100" data-show-faces="false"></div>
    </div>

</div>

<div id='pub-bandeauHaut'>
  <!-- /21746666232/horairesmarees/banniere_haute -->
<div id='div-gpt-ad-1542058571925-0' style='height:90px; width:728px;'>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1542058571925-0'); });
</script>
</div></div>


<div id="conteneur_adsence">
    <div id ="adsence">
      <!-- /21746666232/horairesmarees/hp_sky -->
<div id='div-gpt-ad-1542058762132-0'>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1542058762132-0'); });
</script>
</div>        <br /><br />
      <!-- /21746666232/horairesmarees/sky_1 -->
<div id='div-gpt-ad-1542058859556-0'>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1542058859556-0'); });
</script>
</div>    </div>

    <div id="conteneur">

        <div id="detailsPort">
        	
            <div id="i_header_tbl">
                <div id="i_header_tbl_gauche">
                	<h2>Cherbourg</h2>                </div>
                 <div id="i_header_tbl_droite">
                 <h3 class="orange">Marée aujourd'hui<br />
                   vendredi  3 janvier 2025 </h3>
                 </div>
            </div>
            
            <div id="i_donnesJour">
            	<table  border="0" cellpadding="0" class="tableau">
              <tr class="blueoffice whitetxt">
                <th colspan="3"><strong>Matin</strong></th>
                <th colspan="3"><strong>Après midi</strong></th>
              </tr>
              <tr class="bluesoftoffice">
                <th class="blueoffice whitetxt"><strong>Coeff.</strong></th>
                <th><strong>Basse mer</strong></th>
                <th><strong>Pleine mer</strong></th>
                <th class="blueoffice whitetxt"><strong>Coeff.</strong></th>
                <th><strong>Basse mer</strong></th>
                <th><strong>Pleine mer</strong></th>
              </tr>
              <tr class="bluesoftoffice">
                <td class="blueoffice whitetxt"><strong>85</strong></td>
                <td><strong>05h21</strong><br /> 1,61 m</td>
                <td><strong>10h45</strong><br /> 6,33 m</td>
                <td class="blueoffice whitetxt">84</td>
                <td><strong>17h46</strong><br /> 1,27 m</td>
                <td><strong>23h14</strong><br /> 6,05 m</td>
              </tr>
            </table>
            </div>
        </div>



        <div id="i_donnesLongue">
            <h3 class="orange"> Marées des 10 prochains jours</h3>
            	 <table border="0" cellpadding="0" class="tableau">
                	<tr class="blueoffice whitetxt">
                		<th rowspan="2">Date</th>
                        <th colspan="3"> Matin</th>
                        <th colspan="3">Apr&egrave;s-midi</th>
                    </tr> 
                    <tr class="bluesoftoffice">
                    	<th width="10%"> Coeff.</th>
                    	<th width="15%">Basse mer</th>
                    	<th width="15%">Pleine mer</th>
                    	<Th width="10%">Coeff.</th>
                    	<th width="15%">Basse mer</th>
                    	<th width="15%">Pleine mer</th>
                    </tr>
                
                
                	<tr class="otheroffice">
                		<td class="blueoffice whitetxt"><strong>Demain Samedi  4 janvier</strong></td>
        	        	<td><strong>82</strong></td>
        	        	<td><strong>06h04</strong><br /> 1,68 m</td>
        	        	<td><strong>11h28</strong><br /> 6,25 m</td>
        	        	<td><strong>80</strong></td>
        	        	<td><strong>18h30</strong><br /> 1,37 m</td>
        	        	<td><strong>23h59</strong><br /> 5,94 m</td>
        	        </tr>
        	    
                
                	<tr class="bluesoftoffice">
                		<td class="blueoffice whitetxt"><strong>Dimanche  5 janvier</strong></td>
        	        	<td><strong>77</strong></td>
        	        	<td><strong>06h49</strong><br /> 1,82 m</td>
        	        	<td><strong>12h15</strong><br /> 6,08 m</td>
        	        	<td><strong>74</strong></td>
        	        	<td><strong>19h16</strong><br /> 1,56 m</td>
        	        	<td><strong></strong><br /> </td>
        	        </tr>
        	    
                
                	<tr class="otheroffice">
                		<td class="blueoffice whitetxt"><strong>Lundi  6 janvier</strong></td>
        	        	<td><strong>70</strong></td>
        	        	<td><strong>07h37</strong><br /> 2,01 m</td>
        	        	<td><strong>00h49</strong><br /> 5,76 m</td>
        	        	<td><strong>66</strong></td>
        	        	<td><strong>20h07</strong><br /> 1,81 m</td>
        	        	<td><strong>13h07</strong><br /> 5,84 m</td>
        	        </tr>
        	    
                
                	<tr class="bluesoftoffice">
                		<td class="blueoffice whitetxt"><strong>Mardi  7 janvier</strong></td>
        	        	<td><strong>63</strong></td>
        	        	<td><strong>08h34</strong><br /> 2,21 m</td>
        	        	<td><strong>01h46</strong><br /> 5,55 m</td>
        	        	<td><strong>60</strong></td>
        	        	<td><strong>21h07</strong><br /> 2,06 m</td>
        	        	<td><strong>14h09</strong><br /> 5,57 m</td>
        	        </tr>
        	    
                
                	<tr class="otheroffice">
                		<td class="blueoffice whitetxt"><strong>Mercredi  8 janvier</strong></td>
        	        	<td><strong>57</strong></td>
        	        	<td><strong>09h40</strong><br /> 2,37 m</td>
        	        	<td><strong>02h53</strong><br /> 5,38 m</td>
        	        	<td><strong>57</strong></td>
        	        	<td><strong>22h18</strong><br /> 2,24 m</td>
        	        	<td><strong>15h22</strong><br /> 5,37 m</td>
        	        </tr>
        	    
                
                	<tr class="bluesoftoffice">
                		<td class="blueoffice whitetxt"><strong>Jeudi  9 janvier</strong></td>
        	        	<td><strong>56</strong></td>
        	        	<td><strong>10h58</strong><br /> 2,39 m</td>
        	        	<td><strong>04h07</strong><br /> 5,31 m</td>
        	        	<td><strong>57</strong></td>
        	        	<td><strong>23h36</strong><br /> 2,27 m</td>
        	        	<td><strong>16h41</strong><br /> 5,30 m</td>
        	        </tr>
        	    
                
                	<tr class="otheroffice">
                		<td class="blueoffice whitetxt"><strong>Vendredi 10 janvier</strong></td>
        	        	<td><strong>58</strong></td>
        	        	<td><strong>12h17</strong><br /> 2,22 m</td>
        	        	<td><strong>05h21</strong><br /> 5,39 m</td>
        	        	<td><strong>61</strong></td>
        	        	<td><strong></strong><br /> </td>
        	        	<td><strong>17h53</strong><br /> 5,39 m</td>
        	        </tr>
        	    
                
                	<tr class="bluesoftoffice">
                		<td class="blueoffice whitetxt"><strong>Samedi 11 janvier</strong></td>
        	        	<td><strong>64</strong></td>
        	        	<td><strong>00h48</strong><br /> 2,14 m</td>
        	        	<td><strong>06h24</strong><br /> 5,58 m</td>
        	        	<td><strong>68</strong></td>
        	        	<td><strong>13h23</strong><br /> 1,92 m</td>
        	        	<td><strong>18h56</strong><br /> 5,56 m</td>
        	        </tr>
        	    
                
                	<tr class="otheroffice">
                		<td class="blueoffice whitetxt"><strong>Dimanche 12 janvier</strong></td>
        	        	<td><strong>72</strong></td>
        	        	<td><strong>01h49</strong><br /> 1,92 m</td>
        	        	<td><strong>07h20</strong><br /> 5,82 m</td>
        	        	<td><strong>76</strong></td>
        	        	<td><strong>14h19</strong><br /> 1,59 m</td>
        	        	<td><strong>19h51</strong><br /> 5,76 m</td>
        	        </tr>
        	    
                
                	<tr class="bluesoftoffice">
                		<td class="blueoffice whitetxt"><strong>Lundi 13 janvier</strong></td>
        	        	<td><strong>80</strong></td>
        	        	<td><strong>02h40</strong><br /> 1,69 m</td>
        	        	<td><strong>08h08</strong><br /> 6,04 m</td>
        	        	<td><strong>83</strong></td>
        	        	<td><strong>15h07</strong><br /> 1,32 m</td>
        	        	<td><strong>20h38</strong><br /> 5,93 m</td>
        	        </tr>
        	        
        	    </table>
        </div>



    	<div id="i_menuBas">    		
        	
    		
    		<a href="/grande-maree/CHERBOURG/"><img src="/images/bouton_date_prochaines_gran.png" alt="Date des prochaines grandes mar&eacute;es"  title="Date des prochaines grandes mar&eacute;es" border="0" /></a>
    		
    		<a href="javascript:void(favoris());"><img src="/images/bouton_ajout_site_favoris.png" border="0" alt="Ajouter ce site à vos favoris" /></a>
    		<a href="/categories_partenaires.php"><img src="/images/bouton_amis_mer.png" alt="Le guide des amis de la mer" width="147" height="27" border="0"/></a>

        </div>
    	
    	</div>

    	<div id="rightBlock">
    		<div id="i_phare"> </div>

    		<div class="blueoffice box">
    			<h2><a class="nolink" href="/grande-maree/CHERBOURG/">Grande Marée 2025<br /> Cherbourg</a></h2>

    			<p>
          <a class="nolink" href="/grande-maree/CHERBOURG/" class="gdmaree" alt="Grandes mar&eacute;es 2025 CHERBOURG"  title="Grandes mar&eacute;es 2025 CHERBOURG"> 
    			Cliquer ici pour ne plus les manquer<br />
    			<br /><br />Calendrier des grandes marées de Cherbourg pour l’année 2025    		</a></p>

    		</div>

    		<div class="blueoffice box">
    			<h2><a class="nolink" href="/hauteur-eau/CHERBOURG/">
            Hauteur d'eau Cherbourg</a></h2>
    			<p>Maréegramme heure par heure</p>
    		</div>

            <div id="pub-droite">
              <!-- /21746666232/horairesmarees/mpu_droite -->
<div id='div-gpt-ad-1542058801090-0'>
<script>
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1542058801090-0'); });
</script>
</div>            </div>


    		<div class="blueoffice box">
    			<a href="javascript:void(favoris());" class="nolink"><strong>Ajouter ce site &agrave; vos favoris</strong></a> 
    		</div>


    		<div class="blueoffice box">
    			<h2><a class="nolink" href="/widget.php">Widget Marée</a></h2>
    		<p>Vous avez un site internet, <a class="nolink" href="/widget.php">ajoutez notre widget avec les horaires de marée du jour sur votre site</a></p>
    		</div>

    	</div>
    </div>


    <div id="globalfooter">
        <div id="footer_interieur">
            <table width="800" border="0" align="center">
              <tr>
                <td>
                    <p>
                    Annuaire des marées de Cherbourg donné à titre indicatif, ne remplaçant pas les documents officiels. Les concepteurs
                             déclinent toutes responsabilités pour tout dommage découlant d'une quelconque utilisation. Données de marée (heure pleine-mer, basse-mer, 
                             hauteur d'eau, coefficient) fournies par <a href="mailto:info@meteorem.com" target="_blank" title="Fournisseur de données">Aviabag Météorem</a> <br />
                    L'utilisation du service Horaire Marée Cherbourg est gratuite et réservée à un usage strictement personnel. 
                    Les horaires de marée de Cherbourg présentées sur ce site sont édités par l'équipe éditoriale de <a href="https://www.horaire-maree.fr">https://www.horaire-maree.fr</a>
                    <br><br>
                    Annuaire de marée – Almanach des marées – Agenda des marées – Table des marées<br><br>

               <a href="/widget.php">Widget Webmaster</a> - <a href="/contact.php">Contact </a> - <a href="http://www.plan-metro-paris.fr" target="_blank">Plan m&eacute;tro Paris </a> - <a href="https://www.capitainemaree.com/" target="_blank">Marée dans le monde</a> - <a href="http://www.aurelie-guillaume.fr/" target="_blank">D&eacute;veloppement</a> - <a href="https://www.laboratoire-analyses-medicales.fr/" target="_blank" title="Trouver le laboratoire d'analyses médicales le plus près de chez vous.">Laboratoire d'Analyses Médicales</a></p></td>
               
              </tr>
            </table>
        </div>

        <div class="globefooter">
        <div id="explication_marees" style="color:white;"><br />

    
            <h3 class='clearer'>Cherbourg - Localisation</h3>            <p>Cherbourg () est situ&eacute;e en  dans le d&eacute;partement .
        Cherbourg est une tr&egrave;s belle ville pour admirer le spectacle des mar&eacute;es.
        Nous vous recommandons les ballades en bord de mer lors de la mar&eacute;e haute à Cherbourg.
        Nous vous conseillons &eacute;galement d'essayer la p&ecirc;che à pied lors de la mar&eacute;e basse à Cherbourg.</p>
            
            <h3 class="clearer">Mar&eacute;e &agrave; Cherbourg</h3>

            
        <p>A Cherbourg, la mar&eacute;e peut parfois surprendre et devenir dangereuse. L'amplitude des mar&eacute;es de Cherbourg peut varier &eacute;norm&eacute;ment d'une semaine &agrave; l'autre. <br />
        Soyez prudent, si vous allez &agrave; la p&ecirc;che &agrave; pied, vous baigner ou naviguer &agrave; Cherbourg : consultez les horaires et les coefficients de mar&eacute;e. Plus le coefficient est &eacute;lev&eacute;, plus l'amplitude de la mar&eacute;e est importante.<br />
        Chaque ann&eacute;e, des baigneurs, des p&ecirc;cheurs &agrave; pieds ou de simples promeneurs sont victimes des <strong><a href="/grande-maree/CHERBOURG/">grandes mar&eacute;es &agrave; Cherbourg</a></strong>. Certains restent pi&eacute;g&eacute;s sur les bancs de sable lorsque la mar&eacute;e monte. D'autres se retrouvent en difficult&eacute;, emport&eacute;s par le courant lorsque la mer monte ou se retire rapidement.

        <h3 class="clearer">Ports voisins de Cherbourg</h3>

        <ul><li><a href='http://www.horaire-maree.fr/maree/Fermanville/'>Mar&eacute;e Fermanville</a></li><li><a href='http://www.horaire-maree.fr/maree/Maupertus-sur-Mer/'>Mar&eacute;e Maupertus-sur-mer</a></li><li><a href='http://www.horaire-maree.fr/maree/Bretteville-en-Saire/'>Mar&eacute;e Bretteville-en-saire</a></li><li><a href='http://www.horaire-maree.fr/maree/Digosville/'>Mar&eacute;e Digosville</a></li><li><a href='http://www.horaire-maree.fr/maree/Tourlaville/'>Mar&eacute;e Tourlaville</a></li><li><a href='http://www.horaire-maree.fr/maree/CHERBOURG/'>Mar&eacute;e Cherbourg</a></li><li><a href='http://www.horaire-maree.fr/maree/Equeurdreville-Hainneville/'>Mar&eacute;e Equeurdreville-hainneville</a></li><li><a href='http://www.horaire-maree.fr/maree/Querqueville/'>Mar&eacute;e Querqueville</a></li></ul>        <h3 class="clearer">Horaire Lever et  Coucher de soleil du 03/01/2025 &agrave; Cherbourg</h3>
        <p>Horaire Lever du soleil Cherbourg : 09:07<br />
        Horaire Coucher du soleil Cherbourg : 17:15 <br />
        </p>
        <p>
        Profitez le plus longtemps possible des mar&eacute;es en consultant les horaires du lever et du coucher de soleil.
         Si vous &ecirc;tes en bateau, soyez vigilants, &agrave; moins d'&ecirc;tre &eacute;quip&eacute;, rentrez avant la nuit.
        </p>

        <h3 class="clearer">Actualit&eacute;s Mar&eacute;e Cherbourg</h3>
        <div id="boxActu">
        <div class="news"><h4><a href="" >Marée noire en Crimée : deux semaines plus tard, la pollution s&#39;étend vers d&#39;autres plages</a> - 02/01/2025 06:50 </h4><p>Info Cherbourg Marée noire en Crimée deux semaines plus tard la pollution sétend vers dautres... Cherbourg....</p></div>        </div>

    </div>
    <div id="footer_couleur">
        

      
    </div>
    </div>
</div>


        <script>(function(){var AM = document.createElement('script');
        var AMurl = encodeURIComponent(window.location.href);
        var AMreferer = encodeURIComponent((window.document.referrer != null && typeof window.document.referrer !== 'undefined')?window.document.referrer:'');
        AM.src = ((location.protocol === 'https:')?'https:':'http:') + '//t.admark.fr/script?url=' + AMurl + '&referrer=' + AMreferer + '&misc=' + new Date().getTime();
        var AMtag = document.getElementsByTagName('script')[0];
        AMtag.parentNode.insertBefore(AM, AMtag);}())</script>
    </body>
</html>
`;

export default function getMareeData(): Promise<Dayjs[]>{
  const tideDb = new TideDb();
  // Basic mockup
  return new Promise<string>((ok,ko) => ok(MOCKUP))
    .then(resp => {
      let today:Dayjs, data:string|null, cells:Array<string>, result: Array<Dayjs> = [];
      // Removes accents to remove UTF-8 multibyte characters
      const texte = resp.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      // Extracts "today" value
      let strToday = extractBetween('<h3 class="orange">', '</h3>', texte);
      if(strToday === null)
        return [];
      strToday = strToday.split('<br />')[1];
      today = fromTextualDate(strToday);

      // Extracts today tide values
      data = extractBetween('<div id="i_donnesJour">', '</div>', texte);
      if (data !== null) {
        cells = splitBetween('<strong>', '</strong>', data);
        if(cells.length>12)
          [10, 12].forEach(addTide);
      }

      // Extracts other days tides
      data = extractBetween('<div id="i_donnesLongue">', '</div>', texte);
      if (data != null) {
        cells = splitBetween('<strong>', '</strong>', data);
        for(let j=3; j<cells.length; j+=7){
          today = today.add(1, 'day');
          [j, j+3].forEach(addTide);
        }
      }

      function addTide(i:number){
        if (cells[i].length > 0) {
          const v = cells[i].trim().split('h').map(k => parseInt(k));
          let pleineMer = today.hour(v[0]).minute(v[1]);
          if(pleineMer.isValid()) {
            result.push(pleineMer.add(-1, 'hour'));
            tideDb.add(pleineMer.add(-1, 'hour'));

            result.push(pleineMer.add(1, 'hour'));
            tideDb.add(pleineMer.add(1, 'hour'));
          }
        }
      }
      return result;
    })
}

/**
 * Renvoie ce qui est situé entre tagDebut et tagFin, ou null si au moins un des deux tags n'a pas été trouvé
 *
 * @param tagDebut
 * @param tagFin
 * @param texte
 */
function extractBetween(tagDebut:string, tagFin:string, texte:string): string|null{
  let indexDebut, indexFin;
  indexDebut = texte.indexOf(tagDebut);
  if(indexDebut < 0)
    return null;
  indexDebut += tagDebut.length;
  indexFin = texte.indexOf(tagFin, indexDebut);
  if(indexFin < 0)
    return null;
  return texte.substring(indexDebut, indexFin);
}

/**
 * Renvoie tout ce qui se situe entre tagDebut et tagFin. Renvoie autant d'éléments
 * de tableau que de couples tagDebut / tagFin trouvés
 *
 * @param tagDebut
 * @param tagFin
 * @param texte
 */
function splitBetween(tagDebut:string, tagFin:string, texte:string): Array<string>{
  const result: Array<string> = [];
  let indexDebut= 0, indexFin;
  while(true) {
    indexDebut = texte.indexOf(tagDebut, indexDebut);
    if (indexDebut < 0)
      return result;
    indexDebut += tagDebut.length;
    indexFin = texte.indexOf(tagFin, indexDebut);
    if (indexFin < 0)
      return result;
    result.push(texte.substring(indexDebut, indexFin));
  }
}
/**
 * Transforme une date "mercredi 30 janvier 2025" en date Dayjs
 * marche aussi pour   "vendredi  3 janvier 2025" (deux espaces à la suite)
 * @param theDate
 */
function fromTextualDate(theDate: string): Dayjs {
  const mois = ['','janvier','fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'];
  const v = theDate.trim().split(' ').filter(h=>h.length>0);
  const numMois = mois.indexOf(v[2].toLowerCase());
  return dayjs(v[3] + '-' + numMois + '-' + v[1]);
}