class Storage {
    constructor() {

        this.read();
    }

    /**
     * Read the data from the localStorage content
     */
    read() {
        this.memory = JSON.parse(localStorage.getItem('memory') ?? '{}');
    }

    /**
     * Submit this storage data to the localStorage.
     */
    write() {
        localStorage.setItem('memory', JSON.stringify(this.memory));
    }

    /**
     * Remove all saved data and submit it to the localStorage.
     */
    reset() {
        this.memory = {};
        this.write();
    }

    /**
     * Define the raw value for the provided key.
     * @param {string} key
     * @param {*} value
     */
    setRaw(key, value) {
        _.set(this.memory, key, value);
        this.write();
    }

    /**
     * Retrieve the raw value for the provided key.
     * @param {string} key
     * @param {*} defaultValue
     * @return {*}
     */
    getRaw(key, defaultValue) {
        return _.get(this.memory, key, defaultValue);
    }

    /**
     * Retrieve the current level of the requested talent for the given character.
     *
     * @param {Character} character
     * @param {Talent} talent
     * @return {number}
     */
    getCharacterTalentCurrentLevel(character, talent) {

        return this.getRaw(`talent.${character.id}.current.${talent.id}`, 1);
    }

    /**
     * Retrieve the target level of the requested talent for the given character.
     *
     * @param {Character} character
     * @param {Talent} talent
     * @return {number}
     */
    getCharacterTalentTargetLevel(character, talent) {

        return this.getRaw(`talent.${character.id}.target.${talent.id}`, 1);
    }

    /**
     * Define the current level of the requested talent for the given character.
     *
     * @param {Character} character
     * @param {Talent} talent
     * @param {number} level
     */
    setCharacterTalentCurrentLevel(character, talent, level) {

        this.setRaw(`talent.${character.id}.current.${talent.id}`, level);
    }

    /**
     * Retrieve the target level of the requested talent for the given character.
     *
     * @param {Character} character
     * @param {Talent} talent
     * @param {number} level
     */
    setCharacterTalentTargetLevel(character, talent, level) {

        this.setRaw(`talent.${character.id}.target.${talent.id}`, level);
    }

    /**
     * @param {TalentMaterial} material
     * @param {"teachings"|"guide"|"philosophies"} type
     * @param {number} amount
     */
    setTalentMaterialAmount(material, type, amount) {
        this.setRaw(`inventory.talents.${material.id}.${type}`, amount);
    }

    /**
     * @param {TalentMaterial} material
     * @param {"teachings"|"guide"|"philosophies"} type
     */
    getTalentMaterialAmount(material, type) {

        return this.getRaw(`inventory.talents.${material.id}.${type}`, 0);
    }
}

export default new Storage();
