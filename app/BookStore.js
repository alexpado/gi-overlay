import {BookType, TalentType} from './Enums.js';

export default class BookStore {

    constructor(application) {
        this.application = application;
        this.data        = [
            {
                bronze: 3,
                silver: 0,
                gold:   0,
            },
            {
                bronze: 0,
                silver: 2,
                gold:   0,
            },
            {
                bronze: 0,
                silver: 4,
                gold:   0,
            },
            {
                bronze: 0,
                silver: 6,
                gold:   0,
            },
            {
                bronze: 0,
                silver: 9,
                gold:   0,
            },
            {
                bronze: 0,
                silver: 0,
                gold:   4,
            },
            {
                bronze: 0,
                silver: 0,
                gold:   6,
            },
            {
                bronze: 0,
                silver: 0,
                gold:   12,
            },
            {
                bronze: 0,
                silver: 0,
                gold:   16,
            },
        ];
        this.talents     = {
            attack: {
                from: 1,
                to:   1,
            },
            skill:  {
                from: 1,
                to:   1,
            },
            burst:  {
                from: 1,
                to:   1,
            },
        };
        this.possession  = {
            bronze: 0,
            silver: 0,
            gold:   0,
        };
        this.required    = {
            bronze: 0,
            silver: 0,
            gold:   0,
        };
        this.craftable   = {
            bronze: 0,
            silver: 0,
            gold:   0,
        };
    }

    refreshTalents() {
        this.talents.attack.from = this.application.getStorage().getCurrentTalentLevel(TalentType.ATTACK, 1);
        this.talents.attack.to   = this.application.getStorage().getTargetTalentLevel(TalentType.ATTACK, 1);
        this.talents.skill.from  = this.application.getStorage().getCurrentTalentLevel(TalentType.SKILL, 1);
        this.talents.skill.to    = this.application.getStorage().getTargetTalentLevel(TalentType.SKILL, 1);
        this.talents.burst.from  = this.application.getStorage().getCurrentTalentLevel(TalentType.BURST, 1);
        this.talents.burst.to    = this.application.getStorage().getTargetTalentLevel(TalentType.BURST, 1);
    }

    refreshRequirement() {
        const attack = this.getNeededBook(this.talents.attack.from, this.talents.attack.to);
        const skill  = this.getNeededBook(this.talents.skill.from, this.talents.skill.to);
        const burst  = this.getNeededBook(this.talents.burst.from, this.talents.burst.to);

        this.required.bronze = attack.bronze + skill.bronze + burst.bronze;
        this.required.silver = attack.silver + skill.silver + burst.silver;
        this.required.gold   = attack.gold + skill.gold + burst.gold;
    }

    refreshPossession() {
        this.possession.bronze = this.application.getStorage().getBookAmount(BookType.BRONZE, 0);
        this.possession.silver = this.application.getStorage().getBookAmount(BookType.SILVER, 0);
        this.possession.gold   = this.application.getStorage().getBookAmount(BookType.GOLD, 0);
    }

    doCraftOn(bookType) {

        const leftOver = (this.possession[bookType] + this.craftable[bookType]) - this.required[bookType];

        if (leftOver > 0) {
            const craftedAmount = Math.floor(leftOver / 3);

            switch (bookType) {
                case 'bronze':
                    this.craftable.silver = craftedAmount;
                    break;
                case 'silver':
                    this.craftable.gold = craftedAmount;
                    break;
            }
        }
    }

    refresh() {
        this.refreshTalents();
        this.refreshRequirement();
        this.refreshPossession();
        this.doCraftOn('bronze');
        this.doCraftOn('silver');
    }

    getNeededBook(from, to) {
        const idxStart = from - 1;
        const idxEnd   = to - 1;

        const result = {
            bronze: 0,
            silver: 0,
            gold:   0,
        };

        for (let i = idxStart; i < idxEnd; i++) {
            const idxData = this.data[i];
            result.bronze = result.bronze + idxData.bronze;
            result.silver = result.silver + idxData.silver;
            result.gold   = result.gold + idxData.gold;
        }
        return result;
    }

}
