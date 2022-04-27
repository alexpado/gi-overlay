import Storage                  from './Storage.js';
import CurrentTalentLevelScreen from './screens/CurrentTalentLevelScreen.js';
import BookStore                from './BookStore.js';

class Application {

    /**
     * @param {Element} mountPoint
     */
    constructor(mountPoint) {

        this.mountPoint = mountPoint;
        this.storage    = new Storage();
        /**
         * @type {Screen}
         */
        this.screen = new CurrentTalentLevelScreen(this);
        this.bookStore = new BookStore(this);

        this.render();
    }

    /**
     * @returns {Storage}
     */
    getStorage() {
        return this.storage;
    }

    /**
     * @returns {BookStore}
     */
    getBookStore() {
        return this.bookStore;
    }

    /**
     * @returns {Screen}
     */
    getScreen() {
        return this.screen;
    }

    /**
     * @param {Screen} screen
     */
    setScreen(screen) {
        this.screen = screen;
        this.render();
    }

    render() {
        this.mountPoint.innerHTML = '';
        this.mountPoint.appendChild(this.screen.getComponent());
    }

}

const el  = document.getElementById('app');
const app = new Application(el);

const Actions = {
    /**
     * @param {Application} el
     * @constructor
     */
    ArrowRight: (el) => el.getScreen().onRight(),
    /**
     * @param {Application} el
     * @constructor
     */
    ArrowLeft: (el) => el.getScreen().onLeft(),
    /**
     * @param {Application} el
     * @constructor
     */
    ArrowDown: (el) => el.getScreen().onDown(),
    /**
     * @param {Application} el
     * @constructor
     */
    ArrowUp: (el) => el.getScreen().onUp(),
    /**
     * @param {Application} el
     * @constructor
     */
    Enter: (el) => el.getScreen().onConfirm(),
    /**
     * @param {Application} el
     * @constructor
     */
    Backspace: (el) => el.getScreen().onBack(),
    /**
     * @param {Application} el
     * @constructor
     */
    Delete: (el) => {
        el.getStorage().erase();
        el.setScreen(new CurrentTalentLevelScreen(el));
    },
};

window.context.onKeyReceived(key => {
    const func = Actions[key];

    if (func) {
        if (func(app)) {
            app.getScreen().refresh();
        }
    }
})

window.application = app;
