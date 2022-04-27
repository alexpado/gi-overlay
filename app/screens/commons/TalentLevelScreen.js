import Screen           from '../../lib/Screen.js';
import TalentLevelFrame from '../../frames/TalentLevelFrame.js';
import {TalentType}     from '../../Enums.js';

export default class TalentLevelScreen extends Screen {

    /**
     * @param {Application} app
     * @param {string} title
     */
    constructor(app, title) {
        super(app, title);

        this.talents = {
            attack: new TalentLevelFrame(TalentType.ATTACK),
            skill:  new TalentLevelFrame(TalentType.SKILL),
            burst:  new TalentLevelFrame(TalentType.BURST),
        };

        this.addFrame(this.talents.attack);
        this.addFrame(this.talents.skill);
        this.addFrame(this.talents.burst);

        this.loadState();
        this.refresh();
    }

    saveState() {
        throw new Error('TalentLevelScreen::saveState | Method not overridden.');
    }

    loadState() {
        throw new Error('TalentLevelScreen::saveState | Method not overridden.');
    }

    onDown() {
        if (super.onDown()) {
            this.saveState();
            return true;
        }
        return false;
    }

    onUp() {
        if (super.onUp()) {
            this.saveState();
            return true;
        }
        return false;
    }

    onConfirm() {
        this.saveState();
        return true;
    }
}
