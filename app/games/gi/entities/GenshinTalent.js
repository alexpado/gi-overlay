export default class GenshinTalent {

    /**
     * @param {string} id
     * @param {string} name
     */
    constructor(id, name) {
        this.id   = id;
        this.name = name;
    }
}

export const Talents = {
    ATTACK: new GenshinTalent('attack', 'Attack'),
    SKILL:  new GenshinTalent('skill', 'Skill'),
    BURST:  new GenshinTalent('burst', 'Burst'),
};
