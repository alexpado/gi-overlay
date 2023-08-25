import Screen from '../../../ui/Screen.js';
import {charactersButton, inventoryButton, overviewButton} from '../ui/GenshinScreen.js';
import {Characters, TalentMaterials} from '../GenshinImpact.js';
import {create, ItemPreview, TalentSlotModifier} from '../../../HTML.js';
import NumericSelector from "../../../ui/components/NumericSelector.js";
import {Talents} from "../entities/GenshinTalent.js";

export const screenId = 'gi-characters';

export default class GenshinCharacterScreen extends Screen {

    constructor() {
        super(screenId);

        this.features.sideMenu = true;
        this.features.summary  = true;

        Object.keys(Characters).forEach(key => {
            Characters[key].onSideMenuClick = () => {
                this.onCharacterClick(Characters[key]);
            }
        });

        this.modifiers = {
            currentAttack: new NumericSelector(1, 1, 10),
            currentSkill:  new NumericSelector(1, 1, 10),
            currentBurst:  new NumericSelector(1, 1, 10),
            targetAttack:  new NumericSelector(1, 1, 10),
            targetSkill:   new NumericSelector(1, 1, 10),
            targetBurst:   new NumericSelector(1, 1, 10)
        }

        /**
         * @type {GenshinCharacter}
         */
        this.activeCharacter = null;

        this.content = {
            summary: create('div.material-previews'),
            empty:   create('p'),
            slot:    TalentSlotModifier(),
            main:    create('div.character-configuration')
        }

        this.previews = {
            teachings:    ItemPreview(TalentMaterials.BALLAD.asTextureUrl('teachings')),
            guide:        ItemPreview(TalentMaterials.BALLAD.asTextureUrl('guide')),
            philosophies: ItemPreview(TalentMaterials.BALLAD.asTextureUrl('philosophies'))
        }

        this.content.empty.innerHTML = '<i>Please select a character</i>';
        this.content.main.appendChild(this.content.empty);

        this.content.summary.appendChild(this.previews.teachings.root);
        this.content.summary.appendChild(this.previews.guide.root);
        this.content.summary.appendChild(this.previews.philosophies.root);

        Object.keys(this.modifiers).forEach(key => {
            this.content.slot[key].appendChild(this.modifiers[key].component.root);
        });

        this.modifiers.currentAttack.onValueChanged = (value) => {
            this.activeCharacter.setCurrentLevel(Talents.ATTACK, value);
            this.modifiers.targetAttack.setMin(value);
            this.render();
        }

        this.modifiers.currentSkill.onValueChanged = (value) => {
            this.activeCharacter.setCurrentLevel(Talents.SKILL, value);
            this.modifiers.targetSkill.setMin(value);
            this.render();
        }

        this.modifiers.currentBurst.onValueChanged = (value) => {
            this.activeCharacter.setCurrentLevel(Talents.BURST, value);
            this.modifiers.targetBurst.setMin(value);
            this.render();
        }

        this.modifiers.targetAttack.onValueChanged = (value) => {
            this.activeCharacter.setTargetLevel(Talents.ATTACK, value);
            this.render();
        }
        this.modifiers.targetSkill.onValueChanged  = (value) => {
            this.activeCharacter.setTargetLevel(Talents.SKILL, value);
            this.render();
        }
        this.modifiers.targetBurst.onValueChanged  = (value) => {
            this.activeCharacter.setTargetLevel(Talents.BURST, value);
            this.render();
        }

        this.previews.teachings.crafted.remove();

        this.content.slot.reset.addEventListener('click', () => {
            this.activeCharacter.setCurrentLevel(Talents.ATTACK, 1);
            this.activeCharacter.setCurrentLevel(Talents.SKILL, 1);
            this.activeCharacter.setCurrentLevel(Talents.BURST, 1);
            this.activeCharacter.setTargetLevel(Talents.ATTACK, 1);
            this.activeCharacter.setTargetLevel(Talents.SKILL, 1);
            this.activeCharacter.setTargetLevel(Talents.BURST, 1);
            this.render();
        });

        this.content.slot.upgradeAttack.addEventListener('click', () => {
            this.activeCharacter.upgradeTalent(Talents.ATTACK);
            this.render();
        });

        this.content.slot.upgradeSkill.addEventListener('click', () => {
            this.activeCharacter.upgradeTalent(Talents.SKILL);
            this.render();
        });

        this.content.slot.upgradeBurst.addEventListener('click', () => {
            this.activeCharacter.upgradeTalent(Talents.BURST);
            this.render();
        });

        // Always select first item
        if (this.activeCharacter == null) {
            this.onCharacterClick(Characters.AMBER);
        }
    }

    /**
     * @param {GenshinCharacter} character
     */
    onCharacterClick(character) {

        if (this.activeCharacter) {
            this.activeCharacter.sideMenu.root.classList.remove('active');
        }

        this.content.main.innerHTML = '';
        this.content.main.appendChild(this.content.slot.root);

        this.activeCharacter = character;
        this.activeCharacter.sideMenu.root.classList.add('active');

        this.previews.teachings.image.src    = this.activeCharacter.talentMaterial.asTextureUrl('teachings');
        this.previews.guide.image.src        = this.activeCharacter.talentMaterial.asTextureUrl('guide');
        this.previews.philosophies.image.src = this.activeCharacter.talentMaterial.asTextureUrl('philosophies');

        this.render();
    }

    render() {

        const total = {
            teachings:    this.activeCharacter.talentMaterial.data.obtained.teachings,
            guide:        this.activeCharacter.talentMaterial.data.obtained.guide + this.activeCharacter.talentMaterial.data.crafted.guide,
            philosophies: this.activeCharacter.talentMaterial.data.obtained.philosophies + this.activeCharacter.talentMaterial.data.crafted.philosophies
        }

        const missing = {
            teachings:    Math.max(0, this.activeCharacter.requirements.teachings - total.teachings),
            guide:        Math.max(0, this.activeCharacter.requirements.guide - total.guide),
            philosophies: Math.max(0, this.activeCharacter.requirements.philosophies - total.philosophies),
        }

        this.modifiers.currentAttack.value = this.activeCharacter.getCurrentLevel(Talents.ATTACK);
        this.modifiers.currentSkill.value  = this.activeCharacter.getCurrentLevel(Talents.SKILL);
        this.modifiers.currentBurst.value  = this.activeCharacter.getCurrentLevel(Talents.BURST);

        this.modifiers.targetAttack.min = this.modifiers.currentAttack.value;
        this.modifiers.targetSkill.min  = this.modifiers.currentSkill.value;
        this.modifiers.targetBurst.min  = this.modifiers.currentBurst.value;

        this.modifiers.targetAttack.value = this.activeCharacter.getTargetLevel(Talents.ATTACK);
        this.modifiers.targetSkill.value  = this.activeCharacter.getTargetLevel(Talents.SKILL);
        this.modifiers.targetBurst.value  = this.activeCharacter.getTargetLevel(Talents.BURST);

        this.previews.teachings.obtained.innerHTML    = this.activeCharacter.talentMaterial.data.obtained.teachings;
        this.previews.guide.obtained.innerHTML        = this.activeCharacter.talentMaterial.data.obtained.guide;
        this.previews.philosophies.obtained.innerHTML = this.activeCharacter.talentMaterial.data.obtained.philosophies;

        this.previews.teachings.required.innerHTML    = this.activeCharacter.requirements.teachings;
        this.previews.guide.required.innerHTML        = this.activeCharacter.requirements.guide;
        this.previews.philosophies.required.innerHTML = this.activeCharacter.requirements.philosophies;

        this.previews.teachings.needed.innerHTML    = `${missing.teachings}`;
        this.previews.guide.needed.innerHTML        = `${missing.guide}`;
        this.previews.philosophies.needed.innerHTML = `${missing.philosophies}`;

        this.previews.guide.crafted.innerHTML        = `+${this.activeCharacter.talentMaterial.data.crafted.guide}`;
        this.previews.philosophies.crafted.innerHTML = `+${this.activeCharacter.talentMaterial.data.crafted.philosophies}`;

        if (total.teachings >= this.activeCharacter.requirements.teachings) {
            this.previews.teachings.root.classList.add('farm-ok')
        } else {
            this.previews.teachings.root.classList.remove('farm-ok');
        }

        if (total.guide >= this.activeCharacter.requirements.guide) {
            this.previews.guide.root.classList.add('farm-ok');
        } else {
            this.previews.guide.root.classList.remove('farm-ok');
        }

        if (total.philosophies >= this.activeCharacter.requirements.philosophies) {
            this.previews.philosophies.root.classList.add('farm-ok');
        } else {
            this.previews.philosophies.root.classList.remove('farm-ok');
        }

        if (!this.activeCharacter.canUpgrade(Talents.ATTACK)) {
            this.content.slot.upgradeAttack.disabled = true;

            if (this.activeCharacter.getCurrentLevel(Talents.ATTACK) === 10) {
                this.content.slot.upgradeAttack.title = 'You can\'t upgrade above level 10';
            } else {
                this.content.slot.upgradeAttack.title = 'You don\'t have enough materials';
            }
        } else {
            this.content.slot.upgradeAttack.disabled = false;
            this.content.slot.upgradeAttack.title    = 'Consume talent materials to add one level (exclude crafting)';
        }

        if (!this.activeCharacter.canUpgrade(Talents.SKILL)) {
            this.content.slot.upgradeSkill.disabled = true;

            if (this.activeCharacter.getCurrentLevel(Talents.SKILL) === 10) {
                this.content.slot.upgradeSkill.title = 'You can\'t upgrade above level 10';
            } else {
                this.content.slot.upgradeSkill.title = 'You don\'t have enough materials';
            }
        } else {
            this.content.slot.upgradeSkill.disabled = false;
            this.content.slot.upgradeSkill.title    = 'Consume talent materials to add one level (exclude crafting)';
        }

        if (!this.activeCharacter.canUpgrade(Talents.BURST)) {
            this.content.slot.upgradeBurst.disabled = true;

            if (this.activeCharacter.getCurrentLevel(Talents.BURST) === 10) {
                this.content.slot.upgradeBurst.title = 'You can\'t upgrade above level 10';
            } else {
                this.content.slot.upgradeBurst.title = 'You don\'t have enough materials';
            }
        } else {
            this.content.slot.upgradeBurst.disabled = false;
            this.content.slot.upgradeBurst.title    = 'Consume talent materials to add one level (exclude crafting)';
        }

    }

    getSidebarItems() {

        return Object.keys(Characters).map(key => Characters[key].sideMenu.root);
    }

    getSummary() {

        return this.content.summary;
    }

    getContent() {

        return this.content.main;
    }

    postRender(screenManager) {
        charactersButton.setActive(true);
        overviewButton.setActive(false);
        inventoryButton.setActive(false);

        charactersButton.onclick = () => screenManager.goto(charactersButton.id);
        overviewButton.onclick   = () => screenManager.goto(overviewButton.id);
        inventoryButton.onclick  = () => screenManager.goto(inventoryButton.id);

        this.render();
    }
}
