import RawFrame from '../lib/presets/RawFrame.js';

export default class BookFrame extends RawFrame {

    /**
     * @param {'bronze'|'silver'|'gold'} bookType
     */
    constructor(bookType) {
        super('0 / 0', `<img alt="${bookType}" src="img/${bookType}.png" />`);

        this._amount = 0
        this._crafted = 0;
        this._required = 0;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get crafted() {
        return this._crafted;
    }

    set crafted(value) {
        this._crafted = value;
    }

    get required() {
        return this._required;
    }

    set required(value) {
        this._required = value;
    }

    refresh() {
        if (this._amount + this._crafted >= this._required) {
            this.getComponent().classList.add('completed');
        } else {
            this.getComponent().classList.remove('completed');
        }

        if (this._crafted > 0) {
            this.name = `<span>${this._amount}<span style="color: #5eff5e;">+${this._crafted}</span> / ${this._required}</span>`;
        } else {
            this.name = `<span>${this._amount} / ${this._required}</span>`;
        }
    }

    onUp() {
        if (this._amount < Number.MAX_VALUE) {
            this._amount++;
            return true;
        }
        return false;
    }

    onDown() {
        if (this._amount > 0) {
            this._amount--;
            return true;
        }
        return false;
    }


}
