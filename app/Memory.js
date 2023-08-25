export default class Memory {

    /**
     * @param {string} dataSource
     */
    constructor(dataSource) {

        this.dataSource = dataSource;
        this.read();
    }

    /**
     * @param {any} source
     * @param {string[]} path
     * @param {any=} defaultValue
     * @private
     */
    readMemory(source, path, defaultValue) {
        if (path.length === 1) {
            return source[path[0]] ?? defaultValue;
        } else {
            if (!!!source[path[0]]) {
                source[path[0]] = {};
            }
            return this.readMemory(source[path[0]], path.slice(1), defaultValue);
        }
    }

    /**
     * @param source
     * @param path
     * @param value
     * @private
     */
    writeMemory(source, path, value) {
        if (path.length === 1) {
            source[path[0]] = value;
            this.write();
        } else {
            if (!!!source[path[0]]) {
                source[path[0]] = {};
            }
            this.writeMemory(source[path[0]], path.slice(1), value);
        }
    }

    /**
     * Read the data from the localStorage content
     */
    read() {
        this.memory = JSON.parse(localStorage.getItem(this.dataSource) ?? '{}');
    }

    /**
     * Submit this storage data to the localStorage.
     */
    write() {
        localStorage.setItem(this.dataSource, JSON.stringify(this.memory));
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

        const path = key.split('.');
        this.writeMemory(this.memory, path, value);
        this.write();
    }

    /**
     * Retrieve the raw value for the provided key.
     * @param {string} key
     * @param {*} defaultValue
     * @return {*}
     */
    getRaw(key, defaultValue) {
        const path = key.split('.');
        return this.readMemory(this.memory, path, defaultValue);
    }

    /**
     * Retrieve the current level of the requested talent for the given character.
     *
     * @param {GenshinCharacter} character
     * @param {GenshinTalent} talent
     * @return {number}
     */
    getCharacterTalentCurrentLevel(character, talent) {

        return this.getRaw(`talent.${character.id}.current.${talent.id}`, 1);
    }

    /**
     * Retrieve the target level of the requested talent for the given character.
     *
     * @param {GenshinCharacter} character
     * @param {GenshinTalent} talent
     * @return {number}
     */
    getCharacterTalentTargetLevel(character, talent) {

        return this.getRaw(`talent.${character.id}.target.${talent.id}`, 1);
    }

    /**
     * Define the current level of the requested talent for the given character.
     *
     * @param {GenshinCharacter} character
     * @param {GenshinTalent} talent
     * @param {number} level
     */
    setCharacterTalentCurrentLevel(character, talent, level) {

        this.setRaw(`talent.${character.id}.current.${talent.id}`, level);
    }

    /**
     * Retrieve the target level of the requested talent for the given character.
     *
     * @param {GenshinCharacter} character
     * @param {GenshinTalent} talent
     * @param {number} level
     */
    setCharacterTalentTargetLevel(character, talent, level) {

        this.setRaw(`talent.${character.id}.target.${talent.id}`, level);
    }

    /**
     * @param {GenshinItem} material
     * @param {"teachings"|"guide"|"philosophies"} type
     * @param {number} amount
     */
    setTalentMaterialAmount(material, type, amount) {
        this.setRaw(`inventory.talents.${material.id}.${type}`, amount);
    }

    /**
     * @param {GenshinItem} material
     * @param {"teachings"|"guide"|"philosophies"} type
     */
    getTalentMaterialAmount(material, type) {

        return this.getRaw(`inventory.talents.${material.id}.${type}`, 0);
    }
}
