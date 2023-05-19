import {TalentMaterials} from "./game/TalentMaterial";
import {Talents} from "./game/Talent";

export default class MaterialStore {

    constructor(application) {
        this.application = application;

        this.talents = {
            material: TalentMaterials.BALLAD,
            requirements: [
                {teachings: 3, guide: 0, philosophies: 0},
                {teachings: 0, guide: 2, philosophies: 0},
                {teachings: 0, guide: 4, philosophies: 0},
                {teachings: 0, guide: 6, philosophies: 0},
                {teachings: 0, guide: 9, philosophies: 0},
                {teachings: 0, guide: 0, philosophies: 4},
                {teachings: 0, guide: 0, philosophies: 6},
                {teachings: 0, guide: 0, philosophies: 12},
                {teachings: 0, guide: 0, philosophies: 16}
            ],
            possession: {teachings: 0, guide: 0, philosophies: 0},
            required: {teachings: 0, guide: 0, philosophies: 0},
            craftable: {teachings: 0, guide: 0, philosophies: 0},
            levels: {
                attack: {current: 1, target: 1},
                skill: {current: 1, target: 1},
                burst: {current: 1, target: 1}
            }
        }
    }

    /**
     * @param {"teachings"|"guide"|"philosophies"} level
     */
    doTalentCraftOn(level) {

        const leftOver = (this.talents.possession[level] + this.talents.craftable[level]) - this.talents.required[level];

        if (leftOver > 0) {
            const craftedAmount = Math.floor(leftOver / 3);

            switch (leftOver) {
                case 'teachings':
                    this.talents.craftable.guide = craftedAmount;
                    break;
                case 'guide':
                    this.talents.craftable.philosophies = craftedAmount;
                    break;
            }
        }
    }

    refreshTalentMaterials() {
        this.talents.levels.attack.current = this.application.getStorage().getCharacterTalentCurrentLevel(Talents.ATTACK);
        this.talents.levels.attack.target = this.application.getStorage().getCharacterTalentCurrentLevel(Talents.ATTACK);
        this.talents.levels.skill.current = this.application.getStorage().getCharacterTalentCurrentLevel(Talents.SKILL);
        this.talents.levels.skill.target = this.application.getStorage().getCharacterTalentCurrentLevel(Talents.SKILL);
        this.talents.levels.burst.current = this.application.getStorage().getCharacterTalentCurrentLevel(Talents.BURST);
        this.talents.levels.burst.target = this.application.getStorage().getCharacterTalentCurrentLevel(Talents.BURST);

        const attack = this.getNeededTalentMaterial(this.talents.attack.from, this.talents.attack.to);
        const skill = this.getNeededTalentMaterial(this.talents.skill.from, this.talents.skill.to);
        const burst = this.getNeededTalentMaterial(this.talents.burst.from, this.talents.burst.to);

        this.talents.required.teachings = attack.teachings + skill.teachings + burst.teachings;
        this.talents.required.guide = attack.guide + skill.guide + burst.guide;
        this.talents.required.philosophies = attack.philosophies + skill.philosophies + burst.philosophies;

        this.talents.possession.teachings = this.application.getStorage().getTalentMaterialAmount(this.talents.material, "teachings");
        this.talents.possession.guide = this.application.getStorage().getTalentMaterialAmount(this.talents.material, "guide");
        this.talents.possession.philosophies = this.application.getStorage().getTalentMaterialAmount(this.talents.material, "philosophies");

        this.doTalentCraftOn('teachings');
        this.doTalentCraftOn('guide');
    }

    /**
     * @param {number} current
     * @param {number} target
     * @return {{teachings: number, philosophies: number, guide: number}}
     */
    getNeededTalentMaterial(current, target) {
        const idxStart = current - 1;
        const idxEnd = target - 1;

        const result = {
            teachings: 0,
            guide: 0,
            philosophies: 0,
        };

        for (let i = idxStart; i < idxEnd; i++) {
            const idxData = this.talents.requirements[i];
            result.teachings = result.teachings + idxData.teachings;
            result.guide = result.guide + idxData.guide;
            result.philosophies = result.philosophies + idxData.philosophies;
        }
        return result;
    }

}
