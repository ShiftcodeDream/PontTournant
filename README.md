# Application Pont Tournant de Cherbourg

Cette application fournit des informations sur les horaires de manoeuvre du pont tournant de Cherbourg-en-Cotentin
Ce pont est susceptible de touner une heure avant et une heure après la pleine mer.
Le pont ne tourne que si un bâteau se présente pour entrer ou sortir du bassin du commerce.

## Détails de l'architecture
Application développée sous Expo React Native

Une petite base de données SQLite est utilisée pour :
- Sauvegarder les clé/valeurs des paramètres de l'application
- Sauvegarder les créneaux d'alerte saisis par l'utilisateur
- Garder hors ligne les horaires des marées

Un mécanisme est mis en place pour permettre la mise à jour de la base de données en fonction de son état actuel
(voir le code de la classe /components/db/AppDatabase )

## Structure de l'arborescence
- /components : les composants de l'application
- /components/db : les classes d'accès à la base de données
- /components/ui : les composants d'interface de bas niveau pouvant être repris dans d'autres applications
- /app : l'application et ses onglets
