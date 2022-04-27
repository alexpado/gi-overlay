import {TalentType}             from '../Enums.js';
import TalentLevelScreen        from './commons/TalentLevelScreen.js';
import CurrentTalentLevelScreen from './CurrentTalentLevelScreen.js';
import BookFarmScreen           from './BookFarmScreen.js';

export default class TargetTalentLevelScreen extends TalentLevelScreen {

    /**
     * @param {Application} app
     */
    constructor(app) {
        super(app, 'Target Talent Level');
    }

    saveState() {
        this.getApplication().getStorage().setTargetTalentLevel(TalentType.ATTACK, this.talents.attack.value);
        this.getApplication().getStorage().setTargetTalentLevel(TalentType.SKILL, this.talents.skill.value);
        this.getApplication().getStorage().setTargetTalentLevel(TalentType.BURST, this.talents.burst.value);
    }

    loadState() {

        const currentAttack = this.getApplication().getStorage().getCurrentTalentLevel(TalentType.ATTACK, 1);
        const currentSkill  = this.getApplication().getStorage().getCurrentTalentLevel(TalentType.SKILL, 1);
        const currentBurst  = this.getApplication().getStorage().getCurrentTalentLevel(TalentType.BURST, 1);

        const targetAttack = this.getApplication().getStorage().getTargetTalentLevel(TalentType.ATTACK, 1);
        const targetSkill  = this.getApplication().getStorage().getTargetTalentLevel(TalentType.SKILL, 1);
        const targetBurst  = this.getApplication().getStorage().getTargetTalentLevel(TalentType.BURST, 1);

        this.talents.attack.min = currentAttack;
        this.talents.skill.min  = currentSkill;
        this.talents.burst.min  = currentBurst;

        this.talents.attack.value = Math.max(currentAttack, targetAttack);
        this.talents.skill.value = Math.max(currentSkill, targetSkill);
        this.talents.burst.value = Math.max(currentBurst, targetBurst);
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

    onBack() {
        this.saveState();
        this.getApplication().setScreen(new CurrentTalentLevelScreen(this.getApplication()));
        return true;
    }

    onConfirm() {
        this.saveState();
        this.getApplication().setScreen(new BookFarmScreen(this.getApplication()));
        return true;
    }
}
