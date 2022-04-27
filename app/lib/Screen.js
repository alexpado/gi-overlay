import HTMLContainer from './HTMLContainer.js';
import { create }     from '../HTML.js';

export default class Screen extends HTMLContainer {

    /**
     * @param {Application} app
     * @param {string} title
     */
    constructor(app, title) {
        super(create('div.screen'));

        this.application = app;
        this.frameContainer           = create('div.content');
        this.titleContainer           = create('div.title');
        this.titleContainer.innerHTML = `<span>${title}</span>`;
        this.selectedIndex = 0;

        this.frames = [];

        this.getComponent().appendChild(this.frameContainer);
        this.getComponent().appendChild(this.titleContainer);
    }

    /**
     * @returns {Application}
     */
    getApplication() {
        return this.application;
    }

    /**
     * @param {Frame} frame
     */
    addFrame(frame) {
        this.frames.push(frame);
        this.frameContainer.appendChild(frame.getComponent());
    }

    refresh() {
        for (let i = 0; i < this.frames.length; i++) {
            this.frames[i].refresh();
            this.frames[i].setActive(i === this.selectedIndex);
            this.frameContainer.classList.remove(`frame-${i}`);
        }

        this.frameContainer.classList.add(`frame-${this.selectedIndex}`);
    }

    /**
     * @returns {Frame[]}
     */
    getFrames() {
        return this.frames;
    }

    /**
     * @returns {Frame}
     */
    getSelectedFrame() {
        return this.frames[this.selectedIndex];
    }

    /**
     * @returns {boolean}
     */
    onLeft() {
        if (this.selectedIndex > 0 ) {
            this.selectedIndex--;
            return true;
        }
        return false;
    }

    /**
     * @returns {boolean}
     */
    onRight() {
        if (this.selectedIndex < this.frames.length - 1 ) {
            this.selectedIndex++;
            return true;
        }
        return false;
    }

    /**
     * @returns {boolean}
     */
    onDown() {
        return this.getSelectedFrame().onDown();
    }

    /**
     * @returns {boolean}
     */
    onUp() {
        return this.getSelectedFrame().onUp();
    }

    /**
     * @returns {boolean}
     */
    onConfirm() {
        throw new Error('Screen::onConfirm | Method not overridden.');
    }

    /**
     * @returns {boolean}
     */
    onBack() {
        throw new Error('Screen::onBack | Method not overridden.');
    }

}
