import RawFrame from './RawFrame.js';

export default class NumberFrame extends RawFrame {

    /**
     * @param {string} name
     * @param {number} value
     * @param {number} min
     * @param {number} max
     */
    constructor(name, value, min, max) {

        super(`<span>${name}</span>`, `<span>${value}</span>`);

        this._name  = name;
        this._value = value;
        this._min   = min;
        this._max   = max;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get min() {
        return this._min;
    }

    set min(value) {
        this._min = value;
    }

    get max() {
        return this._max;
    }

    set max(value) {
        this._max = value;
    }

    refresh() {
        this.content = `<span>${this._value}</span>`;
    }

    onUp() {
        if (this._value < this._max) {
            this._value++;
            return true;
        }
        return false;
    }

    onDown() {
        if (this._value > this._min) {
            this._value--;
            return true;
        }
        return false;
    }
}
