import Screen from "../../../ui/Screen.js";
import {charactersButton, inventoryButton, overviewButton} from "../ui/GenshinScreen.js";
import {create, InventorySlotModifier} from "../../../HTML.js";
import {TalentMaterials} from "../GenshinImpact.js";

export const screenId = 'gi-inventory';

export default class GenshinInventoryScreen extends Screen {

    constructor() {

        super(screenId);

        this.features.sideMenu = true;
        this.features.summary  = true;

        Object.keys(TalentMaterials).forEach(key => {
            TalentMaterials[key].onSideMenuClick = () => {
                this.onBookClick(TalentMaterials[key]);
            }
        });

        this.modifiers = {
            teachings:    null,
            guide:        null,
            philosophies: null
        }

        this.activeItem = null;

        this.content = {
            summary: create('div.material-previews'),
            main:    create('div.inventory')
        }

        this.onBookClick(TalentMaterials.BALLAD);
    }

    /**
     * @param {GenshinItem} item
     */
    onBookClick(item) {


        if (this.activeItem) {
            if (this.activeItem.id === item.id) {
                this.render();
                return;
            }

            this.activeItem.sideMenu.root.classList.remove('active');
        }

        this.activeItem = item;
        this.activeItem.sideMenu.root.classList.add('active');

        this.content.main.innerHTML    = '';
        this.content.summary.innerHTML = '';

        ['teachings', 'guide', 'philosophies'].forEach(key => {
            if (this.modifiers[key] === null) {
                this.modifiers[key] = InventorySlotModifier(this.activeItem.asTextureUrl(key));
            }

            this.modifiers[key].image.src          = this.activeItem.asTextureUrl(key);
            this.modifiers[key].modifier.innerHTML = '';
            this.modifiers[key].modifier.appendChild(this.activeItem.settings[key].component.root);
        });

        if (this.activeItem) {

            this.content.main.appendChild(this.modifiers.teachings.root);
            this.content.main.appendChild(this.modifiers.guide.root);
            this.content.main.appendChild(this.modifiers.philosophies.root);

            this.content.summary.appendChild(this.activeItem.previews.teachings.root);
            this.content.summary.appendChild(this.activeItem.previews.guide.root);
            this.content.summary.appendChild(this.activeItem.previews.philosophies.root);

        } else {
            this.content.main.innerHTML = '<i>Please select a book</i>';
        }

        this.render();
    }

    render() {

    }

    getContent() {

        return this.content.main;
    }

    getSidebarItems() {

        return Object.keys(TalentMaterials).map(key => TalentMaterials[key].sideMenu.root);
    }


    getSummary() {

        return this.content.summary;
    }

    postRender(screenManager) {
        overviewButton.setActive(false);
        charactersButton.setActive(false);
        inventoryButton.setActive(true);

        charactersButton.onclick = () => screenManager.goto(charactersButton.id);
        overviewButton.onclick   = () => screenManager.goto(overviewButton.id);
        inventoryButton.onclick  = () => screenManager.goto(inventoryButton.id);

        this.render();
    }

    preRender(screenManager, args) {
        if (args.material) {
            this.onBookClick(args.material)
        }
    }

}
