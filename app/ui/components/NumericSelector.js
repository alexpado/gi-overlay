import {NumericSelectorComponent} from "../../HTML.js";

export default class NumericSelector {

    constructor(value, min, max) {

        this._value = value;
        this._min   = min;
        this._max   = max;

        this.onValueChanged = (value) => {
        };

        this.component = NumericSelectorComponent(this._value);

        this.component.increment.addEventListener('click', () => {
            this.setValue(this._value + 1);
        });

        this.component.decrement.addEventListener('click', () => {
            this.setValue(this._value - 1);
        });

        this.render();
    }

    setValue(value) {
        const newValue = Math.max(this._min, Math.min(this._max, value));

        if (newValue !== this._value) {
            this._value = newValue;
            this.render();
            this.onValueChanged(this._value)
        }
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (value >= this._min && value <= this._max) {
            this._value = value;
            this.render();
        }
    }

    set min(value) {
        this._min = value;
        this._value = Math.max(this._min, this._value);
        this.render();
    }

    setMin(value) {
        this._min = value;
        this.setValue(this._value);
    }

    set max(value) {
        this._max = value;
        this._value = Math.min(this._max, this._value);
        this.render();
    }

    setMax(value) {
        this._max = value;
        this.setValue(this._value);
    }

    render() {
        this.component.value.innerText = this._value;

        if (this._value === this._min) {
            this.component.decrement.disabled = true;
            this.component.decrement.title = 'You reached the minimum value allowed';
        } else {
            this.component.decrement.disabled = false;
            this.component.decrement.title = 'Subtract 1';
        }

        if (this._value === this._max) {
            this.component.increment.disabled = true;
            this.component.increment.title = 'You reached the maximum value allowed';
        } else {
            this.component.increment.disabled = false;
            this.component.increment.title = 'Add 1';
        }
    }

}
