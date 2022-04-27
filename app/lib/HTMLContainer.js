export default class HTMLContainer {

    /**
     * @param {Element} component
     */
    constructor(component) {
        this.component = component;
    }

    /**
     * @returns {Element}
     */
    getComponent() {
        return this.component;
    }

    /**
     * @param {string} cssClass
     */
    addClass(cssClass) {
        this.component.classList.add(cssClass);
    }

    /**
     * @param {string} cssClass
     */
    removeClass(cssClass) {
        this.component.classList.remove(cssClass);
    }

    /**
     * @param {string} cssClass
     * @returns {boolean}
     */
    hasClass(cssClass) {
        return this.component.classList.contains(cssClass);
    }
}
