export default class Talent {

    /**
     * @param {string} id
     * @param {string} name
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export const Talents = {
    ATTACK: new Talent('attack', 'Attack'),
    SKILL: new Talent('skill', 'Skill'),
    BURST: new Talent('burst', 'Burst')
}
