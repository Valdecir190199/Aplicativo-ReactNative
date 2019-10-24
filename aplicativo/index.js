import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import App from "./android/app/src/App.js";


AppRegistry.registerComponent(appName, () => App);