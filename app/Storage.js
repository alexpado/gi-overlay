export default class Storage {

    erase() {
        this.setCurrentTalentLevel('Attack', 1);
        this.setCurrentTalentLevel('Skill', 1);
        this.setCurrentTalentLevel('Burst', 1);
        this.setTargetTalentLevel('Attack', 1);
        this.setTargetTalentLevel('Skill', 1);
        this.setTargetTalentLevel('Burst', 1);
        this.setBookAmount('bronze', 0);
        this.setBookAmount('silver', 0);
        this.setBookAmount('gold', 0);
    }

    read(key, def) {
        return localStorage.getItem(key.toLowerCase()) ?? def;
    }

    write(key, value) {
        localStorage.setItem(key.toLowerCase(), value);
    }

    /**
     * @param {'Attack'|'Skill'|'Burst'} talent
     * @param {number} value
     */
    setCurrentTalentLevel(talent, value) {
        this.write(`talent.${talent}.current`, `${value}`);
    }

    /**
     * @param {'Attack'|'Skill'|'Burst'} talent
     * @param {number} value
     */
    setTargetTalentLevel(talent, value) {
        this.write(`talent.${talent}.target`, `${value}`);
    }

    /**
     * @param {'bronze'|'silver'|'gold'} bookType
     * @param {number} value
     */
    setBookAmount(bookType, value) {
        this.write(`book.${bookType}`, `${value}`);
    }

    /**
     * @param {'Attack'|'Skill'|'Burst'} talent
     * @param {number} def
     * @returns {number}
     */
    getCurrentTalentLevel(talent, def) {
        return parseInt(this.read(`talent.${talent}.current`, def));
    }

    /**
     * @param {'Attack'|'Skill'|'Burst'} talent
     * @param {number} def
     * @returns {number}
     */
    getTargetTalentLevel(talent, def) {
        return parseInt(this.read(`talent.${talent}.target`, def));
    }

    /**
     * @param {'bronze'|'silver'|'gold'} bookType
     * @param {number} def
     * @returns {number}
     */
    getBookAmount(bookType, def) {
        return parseInt(this.read(`book.${bookType}`, def));
    }

}
