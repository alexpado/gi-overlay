import {Characters, GenshinStorage} from '../GenshinImpact.js';
import {ItemPreview, MaterialSubtitle, SideMenuBackground} from "../../../HTML.js";
import NumericSelector from "../../../ui/components/NumericSelector.js";

export default class GenshinItem {

    /**
     * @param {string} id
     * @param {string} name
     */
    constructor(id, name) {
        this.id   = id;
        this.name = name;

        this.data = {
            obtained: {
                teachings:    this.getInventoryAmount('teachings'),
                guide:        this.getInventoryAmount('guide'),
                philosophies: this.getInventoryAmount('philosophies')
            },
            crafted:  {
                guide:        0,
                philosophies: 0
            },
            required: {
                teachings:    0,
                guide:        0,
                philosophies: 0
            }
        }

        this.onSideMenuClick = () => {
        };

        this.sideMenu = SideMenuBackground(
            this.name,
            `${this.data.obtained.teachings} / ${this.data.obtained.guide} / ${this.data.obtained.philosophies}`,
            [
                this.asTextureUrl("teachings"),
                this.asTextureUrl("guide"),
                this.asTextureUrl("philosophies")
            ]
        )

        this.settings = {
            teachings:    new NumericSelector(this.data.obtained.teachings, 0, Number.MAX_SAFE_INTEGER),
            guide:        new NumericSelector(this.data.obtained.guide, 0, Number.MAX_SAFE_INTEGER),
            philosophies: new NumericSelector(this.data.obtained.philosophies, 0, Number.MAX_SAFE_INTEGER)
        }

        this.previews = {
            teachings:    ItemPreview(this.asTextureUrl('teachings')),
            guide:        ItemPreview(this.asTextureUrl('guide')),
            philosophies: ItemPreview(this.asTextureUrl('philosophies'))
        }

        this.overview = {
            teachings:    ItemPreview(this.asTextureUrl('teachings')),
            guide:        ItemPreview(this.asTextureUrl('guide')),
            philosophies: ItemPreview(this.asTextureUrl('philosophies'))
        }

        this.settings.teachings.onValueChanged    = (value) => this.setInventoryAmount('teachings', value);
        this.settings.guide.onValueChanged        = (value) => this.setInventoryAmount('guide', value);
        this.settings.philosophies.onValueChanged = (value) => this.setInventoryAmount('philosophies', value);

        this.sideMenu.root.addEventListener('click', () => this.onSideMenuClick());
        this.previews.teachings.crafted.remove();
        this.overview.teachings.crafted.remove();
        this.render();
    }

    doCrafting() {

        const teachingsLeftover = Math.max(0, this.data.obtained.teachings - this.data.required.teachings)
        this.data.crafted.guide = Math.trunc(teachingsLeftover / 3);

        const guideLeftover            = Math.max(0, (this.data.obtained.guide + this.data.crafted.guide) - this.data.required.guide);
        this.data.crafted.philosophies = Math.trunc(guideLeftover / 3);

        this.render();
    }

    refreshRequirements() {

        this.data.required.teachings    = 0;
        this.data.required.guide        = 0;
        this.data.required.philosophies = 0;

        Object.keys(Characters)
            .map(key => Characters[key])
            .filter(character => character.talentMaterial.id === this.id)
            .forEach(character => {
                this.data.required.teachings += character.requirements.teachings;
                this.data.required.guide += character.requirements.guide;
                this.data.required.philosophies += character.requirements.philosophies;
            });

        this.doCrafting();
    }

    /**
     * @param {"teachings"|"guide"|"philosophies"} type
     */
    getInventoryAmount(type) {
        return GenshinStorage.getTalentMaterialAmount(this, type);
    }

    /**
     * @param {"teachings"|"guide"|"philosophies"} type
     * @param {number} amount
     */
    setInventoryAmount(type, amount) {

        this.data.obtained[type] = amount;
        GenshinStorage.setTalentMaterialAmount(this, type, amount);
        this.render();
    }

    /**
     * @param {"teachings"|"guide"|"philosophies"} rarity
     * @return {string}
     */
    asTextureUrl(rarity) {
        return `assets/games/gi/talents/${this.id}/${rarity}.webp`;
    }

    render() {

        this.sideMenu.subtitle.innerHTML = '';

        const teachings    = MaterialSubtitle('T', this.data.obtained.teachings, 0, this.data.required.teachings);
        const guide        = MaterialSubtitle('G', this.data.obtained.guide, this.data.crafted.guide, this.data.required.guide);
        const philosophies = MaterialSubtitle('P', this.data.obtained.philosophies, this.data.crafted.philosophies, this.data.required.philosophies);

        teachings.crafted.remove();

        if (this.data.obtained.teachings >= this.data.required.teachings) {
            teachings.root.classList.add('farm-ok')
            this.previews.teachings.root.classList.add('farm-ok');
            this.overview.teachings.root.classList.add('farm-ok')
        } else {
            this.previews.teachings.root.classList.remove('farm-ok');
            this.overview.teachings.root.classList.remove('farm-ok');
        }

        if (this.data.obtained.guide + this.data.crafted.guide >= this.data.required.guide) {
            guide.root.classList.add('farm-ok');
            this.previews.guide.root.classList.add('farm-ok');
            this.overview.guide.root.classList.add('farm-ok');
        } else {
            this.previews.guide.root.classList.remove('farm-ok');
            this.overview.guide.root.classList.remove('farm-ok');
        }

        if (this.data.obtained.philosophies + this.data.crafted.philosophies >= this.data.required.philosophies) {
            philosophies.root.classList.add('farm-ok');
            this.previews.philosophies.root.classList.add('farm-ok');
            this.overview.philosophies.root.classList.add('farm-ok');
        } else {
            this.previews.philosophies.root.classList.remove('farm-ok');
            this.overview.philosophies.root.classList.remove('farm-ok');
        }

        this.sideMenu.subtitle.appendChild(teachings.root);
        this.sideMenu.subtitle.appendChild(guide.root);
        this.sideMenu.subtitle.appendChild(philosophies.root);

        const missing = {
            teachings:    Math.max(0, this.data.required.teachings - this.data.obtained.teachings),
            guide:        Math.max(0, this.data.required.guide - (this.data.obtained.guide + this.data.crafted.guide)),
            philosophies: Math.max(0, this.data.required.philosophies - (this.data.obtained.philosophies + this.data.crafted.philosophies)),
        }

        this.previews.teachings.obtained.innerText    = this.data.obtained.teachings;
        this.previews.guide.obtained.innerText        = this.data.obtained.guide;
        this.previews.philosophies.obtained.innerText = this.data.obtained.philosophies;

        this.previews.teachings.required.innerText    = this.data.required.teachings;
        this.previews.guide.required.innerText        = this.data.required.guide;
        this.previews.philosophies.required.innerText = this.data.required.philosophies;

        this.previews.teachings.needed.innerText    = `${missing.teachings}`;
        this.previews.guide.needed.innerText        = `${missing.guide}`;
        this.previews.philosophies.needed.innerText = `${missing.philosophies}`;

        this.previews.guide.crafted.innerText        = `+${this.data.crafted.guide}`;
        this.previews.philosophies.crafted.innerText = `+${this.data.crafted.philosophies}`;

        this.overview.teachings.obtained.innerText    = this.data.obtained.teachings;
        this.overview.guide.obtained.innerText        = this.data.obtained.guide;
        this.overview.philosophies.obtained.innerText = this.data.obtained.philosophies;

        this.overview.teachings.required.innerText    = this.data.required.teachings;
        this.overview.guide.required.innerText        = this.data.required.guide;
        this.overview.philosophies.required.innerText = this.data.required.philosophies;

        this.overview.teachings.needed.innerText    = `${missing.teachings}`;
        this.overview.guide.needed.innerText        = `${missing.guide}`;
        this.overview.philosophies.needed.innerText = `${missing.philosophies}`;

        this.overview.guide.crafted.innerText        = `+${this.data.crafted.guide}`;
        this.overview.philosophies.crafted.innerText = `+${this.data.crafted.philosophies}`;
    }
}
