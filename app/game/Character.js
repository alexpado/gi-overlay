import {TalentMaterials} from './TalentMaterial.js';
import Storage           from '../Storage.js';

export default class Character {

    /**
     * @param {string} id
     * @param {string} name
     * @param {TalentMaterial} talentMaterial
     */
    constructor(id, talentMaterial, name) {

        this.id             = id;
        this.talentMaterial = talentMaterial;
        this.name           = name;
    }

    /**
     * @param {Talent} talent
     * @return {number}
     */
    getCurrentLevel(talent) {
        return Storage.getCharacterTalentCurrentLevel(this, talent);
    }

    /**
     * @param {Talent} talent
     * @return {number}
     */
    getTargetLevel(talent) {
        return Storage.getCharacterTalentTargetLevel(this, talent);
    }

    /**
     * @param {Talent} talent
     * @param {number} level
     */
    setCurrentLevel(talent, level) {

        Storage.setCharacterTalentCurrentLevel(this, talent, level);
    }

    /**
     * @param {Talent} talent
     * @param {number} level
     */
    setTargetLevel(talent, level) {

        Storage.setCharacterTalentCurrentLevel(this, talent, level);
    }

    /**
     * @return {string}
     */
    getImageUrl() {
        return `img/character/${this.id}.png`;
    }

}

export const Characters = {
    AMBER:     new Character('amber', TalentMaterials.FREEDOM, 'Amber'),
    ALBEDO:    new Character('albedo', TalentMaterials.BALLAD, 'Albedo'),
    ALHAITHAM: new Character('alhaitham', TalentMaterials.INGENUITY, 'Alhaitham'),
    ALOY:      new Character('aloy', TalentMaterials.FREEDOM, 'Aloy'),
    AYAKA:     new Character('ayaka', TalentMaterials.ELEGANCE, 'Kamisato Ayaka'),
    AYATO:     new Character('ayato', TalentMaterials.ELEGANCE, 'Kamisato Ayato'),
    BAIZHU:    new Character('baizhu', TalentMaterials.GOLD, 'Baizhu'),
    BARBARA:   new Character('barbara', TalentMaterials.FREEDOM, 'Barbara'),
    BEIDOU:    new Character('beidou', TalentMaterials.GOLD, 'Beidou'),
    BENNETT:   new Character('bennett', TalentMaterials.RESISTANCE, 'Bennett'),
    CANDACE:   new Character('candace', TalentMaterials.ADMONITION, 'Candace'),
    CHONGYUN:  new Character('chongyun', TalentMaterials.DILIGENCE, 'Chongyun'),
    COLLEI:    new Character('collei', TalentMaterials.PRAXIS, 'Collei'),
    CYNO:      new Character('cyno', TalentMaterials.ADMONITION, 'Cyno'),
    DEHYA:     new Character('dehya', TalentMaterials.PRAXIS, 'Dehya'),
    DILUC:     new Character('diluc', TalentMaterials.RESISTANCE, 'Diluc'),
    DIONA:     new Character('diona', TalentMaterials.FREEDOM, 'Diona'),
    DORI:      new Character('dori', TalentMaterials.INGENUITY, 'Dori'),
    EULA:      new Character('eula', TalentMaterials.RESISTANCE, 'Eula'),
    FARUZAN:   new Character('faruzan', TalentMaterials.ADMONITION, 'Faruzan'),
    FISCHL:    new Character('fischl', TalentMaterials.BALLAD, 'Fischl'),
    GANYU:     new Character('ganyu', TalentMaterials.DILIGENCE, 'Ganyu'),
    GOROU:     new Character('gorou', TalentMaterials.LIGHT, 'Gorou'),
    HEIZOU:    new Character('heizou', TalentMaterials.TRANSIENCE, 'Shikanoin Heizou'),
    HUTAO:     new Character('hutao', TalentMaterials.DILIGENCE, 'Hu Tao'),
    ITTO:      new Character('itto', TalentMaterials.ELEGANCE, 'Arataki Itto'),
    JEAN:      new Character('jean', TalentMaterials.RESISTANCE, 'Jean'),
    KAEYA:     new Character('kaeya', TalentMaterials.BALLAD, 'Kaeya'),
    KAZUHA:    new Character('kazuha', TalentMaterials.DILIGENCE, 'Kazuha'),
    KEQING:    new Character('keqing', TalentMaterials.PROSPERITY, 'Keqing'),
    KLEE:      new Character('klee', TalentMaterials.FREEDOM, 'Klee'),
    KOKOMI:    new Character('kokomi', TalentMaterials.TRANSIENCE, 'Sangonomiya Kokomi'),
    LAYLA:     new Character('layla', TalentMaterials.INGENUITY, 'Layla'),
    LISA:      new Character('lisa', TalentMaterials.BALLAD, 'Lisa'),
    MIKA:      new Character('mika', TalentMaterials.BALLAD, 'Mika'),
    MONA:      new Character('mona', TalentMaterials.RESISTANCE, 'Mona'),
    NAHIDA:    new Character('nahida', TalentMaterials.INGENUITY, 'Nahida'),
    NILOU:     new Character('nilou', TalentMaterials.PRAXIS, 'Nilou'),
    NINGGUANG: new Character('ningguang', TalentMaterials.PROSPERITY, 'Ningguang'),
    NOELLE:    new Character('noelle', TalentMaterials.RESISTANCE, 'Noelle'),
    QIQI:      new Character('qiqi', TalentMaterials.PROSPERITY, 'Qiqi'),
    RAIDEN:    new Character('raiden', TalentMaterials.LIGHT, 'Shogun Raiden'),
    RAZOR:     new Character('razor', TalentMaterials.RESISTANCE, 'Razor'),
    ROSARIA:   new Character('rosaria', TalentMaterials.BALLAD, 'Rosaria'),
    SARA:      new Character('sara', TalentMaterials.ELEGANCE, 'Kujou Sara'),
    SAYU:      new Character('sayu', TalentMaterials.LIGHT, 'Sayu'),
    SHENHE:    new Character('shenhe', TalentMaterials.PROSPERITY, 'Shenhe'),
    SHINOBU:   new Character('shinobu', TalentMaterials.ELEGANCE, 'Kuki Shinobu'),
    SUCROSE:   new Character('sucrose', TalentMaterials.FREEDOM, 'Sucrose'),
    TARTAGLIA: new Character('tartaglia', TalentMaterials.FREEDOM, 'Tartaglia'),
    THOMA:     new Character('thoma', TalentMaterials.TRANSIENCE, 'Thoma'),
    TIGHNARI:  new Character('tighnari', TalentMaterials.ADMONITION, 'Tighnari'),
    VENTI:     new Character('venti', TalentMaterials.BALLAD, 'Venti'),
    WANDERER:  new Character('wanderer', TalentMaterials.PRAXIS, 'Wanderer'),
    XIANGLING: new Character('xiangling', TalentMaterials.DILIGENCE, 'Xiangling'),
    XIAO:      new Character('xiao', TalentMaterials.PROSPERITY, 'Xiao'),
    XINGQIU:   new Character('xingqiu', TalentMaterials.GOLD, 'Xingqiu'),
    XINYAN:    new Character('xinyan', TalentMaterials.GOLD, 'Xinyan'),
    YAE:       new Character('yae', TalentMaterials.LIGHT, 'Yae Miko'),
    YELAN:     new Character('yelan', TalentMaterials.PROSPERITY, 'Yelan'),
    YANFEI:    new Character('yanfei', TalentMaterials.GOLD, 'Yanfei'),
    YAOYAO:    new Character('yaoyao', TalentMaterials.DILIGENCE, 'Yaoyao'),
    YOIMIYA:   new Character('yoimiya', TalentMaterials.TRANSIENCE, 'Yoimiya'),
    YUNJIN:    new Character('yunjin', TalentMaterials.DILIGENCE, 'Yun Jin'),
    ZHONGLI:   new Character('zhongli', TalentMaterials.GOLD, 'Zhongli'),
};
