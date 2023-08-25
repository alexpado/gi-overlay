/**
 * @param {string} str
 * @param {Node[]} child
 * @param {any=} options
 * @returns {Element}
 */
export const create = (str, child = [], options = {}) => {
    const [tag, ...classes] = str.split('.');
    const el                = document.createElement(tag);
    classes.forEach(cls => el.classList.add(cls));

    if (options['innerText']) {
        el.innerText = options.innerText;
    }

    if (options['listeners']) {
        Object.keys(options.listeners).forEach(name => {
            el.addEventListener(name, options.listeners[name]);
        });
    }

    child.forEach(node => el.appendChild(node));
    return el;
};

/**
 * @param {string} html
 * @return {any}
 * @constructor
 */
const references = (html) => {

    const element = stringToHtml(html);

    const ref = {
        root: element
    };

    element.querySelectorAll('[data-ref]').forEach(node => {
        ref[node.dataset.ref] = node;
    });

    return ref;
}

/**
 * @param str
 * @returns {Element}
 */
const stringToHtml = (str) => {
    const tmp     = document.createElement('div');
    tmp.innerHTML = str;
    return tmp.children.item(0);
}

/**
 * @param {string} image
 * @param {string} title
 * @param {string} subtitle
 * @returns {{root: HTMLDivElement, title: HTMLParagraphElement, subtitle: HTMLParagraphElement}}
 * @constructor
 */
export const SideMenuImage = (image, title, subtitle) => references(`
    <div class="side-menu" title="Configure ${title}">
        <div class="image-container">
            <img class="image" src="${image}" alt=""/>
        </div>
        <div class="details-container">
            <p data-ref="title" class="title">${title}</p>
            <p data-ref="subtitle" class="subtitle">${subtitle}</p>
        </div>
    </div>
`);

/**
 * @param {string} title
 * @param {string} subtitle
 * @param {string[]} backgrounds
 * @returns {{root: HTMLDivElement, title: HTMLParagraphElement, subtitle: HTMLParagraphElement}}
 * @constructor
 */
export const SideMenuBackground = (title, subtitle, backgrounds) => {
    const backgroundStyle = backgrounds.map(bg => `url('${bg}')`).join(', ');

    return references(`
        <div class="side-menu" style="background-image: ${backgroundStyle}"  title="Configure ${title}">
            <div class="details-container">
                <p data-ref="title" class="title">${title}</p>
                <p data-ref="subtitle" class="subtitle">${subtitle}</p>
            </div>
        </div>
    `);
}

/**
 * @param {string} image
 * @return {{root: HTMLDivElement, image: HTMLImageElement, obtained: HTMLSpanElement, required: HTMLSpanElement,
 *     crafted: HTMLSpanElement, needed: HTMLSpanElement}}
 * @constructor
 */
export const ItemPreview = (image) => references(`
    <div class="material-preview">
        <div class="material-icon">
            <img data-ref="image" src="${image}" />
        </div>
        <div class="material-amounts">
            <p class="description">
                <span data-ref="obtained" class="obtained" title="How many talent materials you have so far">0</span><span data-ref="crafted" class="crafted" title="How many talent materials can be crafted">+0</span>
                /
                <span data-ref="required" class="required" title="How many talent materials you'll need to upgrade your characters">0</span>
                <span class="need" title="How many talent materials you still have to obtain">(-<span data-ref="needed"></span>)</span>
            </p>
        </div>
    </div>
`);

/**
 * @param {number} value
 * @return {{root: HTMLDivElement, value: HTMLSpanElement, increment: HTMLButtonElement, decrement: HTMLDivElement}}
 * @constructor
 */
export const NumericSelectorComponent = (value) => references(`
    <div class="numeric-selector">
        <button class="button small" data-ref="increment" title="Add 1">+</button>
        <div class="numeric-value">
            <span data-ref="value">${value}</span>
        </div>
        <button class="button small" data-ref="decrement" title="Substract 1">-</button>
    </div>
`);

/**
 * @param {string} image
 * @return {{root: HTMLDivElement, image: HTMLImageElement, modifier: HTMLDivElement}}
 * @constructor
 */
export const InventorySlotModifier = (image) => references(`
    <div class="inventory-slot">
        <div class="inventory-item">
            <img alt="" src="${image}" data-ref="image"/>
        </div>
        <div class="inventory-modifier" data-ref="modifier"></div>
    </div>
`);

/**
 * @return {{root: HTMLDivElement, currentAttack: HTMLTableCellElement, currentSkill: HTMLTableCellElement,
 *     currentBurst: HTMLTableCellElement, targetAttack: HTMLTableCellElement, targetSkill: HTMLTableCellElement,
 *     targetBurst: HTMLTableCellElement, reset: HTMLButtonElement, upgradeAttack: HTMLButtonElement, upgradeSkill: HTMLButtonElement, upgradeBurst: HTMLButtonElement}}
 * @constructor
 */
export const TalentSlotModifier = () => references(`
    <div class="talents">
        <div class="row character-actions">
            <button data-ref="reset" class="button small" title="Set every values back to 1 (current & target)">Reset</button>
            <button data-ref="upgradeAttack" class="button small" title="Consume talent materials to add one level (exclude crafting)">Upgrade</button>
            <button data-ref="upgradeSkill" class="button small" title="Consume talent materials to add one level (exclude crafting)">Upgrade</button>
            <button data-ref="upgradeBurst" class="button small" title="Consume talent materials to add one level (exclude crafting)">Upgrade</button>
        </div>
        <div class="row current">
            <div class="label-container right" title="Current talent level for your character">
                <span>Current</span>
            </div>
            <div data-ref="currentAttack"></div>
            <div data-ref="currentSkill"></div>
            <div data-ref="currentBurst"></div>
        </div>
        <div class="row labels">
            <div></div>
            <div class="label-container">
                <span>Attack</span>
            </div>
            <div class="label-container">
                <span>Skill</span>
            </div>
            <div class="label-container">
                <span>Burst</span>
            </div>
        </div>
        <div class="row target">
            <div class="label-container right"  title="Target talent level for your character">
                <span>Target</span>
            </div>
            <div data-ref="targetAttack"></div>
            <div data-ref="targetSkill"></div>
            <div data-ref="targetBurst"></div>
        </div>
    </div>
`);

/**
 * @param name
 * @param obtained
 * @param crafted
 * @param required
 * @return {{root: HTMLSpanElement, obtained: HTMLSpanElement, crafted: HTMLSpanElement, required: HTMLSpanElement}}
 * @constructor
 */
export const MaterialSubtitle = (name, obtained, crafted, required) => references(`
    <span class="material-group">${name}: <span data-ref="obtained">${obtained}</span><span data-ref="crafted" class="crafted">+${crafted}</span>/<span data-ref="required" class="required">${required}</span></span>
`)

/**
 * @return {{root: HTMLDivElement, tabs: HTMLDivElement, content: HTMLDivElement}}
 * @constructor
 */
export const TabPanel = () => references(`
    <div class="tab-panel">
        <div class="tabs button-group" data-ref="tabs"></div>
        <div class="tab-content" data-ref="content"></div>
    </div>
`);

/**
 * @param {string} text
 * @return {{root: HTMLButtonElement}}
 * @constructor
 */
export const TabButton = (text) => references(`<button class="button" title="View talent materials for ${text}">${text}</button>`);
