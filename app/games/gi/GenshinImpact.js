import GenshinItem from './entities/GenshinItem.js';
import GenshinCharacter from './entities/GenshinCharacter.js';
import Memory from './../../Memory.js';

/**
 * @type {Memory}
 */
export const GenshinStorage = new Memory('genshin');

/**
 * @type {{PROSPERITY: GenshinItem, GOLD: GenshinItem, PRAXIS: GenshinItem, DILIGENCE: GenshinItem, LIGHT: GenshinItem,
 *     ELEGANCE: GenshinItem, ADMONITION: GenshinItem, JUSTICE: GenshinItem, INGENUITY: GenshinItem, ORDER:
 *     GenshinItem, TRANSIENCE: GenshinItem, BALLAD: GenshinItem, FREEDOM: GenshinItem, RESISTANCE: GenshinItem,
 *     EQUITY: GenshinItem}}
 */
export const TalentMaterials = {
    // MONDSTADT
    BALLAD:     new GenshinItem('ballad', 'Ballad'),
    FREEDOM:    new GenshinItem('freedom', 'Freedom'),
    RESISTANCE: new GenshinItem('resistance', 'Resistance'),
    // LIYUE
    DILIGENCE:  new GenshinItem('diligence', 'Diligence'),
    GOLD:       new GenshinItem('gold', 'Gold'),
    PROSPERITY: new GenshinItem('prosperity', 'Prosperity'),
    // INAZUMA
    TRANSIENCE: new GenshinItem('transience', 'Transience'),
    ELEGANCE:   new GenshinItem('elegance', 'Elegance'),
    LIGHT:      new GenshinItem('light', 'Light'),
    // SUMERU
    ADMONITION: new GenshinItem('admonition', 'Admonition'),
    INGENUITY:  new GenshinItem('ingenuity', 'Ingenuity'),
    PRAXIS:     new GenshinItem('praxis', 'Praxis'),
    // FONTAINE
    EQUITY:  new GenshinItem('equity', 'Equity'),
    JUSTICE: new GenshinItem('justice', 'Justice'),
    ORDER:   new GenshinItem('order', 'Order')
};

/**
 * @type {{ALBEDO: GenshinCharacter, ROSARIA: GenshinCharacter, SHENHE: GenshinCharacter, FARUZAN: GenshinCharacter,
 *     TARTAGLIA: GenshinCharacter, EULA: GenshinCharacter, FISCHL: GenshinCharacter, BEIDOU: GenshinCharacter, JEAN:
 *     GenshinCharacter, RAZOR: GenshinCharacter, TIGHNARI: GenshinCharacter, LYNEY: GenshinCharacter, RAIDEN:
 *     GenshinCharacter, ALHAITHAM: GenshinCharacter, QIQI: GenshinCharacter, YOIMIYA: GenshinCharacter, KOKOMI:
 *     GenshinCharacter, ZHONGLI: GenshinCharacter, HEIZOU: GenshinCharacter, AYAKA: GenshinCharacter, DORI:
 *     GenshinCharacter, CYNO: GenshinCharacter, LISA: GenshinCharacter, XINGQIU: GenshinCharacter, NOELLE:
 *     GenshinCharacter, LAYLA: GenshinCharacter, NINGGUANG: GenshinCharacter, YAOYAO: GenshinCharacter, YAE:
 *     GenshinCharacter, NAHIDA: GenshinCharacter, COLLEI: GenshinCharacter, SHINOBU: GenshinCharacter, ITTO:
 *     GenshinCharacter, KEQING: GenshinCharacter, KAEYA: GenshinCharacter, XIANGLING: GenshinCharacter, BARBARA:
 *     GenshinCharacter, ALOY: GenshinCharacter, HUTAO: GenshinCharacter, SAYU: GenshinCharacter, YUNJIN:
 *     GenshinCharacter, DILUC: GenshinCharacter, MIKA: GenshinCharacter, GANYU: GenshinCharacter, CANDACE:
 *     GenshinCharacter, KIRARA: GenshinCharacter, SARA: GenshinCharacter, KAVEH: GenshinCharacter, GOROU:
 *     GenshinCharacter, KLEE: GenshinCharacter, CHONGYUN: GenshinCharacter, LYNETTE: GenshinCharacter, VENTI:
 *     GenshinCharacter, BAIZHU: GenshinCharacter, BENNETT: GenshinCharacter, YELAN: GenshinCharacter, THOMA:
 *     GenshinCharacter, WANDERER: GenshinCharacter, DEHYA: GenshinCharacter, MONA: GenshinCharacter, KAZUHA:
 *     GenshinCharacter, YANFEI: GenshinCharacter, AMBER: GenshinCharacter, XIAO: GenshinCharacter, SUCROSE:
 *     GenshinCharacter, AYATO: GenshinCharacter, NILOU: GenshinCharacter, XINYAN: GenshinCharacter, DIONA:
 *     GenshinCharacter}}
 */
export const Characters = {
    AMBER:     new GenshinCharacter('amber', TalentMaterials.FREEDOM, 'Amber'),
    ALBEDO:    new GenshinCharacter('albedo', TalentMaterials.BALLAD, 'Albedo'),
    ALHAITHAM: new GenshinCharacter('alhaitham', TalentMaterials.INGENUITY, 'Alhaitham'),
    ALOY:      new GenshinCharacter('aloy', TalentMaterials.FREEDOM, 'Aloy'),
    AYAKA:     new GenshinCharacter('ayaka', TalentMaterials.ELEGANCE, 'Kamisato Ayaka'),
    AYATO:     new GenshinCharacter('ayato', TalentMaterials.ELEGANCE, 'Kamisato Ayato'),
    BAIZHU:    new GenshinCharacter('baizhu', TalentMaterials.GOLD, 'Baizhu'),
    BARBARA:   new GenshinCharacter('barbara', TalentMaterials.FREEDOM, 'Barbara'),
    BEIDOU:    new GenshinCharacter('beidou', TalentMaterials.GOLD, 'Beidou'),
    BENNETT:   new GenshinCharacter('bennett', TalentMaterials.RESISTANCE, 'Bennett'),
    CANDACE:   new GenshinCharacter('candace', TalentMaterials.ADMONITION, 'Candace'),
    CHONGYUN:  new GenshinCharacter('chongyun', TalentMaterials.DILIGENCE, 'Chongyun'),
    COLLEI:    new GenshinCharacter('collei', TalentMaterials.PRAXIS, 'Collei'),
    CYNO:      new GenshinCharacter('cyno', TalentMaterials.ADMONITION, 'Cyno'),
    DEHYA:     new GenshinCharacter('dehya', TalentMaterials.PRAXIS, 'Dehya'),
    DILUC:     new GenshinCharacter('diluc', TalentMaterials.RESISTANCE, 'Diluc'),
    DIONA:     new GenshinCharacter('diona', TalentMaterials.FREEDOM, 'Diona'),
    DORI:      new GenshinCharacter('dori', TalentMaterials.INGENUITY, 'Dori'),
    EULA:      new GenshinCharacter('eula', TalentMaterials.RESISTANCE, 'Eula'),
    FARUZAN:   new GenshinCharacter('faruzan', TalentMaterials.ADMONITION, 'Faruzan'),
    FISCHL:    new GenshinCharacter('fischl', TalentMaterials.BALLAD, 'Fischl'),
    GANYU:     new GenshinCharacter('ganyu', TalentMaterials.DILIGENCE, 'Ganyu'),
    GOROU:     new GenshinCharacter('gorou', TalentMaterials.LIGHT, 'Gorou'),
    HEIZOU:    new GenshinCharacter('heizou', TalentMaterials.TRANSIENCE, 'Shikanoin Heizou'),
    HUTAO:     new GenshinCharacter('hutao', TalentMaterials.DILIGENCE, 'Hu Tao'),
    ITTO:      new GenshinCharacter('itto', TalentMaterials.ELEGANCE, 'Arataki Itto'),
    JEAN:      new GenshinCharacter('jean', TalentMaterials.RESISTANCE, 'Jean'),
    KAEYA:     new GenshinCharacter('kaeya', TalentMaterials.BALLAD, 'Kaeya'),
    KAVEH:     new GenshinCharacter('kaveh', TalentMaterials.INGENUITY, 'Kaveh'),
    KAZUHA:    new GenshinCharacter('kazuha', TalentMaterials.DILIGENCE, 'Kazuha'),
    KEQING:    new GenshinCharacter('keqing', TalentMaterials.PROSPERITY, 'Keqing'),
    KIRARA:    new GenshinCharacter('kirara', TalentMaterials.TRANSIENCE, 'Kirara'),
    KLEE:      new GenshinCharacter('klee', TalentMaterials.FREEDOM, 'Klee'),
    KOKOMI:    new GenshinCharacter('kokomi', TalentMaterials.TRANSIENCE, 'Sangonomiya Kokomi'),
    LAYLA:     new GenshinCharacter('layla', TalentMaterials.INGENUITY, 'Layla'),
    LISA:      new GenshinCharacter('lisa', TalentMaterials.BALLAD, 'Lisa'),
    LYNETTE:   new GenshinCharacter('lynette', TalentMaterials.ORDER, 'Lynette'),
    LYNEY:     new GenshinCharacter('lyney', TalentMaterials.EQUITY, 'Lyney'),
    MIKA:      new GenshinCharacter('mika', TalentMaterials.BALLAD, 'Mika'),
    MONA:      new GenshinCharacter('mona', TalentMaterials.RESISTANCE, 'Mona'),
    NAHIDA:    new GenshinCharacter('nahida', TalentMaterials.INGENUITY, 'Nahida'),
    NILOU:     new GenshinCharacter('nilou', TalentMaterials.PRAXIS, 'Nilou'),
    NINGGUANG: new GenshinCharacter('ningguang', TalentMaterials.PROSPERITY, 'Ningguang'),
    NOELLE:    new GenshinCharacter('noelle', TalentMaterials.RESISTANCE, 'Noelle'),
    QIQI:      new GenshinCharacter('qiqi', TalentMaterials.PROSPERITY, 'Qiqi'),
    RAIDEN:    new GenshinCharacter('raiden', TalentMaterials.LIGHT, 'Shogun Raiden'),
    RAZOR:     new GenshinCharacter('razor', TalentMaterials.RESISTANCE, 'Razor'),
    ROSARIA:   new GenshinCharacter('rosaria', TalentMaterials.BALLAD, 'Rosaria'),
    SARA:      new GenshinCharacter('sara', TalentMaterials.ELEGANCE, 'Kujou Sara'),
    SAYU:      new GenshinCharacter('sayu', TalentMaterials.LIGHT, 'Sayu'),
    SHENHE:    new GenshinCharacter('shenhe', TalentMaterials.PROSPERITY, 'Shenhe'),
    SHINOBU:   new GenshinCharacter('shinobu', TalentMaterials.ELEGANCE, 'Kuki Shinobu'),
    SUCROSE:   new GenshinCharacter('sucrose', TalentMaterials.FREEDOM, 'Sucrose'),
    TARTAGLIA: new GenshinCharacter('tartaglia', TalentMaterials.FREEDOM, 'Tartaglia'),
    THOMA:     new GenshinCharacter('thoma', TalentMaterials.TRANSIENCE, 'Thoma'),
    TIGHNARI:  new GenshinCharacter('tighnari', TalentMaterials.ADMONITION, 'Tighnari'),
    VENTI:     new GenshinCharacter('venti', TalentMaterials.BALLAD, 'Venti'),
    WANDERER:  new GenshinCharacter('wanderer', TalentMaterials.PRAXIS, 'Wanderer'),
    XIANGLING: new GenshinCharacter('xiangling', TalentMaterials.DILIGENCE, 'Xiangling'),
    XIAO:      new GenshinCharacter('xiao', TalentMaterials.PROSPERITY, 'Xiao'),
    XINGQIU:   new GenshinCharacter('xingqiu', TalentMaterials.GOLD, 'Xingqiu'),
    XINYAN:    new GenshinCharacter('xinyan', TalentMaterials.GOLD, 'Xinyan'),
    YAE:       new GenshinCharacter('yae', TalentMaterials.LIGHT, 'Yae Miko'),
    YELAN:     new GenshinCharacter('yelan', TalentMaterials.PROSPERITY, 'Yelan'),
    YANFEI:    new GenshinCharacter('yanfei', TalentMaterials.GOLD, 'Yanfei'),
    YAOYAO:    new GenshinCharacter('yaoyao', TalentMaterials.DILIGENCE, 'Yaoyao'),
    YOIMIYA:   new GenshinCharacter('yoimiya', TalentMaterials.TRANSIENCE, 'Yoimiya'),
    YUNJIN:    new GenshinCharacter('yunjin', TalentMaterials.DILIGENCE, 'Yun Jin'),
    ZHONGLI:   new GenshinCharacter('zhongli', TalentMaterials.GOLD, 'Zhongli'),
};

/**
 * @type {{zone3: GenshinItem[], zone2: GenshinItem[], zone1: GenshinItem[]}}
 */
export const MaterialDay = {
    zone1: [
        TalentMaterials.FREEDOM,
        TalentMaterials.PROSPERITY,
        TalentMaterials.TRANSIENCE,
        TalentMaterials.ADMONITION,
        TalentMaterials.EQUITY
    ],
    zone2: [
        TalentMaterials.RESISTANCE,
        TalentMaterials.DILIGENCE,
        TalentMaterials.ELEGANCE,
        TalentMaterials.INGENUITY,
        TalentMaterials.JUSTICE
    ],
    zone3: [
        TalentMaterials.BALLAD,
        TalentMaterials.GOLD,
        TalentMaterials.LIGHT,
        TalentMaterials.PRAXIS,
        TalentMaterials.ORDER
    ]
}

/**
 * @type {{sunday: GenshinItem[], saturday: GenshinItem[], tuesday: GenshinItem[], wednesday: GenshinItem[], thursday:
 *     GenshinItem[], friday: GenshinItem[], monday: GenshinItem[]}}
 */
export const Days = {
    monday:    [...MaterialDay.zone1],
    tuesday:   [...MaterialDay.zone2],
    wednesday: [...MaterialDay.zone3],
    thursday:  [...MaterialDay.zone1],
    friday:    [...MaterialDay.zone2],
    saturday:  [...MaterialDay.zone3],
    sunday:    [...MaterialDay.zone1, ...MaterialDay.zone2, ...MaterialDay.zone3],
};


(() => {
    Object.keys(Characters).forEach(key => {
        Characters[key].refreshRequirements();
        Characters[key].render();
    })
    Object.keys(TalentMaterials).forEach(key => {
        TalentMaterials[key].render();
    })
})();
