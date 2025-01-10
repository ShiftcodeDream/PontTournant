# Application Pont Tournant de Cherbourg

Cette application fournit des informations sur les horaires de manoeuvre du pont tournant de Cherbourg-en-Cotentin
Ce pont est susceptible de touner __une heure avant__ et __une heure après__ la pleine mer.
Le pont ne tourne que si un bâteau se présente pour entrer ou sortir du bassin du commerce.

## Détails de l'architecture
Application développée sous Expo React Native
Config Node / npm utilisée:
```
- npm  10.1.0
- node 20.9.0
- adb  1.0.41
- yarn 1.22.22
```
Une petite base de données SQLite est utilisée pour :
- Sauvegarder les clé/valeurs des paramètres de l'application
- Sauvegarder les créneaux d'alerte saisis par l'utilisateur
- Garder hors ligne les horaires des marées

## Structure de l'arborescence
- /components : les composants de l'application
- /components/db : les classes d'accès à la base de données
- /components/ui : les composants d'interface de bas niveau pouvant être repris dans d'autres applications
- /app : l'application et ses onglets

## Lancement de l'environnement de développement
```npx expo run:android```
Le composant Sqlite n'existant pas sous web, le projet web ne sera pas suivi.

## Support ios
Aucun support. Un fork de ce projet est nécessaire pour qui souhaiterait générer une version Apple.
