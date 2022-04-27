/**
 *
 * @param {string} str
 * @returns {Element}
 */
export const create = (str) => {
    const [tag, ...classes] = str.split('.');
    const el = document.createElement(tag);
    classes.forEach(cls => el.classList.add(cls));
    return el;
}
