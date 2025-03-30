// app.config.js
export default {
    expo: {
      name: "AquaZoo",
      slug: "aquazoo",
      version: "1.0.0",
      orientation: "portrait",
      userInterfaceStyle: "light",
      splash: {
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      updates: {
        fallbackToCacheTimeout: 0
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#FFFFFF"
        }
      },
      plugins: [
        [
          "expo-build-properties",
          {
            android: {
              kotlinVersion: "1.9.25"
            }
          }
        ]
      ]
    }
  };
  