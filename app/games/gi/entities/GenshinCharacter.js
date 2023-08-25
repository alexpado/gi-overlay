import {GenshinStorage} from '../GenshinImpact.js';
import {SideMenuImage} from "../../../HTML.js";
import {Talents} from "./GenshinTalent.js";

export default class GenshinCharacter {

    /**
     * @param {string} id
     * @param {string} name
     * @param {GenshinItem} talentMaterial
     */
    constructor(id, talentMaterial, name) {

        this.id             = id;
        this.name           = name;
        this.talentMaterial = talentMaterial;

        this.levels = [
            {teachings: 3, guide: 0, philosophies: 0},
            {teachings: 0, guide: 2, philosophies: 0},
            {teachings: 0, guide: 4, philosophies: 0},
            {teachings: 0, guide: 6, philosophies: 0},
            {teachings: 0, guide: 9, philosophies: 0},
            {teachings: 0, guide: 0, philosophies: 4},
            {teachings: 0, guide: 0, philosophies: 6},
            {teachings: 0, guide: 0, philosophies: 12},
            {teachings: 0, guide: 0, philosophies: 16}
        ];

        this.requirements = {
            teachings: 0, guide: 0, philosophies: 0
        }

        this.onSideMenuClick = () => {
        };

        this.sideMenu = SideMenuImage(
            this.getImageUrl(),
            this.name,
            ''
        );

        this.sideMenu.root.addEventListener('click', () => this.onSideMenuClick());
    }

    /**
     * @param {GenshinTalent} talent
     * @return {number}
     */
    getCurrentLevel(talent) {
        return GenshinStorage.getCharacterTalentCurrentLevel(this, talent);
    }

    /**
     * @param {GenshinTalent} talent
     * @return {number}
     */
    getTargetLevel(talent) {
        return GenshinStorage.getCharacterTalentTargetLevel(this, talent);
    }

    /**
     * @param {GenshinTalent} talent
     * @param {number} level
     */
    setCurrentLevel(talent, level) {

        GenshinStorage.setCharacterTalentCurrentLevel(this, talent, level);
        this.refreshRequirements();
        this.render();
    }

    /**
     * @param {GenshinTalent} talent
     * @param {number} level
     */
    setTargetLevel(talent, level) {

        GenshinStorage.setCharacterTalentTargetLevel(this, talent, level);
        this.refreshRequirements();
        this.render();
    }

    /**
     * @param {GenshinTalent} talent
     */
    upgradeTalent(talent) {

        const upgradeData = this.levels[this.getCurrentLevel(talent) - 1]

        const available = {
            teachings:    this.talentMaterial.getInventoryAmount('teachings'),
            guide:        this.talentMaterial.getInventoryAmount('guide'),
            philosophies: this.talentMaterial.getInventoryAmount('philosophies'),
        }

        const canUseTeachings    = upgradeData.teachings <= available.teachings;
        const canUseGuide        = upgradeData.guide <= available.guide;
        const canUsePhilosophies = upgradeData.philosophies <= available.philosophies;

        if (canUseTeachings && canUseGuide && canUsePhilosophies) {
            this.talentMaterial.setInventoryAmount('teachings', available.teachings - upgradeData.teachings);
            this.talentMaterial.setInventoryAmount('guide', available.guide - upgradeData.guide);
            this.talentMaterial.setInventoryAmount('philosophies', available.philosophies - upgradeData.philosophies);
            this.setCurrentLevel(talent, this.getCurrentLevel(talent) + 1);
            return;
        }
    }

    canUpgrade(talent) {
        const level = this.getCurrentLevel(talent);

        if (level === 10) {
            return false;
        }

        const upgradeData = this.levels[level - 1]

        const available = {
            teachings:    this.talentMaterial.getInventoryAmount('teachings'),
            guide:        this.talentMaterial.getInventoryAmount('guide'),
            philosophies: this.talentMaterial.getInventoryAmount('philosophies'),
        }

        const canUseTeachings    = upgradeData.teachings <= available.teachings;
        const canUseGuide        = upgradeData.guide <= available.guide;
        const canUsePhilosophies = upgradeData.philosophies <= available.philosophies;

        return canUseTeachings && canUseGuide && canUsePhilosophies;
    }

    /**
     * @return {string}
     */
    getImageUrl() {
        return `assets/games/gi/characters/${this.id}.png`;
    }

    refreshRequirements() {

        this.requirements.teachings    = 0;
        this.requirements.guide        = 0;
        this.requirements.philosophies = 0;

        Object.keys(Talents).forEach(key => {
            const talent = Talents[key];
            const from   = this.getCurrentLevel(talent);
            const to     = this.getTargetLevel(talent);

            const idxStart = from - 1;
            const idxEnd   = to - 1;

            for (let i = idxStart; i < idxEnd; i++) {
                const idxData = this.levels[i];

                this.requirements.teachings += idxData.teachings;
                this.requirements.guide += idxData.guide;
                this.requirements.philosophies += idxData.philosophies;
            }
        });

        this.talentMaterial.refreshRequirements();
    }

    render() {

        this.sideMenu.subtitle.innerHTML = [
            this._getTalentSpan(Talents.ATTACK),
            this._getTalentSpan(Talents.SKILL),
            this._getTalentSpan(Talents.BURST),
        ].join(' — ');
    }

    /**
     * @param {GenshinTalent} talent
     * @return {string}
     * @private
     */
    _getTalentSpan(talent) {
        const current = this.getCurrentLevel(talent);
        const target  = this.getTargetLevel(talent);

        const colors = {
            gold:   '#d7c02d',
            white:  '#ffffff',
            green:  '#76d21d',
            purple: '#a24de5'
        }

        let color = null;
        if (current === 10) {
            color = colors.purple
        } else if (current < target) {
            color = colors.gold
        } else if (target === 1) {
            color = colors.white
        } else {
            color = colors.green
        }

        return `<span style="color: ${color}">${talent.name}: ${current}/${target}</span>`
    }
}
