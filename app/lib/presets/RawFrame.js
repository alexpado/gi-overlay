import Frame    from '../Frame.js';
import {create} from '../../HTML.js';

export default class RawFrame extends Frame {

    /**
     * @param {string} name
     * @param {string} content
     */
    constructor(name, content) {
        super(create('div.frame.html'));

        this.nameContainer  = create('div.small');
        this.contentContainer = create('div.big');

        this.name  = name;
        this.content = content;

        this.getComponent().appendChild(this.contentContainer);
        this.getComponent().appendChild(this.nameContainer);
    }

    /**
     * @param {string} name
     */
    set name(name) {
        this.nameContainer.innerHTML = `${name}`;
    }

    /**
     * @param {string} content
     */
    set content(content) {
        this.contentContainer.innerHTML = `${content}`;
    }

}
