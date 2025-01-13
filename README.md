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
`npx expo run:android`

Le composant Sqlite n'existant pas sous web, l'application web n'est pas développée. Cela reste
toutefois implémentable en utilisant les fonctionnalités LocalStorage ou indexedDB.

## Création d'un package APK pour le déploiement
`npx expo run:android --variant release`

L'APK se trouve dans `android\app\build\outputs\apk\release\` et sur le téléphone connecté en USB

## Support ios
Aucun support. Un fork de ce projet est nécessaire pour qui souhaiterait générer une version Apple.

# Pense-bête pour le dépot sur le Google Playstore
1. Ensure that you have OpenJDK 17, Android Studio, and its associated tools and NDK (Native Development Kit) installed on your system.

2. Initialize a new Expo project by executing the following command in your terminal: `pnpm create expo-app@latest`. This command will prompt you to provide some details about your project, such as the project name and configuration options.

3. Before building the Android app, you need to prebuild the `android` directory. Run the command `pnpm expo prebuild` to generate the necessary files. Additionally, you should provide your app's package name during this step. For example, if your app's package name is `com.example.app`.

4. Generate a keystore file. Use an administrator shell to create the keystore. Run the following command: `keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000` and enter your password (store it safely somewhere) and details.

5. Add this keystore file in your `android/app` folder.

6. Add the following details in your `android/gradle.properties` file:
```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

7. Now, go to the `android/app/build.gradle` file and make the changes for the release:
```
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
            storeFile file(MYAPP_UPLOAD_STORE_FILE)
            storePassword MYAPP_UPLOAD_STORE_PASSWORD
            keyAlias MYAPP_UPLOAD_KEY_ALIAS
            keyPassword MYAPP_UPLOAD_KEY_PASSWORD
        }
    }
}
buildTypes {
    release {
        ...
        signingConfig signingConfigs.release
    }
}
```

8. Open the terminal in the root of the app and run `pnpm react-native build-android --mode=release` to make the `.aab` file of your app. You can find your `.aab` file in the `android/app/build/outputs/build/release` folder.

9. To make an `.apk` file, connect your Android phone with USB to your PC with USB debugging enabled. Run the command `pnpm expo run:android --variant release`. You can find your `.apk` file in the `android\app\build\outputs\apk\release\` folder, and it will also be installed on the connected device.