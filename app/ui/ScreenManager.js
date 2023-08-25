import {closeApp, overlay} from './components/MenuButton.js';
import Scroll from './lib/Scroll.js';

export default class ScreenManager {

    constructor() {

        this.screenPool = {};
        this.app        = document.getElementById('app');
        this.menu       = this.app.querySelector('[data-ref="menu-bar"]');
        this.sideMenu   = this.app.querySelector('[data-ref="side-menu"]');
        this.content    = this.app.querySelector('[data-ref="content"]');
        this.summary    = this.app.querySelector('[data-ref="summary"]');

        this.sideScroll    = new Scroll(this.sideMenu.parentNode);
        this.contentScroll = new Scroll(this.content.parentNode);

        /**
         * @type {Screen|null}
         */
        this.screen = null;
    }

    render(args) {

        if (this.screen) {
            this.screen.preRender(this, args);
            this.screen.screenManager = this;
        } else {
            return;
        }

        // Reset layout
        this.menu.innerHTML     = '';
        this.sideMenu.innerHTML = '';
        this.content.innerHTML  = '';
        this.summary.innerHTML  = '';

        this.sideMenu.scrollTop = 0;
        this.content.scrollTop  = 0;

        this.screen.getMenuBarItems().forEach(btn => {
            this.menu.appendChild(btn);
        });
        this.menu.appendChild(overlay.element.root)
        this.menu.appendChild(closeApp.element.root);

        if (!this.screen.features.sideMenu) {
            this.sideMenu.parentNode.style.display = 'none';
        } else {
            this.sideMenu.parentNode.style.display = '';
            this.screen.getSidebarItems().forEach(item => this.sideMenu.appendChild(item));
        }

        if (!this.screen.features.summary) {
            this.summary.style.display = 'none';
        } else {
            this.summary.style.display = '';
            this.summary.appendChild(this.screen.getSummary());
        }
        this.content.appendChild(this.screen.getContent());

        this.screen.postRender(this);
        this.sideScroll.onScroll();
        this.contentScroll.onScroll();
    }

    /**
     * @param {Screen} screen
     */
    registerScreen(screen) {
        if (!this.screenPool.hasOwnProperty(screen.id)) {
            this.screenPool[screen.id] = screen;
        }
    }

    /**
     * @param {Screen} screen
     * @param {object} args
     */
    setScreen(screen, args) {
        this.screen = screen;
        this.render(args);
    }

    /**
     *
     * @param {string} id
     * @param {object=} args
     */
    goto(id, args = {}) {
        if (!this.screenPool.hasOwnProperty(id)) {
            console.error('Could not switch screen: Screen does not exists.', id);
        }

        if (this.screen) {
            if (this.screen.id === id) {
                console.log('Ignored screen change request: Already on screen.');
                return;
            }

            if (!this.screen.onExit(this)) {
                console.warn('Screen change prevented due to preExit policy.');
                return;
            }
        }

        this.setScreen(this.screenPool[id], args);
    }
}
