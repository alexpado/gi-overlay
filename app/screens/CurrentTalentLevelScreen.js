import {TalentType}            from '../Enums.js';
import TalentLevelScreen       from './commons/TalentLevelScreen.js';
import TargetTalentLevelScreen from './TargetTalentLevelScreen.js';

export default class CurrentTalentLevelScreen extends TalentLevelScreen {

    /**
     * @param {Application} app
     */
    constructor(app) {
        super(app, 'Current Talent Level');
    }

    saveState() {
        this.getApplication().getStorage().setCurrentTalentLevel(TalentType.ATTACK, this.talents.attack.value);
        this.getApplication().getStorage().setCurrentTalentLevel(TalentType.SKILL, this.talents.skill.value);
        this.getApplication().getStorage().setCurrentTalentLevel(TalentType.BURST, this.talents.burst.value);

        this.getApplication().getBookStore().refresh();
    }

    loadState() {
        this.talents.attack.value = this.getApplication().getStorage().getCurrentTalentLevel(TalentType.ATTACK, 1);
        this.talents.skill.value  = this.getApplication().getStorage().getCurrentTalentLevel(TalentType.SKILL, 1);
        this.talents.burst.value  = this.getApplication().getStorage().getCurrentTalentLevel(TalentType.BURST, 1);
    }

    onConfirm() {
        super.onConfirm();
        this.getApplication().setScreen(new TargetTalentLevelScreen(this.getApplication()));
        return true;
    }
}
