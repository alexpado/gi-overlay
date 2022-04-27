import HTMLContainer from './HTMLContainer.js';

export default class Frame extends HTMLContainer {

    /**
     * @param {boolean} active
     */
    setActive(active) {
        if (active) {
            this.addClass('active');
        } else {
            this.removeClass('active');
        }
    }

    /**
     * @returns {boolean}
     */
    isActive() {
        return this.hasClass('active');
    }

    refresh() {
        throw new Error('Frame::refresh | Method not overridden.');
    }

    /**
     * @returns {boolean}
     */
    onUp() {
        throw new Error('Frame::onUp | Method not overridden.');
    }

    /**
     * @returns {boolean}
     */
    onDown() {
        throw new Error('Frame::onDown | Method not overridden.');
    }

}
