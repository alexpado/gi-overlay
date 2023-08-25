import Screen from '../../../ui/Screen.js';
import {charactersButton, inventoryButton, overviewButton} from '../ui/GenshinScreen.js';
import {create, TabButton, TabPanel} from '../../../HTML.js';
import {Days} from "../GenshinImpact.js";
import {screenId as inventoryScreen} from "./GenshinInventoryScreen.js";


export const screenId = 'gi-overview';

export default class GenshinOverviewScreen extends Screen {

    constructor() {
        super(screenId);

        this.features.sideMenu = false;
        this.features.summary  = false;

        this.data = {
            activeDay: null,
            day: null
        }

        this.content = {
            panel: TabPanel(),
            tabs:  {
                monday:    {
                    button:  TabButton('Monday'),
                },
                tuesday:   {
                    button:  TabButton('Tuesday'),
                },
                wednesday: {
                    button:  TabButton('Wednesday'),
                },
                thursday:  {
                    button:  TabButton('Thursday'),
                },
                friday:    {
                    button:  TabButton('Friday'),
                },
                saturday:  {
                    button:  TabButton('Saturday'),
                },
                sunday:    {
                    button:  TabButton('Sunday'),
                },
            }
        }

        this.content.panel.tabs.appendChild(this.content.tabs.monday.button.root);
        this.content.panel.tabs.appendChild(this.content.tabs.tuesday.button.root);
        this.content.panel.tabs.appendChild(this.content.tabs.wednesday.button.root);
        this.content.panel.tabs.appendChild(this.content.tabs.thursday.button.root);
        this.content.panel.tabs.appendChild(this.content.tabs.friday.button.root);
        this.content.panel.tabs.appendChild(this.content.tabs.saturday.button.root);
        this.content.panel.tabs.appendChild(this.content.tabs.sunday.button.root);

        Object.keys(this.content.tabs).forEach(day => {
            this.content.tabs[day].button.root.addEventListener('click', () => {
                this.onDayClicked(day);
            });
        });

        this.onDayClicked('monday');
    }

    onDayClicked(day) {

        if (this.data.activeDay) {
            this.data.activeDay.button.root.classList.remove('active');
        }

        this.data.activeDay = this.content.tabs[day];
        this.data.day = day;
        this.data.activeDay.button.root.classList.add('active');

        this.content.panel.content.innerHTML = '';

        Days[this.data.day].forEach(material => {
            const div = create('div.material-preview-group');
            div.appendChild(material.overview.teachings.root);
            div.appendChild(material.overview.guide.root);
            div.appendChild(material.overview.philosophies.root);
            this.content.panel.content.appendChild(div);

            div.title = `Click to open inventory to '${material.name}'`

            div.addEventListener('click', () => {
                this.screenManager.goto(inventoryScreen, {material})
            })
        });

        this.render();
    }

    render() {
        if (this.screenManager) {
            this.screenManager.contentScroll.onScroll();
        }
    }

    getContent() {
        return this.content.panel.root;
    }

    preRender(screenManager) {
        this.render();
    }

    postRender(screenManager) {
        overviewButton.setActive(true);
        charactersButton.setActive(false);
        inventoryButton.setActive(false);

        charactersButton.onclick = () => screenManager.goto(charactersButton.id);
        overviewButton.onclick   = () => screenManager.goto(overviewButton.id);
        inventoryButton.onclick  = () => screenManager.goto(inventoryButton.id);

        this.render();
    }
}
