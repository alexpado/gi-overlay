import Storage from '../Storage.js';

export default class TalentMaterial {

    /**
     * @param {string} id
     * @param {"mondstadt"|"liyue"|"inazuma"|"sumeru"} region
     */
    constructor(id, region) {
        this.id     = id;
        this.region = region;
    }

    /**
     * @param {"teachings"|"guide"|"philosophies"} type
     */
    getAmountInInventory(type) {
        return Storage.getTalentMaterialAmount(this, type);
    }

    /**
     * @param {"teachings"|"guide"|"philosophies"} type
     * @param {number} amount
     */
    setAmountInInventory(type, amount) {

        Storage.setTalentMaterialAmount(this, type, amount);
    }

    /**
     * @param {"teachings"|"guide"|"philosophies"} type
     * @return {string}
     */
    asTextureUrl(type) {
        return `/img/talents/${this.region}/${this.id}/${type}.webp`;
    }
}

export const TalentMaterials = {
    BALLAD:     new TalentMaterial('ballad', 'mondstadt'),
    FREEDOM:    new TalentMaterial('freedom', 'mondstadt'),
    RESISTANCE: new TalentMaterial('resistance', 'mondstadt'),
    DILIGENCE:  new TalentMaterial('diligence', 'liyue'),
    GOLD:       new TalentMaterial('gold', 'liyue'),
    PROSPERITY: new TalentMaterial('prosperity', 'liyue'),
    TRANSIENCE: new TalentMaterial('transience', 'inazuma'),
    ELEGANCE:   new TalentMaterial('elegance', 'inazuma'),
    LIGHT:      new TalentMaterial('light', 'inazuma'),
    ADMONITION: new TalentMaterial('admonition', 'sumeru'),
    INGENUITY:  new TalentMaterial('ingenuity', 'sumeru'),
    PRAXIS:     new TalentMaterial('praxis', 'sumeru'),
};
