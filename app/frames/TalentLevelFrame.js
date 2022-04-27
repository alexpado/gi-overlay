import NumberFrame from '../lib/presets/NumberFrame.js';

export default class TalentLevelFrame extends NumberFrame {

    /**
     * @param {'Attack'|'Skill'|'Burst'} name
     */
    constructor(name) {
        super(name, 1, 1, 10);
    }

}
