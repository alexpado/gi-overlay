import Screen                  from '../lib/Screen.js';
import {BookType}              from '../Enums.js';
import BookFrame               from '../frames/BookFrame.js';
import TargetTalentLevelScreen from './TargetTalentLevelScreen.js';

export default class BookFarmScreen extends Screen {

    /**
     * @param {Application} app
     */
    constructor(app) {
        super(app, '');

        this.books = {
            bronze: new BookFrame(BookType.BRONZE),
            silver: new BookFrame(BookType.SILVER),
            gold:   new BookFrame(BookType.GOLD),
        };

        this.readOnly = false;

        this.addFrame(this.books.bronze);
        this.addFrame(this.books.silver);
        this.addFrame(this.books.gold);

        this.loadState();
        this.refresh();
    }

    saveState() {
        this.getApplication().getStorage().setBookAmount(BookType.BRONZE, this.books.bronze.amount);
        this.getApplication().getStorage().setBookAmount(BookType.SILVER, this.books.silver.amount);
        this.getApplication().getStorage().setBookAmount(BookType.GOLD, this.books.gold.amount);

        this.getApplication().getBookStore().refresh();
        this.refresh();
    }

    loadState() {
        this.getApplication().getBookStore().refresh();
        this.refresh();
    }

    refresh() {
        this.books.bronze.amount = this.getApplication().getBookStore().possession.bronze;
        this.books.silver.amount = this.getApplication().getBookStore().possession.silver;
        this.books.gold.amount   = this.getApplication().getBookStore().possession.gold;

        this.books.bronze.required = this.getApplication().getBookStore().required.bronze;
        this.books.silver.required = this.getApplication().getBookStore().required.silver;
        this.books.gold.required = this.getApplication().getBookStore().required.gold;

        this.books.bronze.crafted = this.getApplication().getBookStore().craftable.bronze;
        this.books.silver.crafted = this.getApplication().getBookStore().craftable.silver;
        this.books.gold.crafted = this.getApplication().getBookStore().craftable.gold;

        if (this.readOnly) {
            this.frameContainer.classList.add('read-only');
        } else {
            this.frameContainer.classList.remove('read-only');
        }

        super.refresh();
    }

    onDown() {
        if (this.readOnly) {
            return false;
        }

        if (super.onDown()) {
            this.saveState();
            return true;
        }
        return false;
    }

    onUp() {
        if (this.readOnly) {
            return false;
        }

        if (super.onUp()) {
            this.saveState();
            return true;
        }
        return false;
    }

    onLeft() {
        if (this.readOnly) {
            return false;
        }
        return super.onLeft();
    }

    onRight() {
        if (this.readOnly) {
            return false;
        }
        return super.onRight();
    }

    onConfirm() {
        this.saveState();
        this.readOnly = !this.readOnly;
        return true;
    }

    onBack() {
        if (this.readOnly) {
            return false;
        }
        this.saveState();
        this.getApplication().setScreen(new TargetTalentLevelScreen(this.getApplication()));
        return true;
    }
}
