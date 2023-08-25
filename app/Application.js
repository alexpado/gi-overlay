import ScreenManager from './ui/ScreenManager.js';
import GenshinCharacterScreen from './games/gi/screens/GenshinCharacterScreen.js';
import GenshinOverviewScreen, {screenId} from './games/gi/screens/GenshinOverviewScreen.js';
import GenshinInventoryScreen from "./games/gi/screens/GenshinInventoryScreen.js";

class Application {

    constructor() {

        this.screenManager = new ScreenManager();

        this.screenManager.registerScreen(new GenshinCharacterScreen());
        this.screenManager.registerScreen(new GenshinOverviewScreen());
        this.screenManager.registerScreen(new GenshinInventoryScreen());

        this.screenManager.goto(screenId);
    }
}

window.app = new Application();
