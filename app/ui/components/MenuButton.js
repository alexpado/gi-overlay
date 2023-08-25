import {TabButton} from '../../HTML.js';

export default class MenuButton {

    /**
     * @param {string} id
     * @param {string} text
     */
    constructor(id, text) {

        this.id              = id;
        this.element         = TabButton(text);
        this.element.root.id = `menu-${id}`;
        this.element.root.classList.add('padding');
        this.onclick = () => {
        };

        this.element.root.addEventListener('click', () => {
            if (this.onclick) {
                this.onclick(this.element.root);
            }
        });
    }

    /**
     * @return {boolean}
     */
    isActive() {
        return this.element.root.classList.contains('active');
    }

    /**
     * @param {boolean} active
     */
    setActive(active) {
        if (active) {
            this.element.root.classList.add('active');
        } else {
            this.element.root.classList.remove('active');
        }
    }

}

export const closeApp = new MenuButton('close-app', 'X');
export const overlay  = new MenuButton('open-overlay', '✦');

(() => {
    closeApp.element.root.classList.remove('padding');
    overlay.element.root.classList.remove('padding');

    closeApp.element.root.title = 'Close application';
    overlay.element.root.title = 'Switch to overlay mode';
})();
