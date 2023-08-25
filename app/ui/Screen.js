import {charactersButton, inventoryButton, overviewButton} from "../games/gi/ui/GenshinScreen.js";

export default class Screen {

    constructor(id) {

        this.id = id;

        this.features = {
            sideMenu: false,
            summary:  false,
        };

        /**
         * @type {ScreenManager|null}
         */
        this.screenManager = null;
    }

    /**
     * @return {Element[]}
     */
    getMenuBarItems() {
        return [
            overviewButton.element.root,
            charactersButton.element.root,
            inventoryButton.element.root,
        ];
    }

    /**
     * @return {Element[]}
     */
    getSidebarItems() {
        return [];
    }

    /**
     * @return {Element|null}
     */
    getContent() {
        return null;
    }

    /**
     * @return {Element|null}
     */
    getSummary() {
        return null;
    }

    /**
     * Called when the rendering of this screen is finished.
     *
     * @param {ScreenManager} screenManager
     */
    postRender(screenManager) {
    }

    /**
     * Called before the rendering of this screen. Can be used to reload data
     * @param {ScreenManager} screenManager
     * @param {object} args
     */
    preRender(screenManager, args) {}

    /**
     * Called before exiting this screen. Can be used to cancel screen change.
     * @param {ScreenManager} screenManager
     * @return {boolean} True if the screen can be exited, false otherwise
     */
    onExit(screenManager) {
        return true;
    }
}
