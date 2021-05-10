import {type} from './../cards';
import Event from './../Event';

export default class Character {
    hp = 0;
    cp = 0;
    diceTypes = [];
    die = [];
    attacks = [];
    specialCards = [];

    constructor(baseHP, baseCP, diceTypes, die) {
        this.hp = baseHP;
        this.cp = baseCP;
        this.rolls = 0;
        this.maxRolls = 3;
        this.statusEffects = [];
        this.diceTypes = diceTypes;
        this.die = die;

        this.discard = [];

        this.hand = [];

        this.dice = [
            {result: this.die[0], locked: false},
            {result: this.die[0], locked: false},
            {result: this.die[0], locked: false},
            {result: this.die[0], locked: false},
            {result: this.die[0], locked: false},
        ];
    }

    shuffleDeck = () => {
        let i = this.deck.length;
        let temp;
        let rand;

        // While there remain cards to shuffle…
        while(i) {
            // Pick a remaining card
            rand = Math.floor(Math.random() * i--);

            // And swap it with the current card.
            temp = this.deck[i];
            this.deck[i] = this.deck[rand];
            this.deck[rand] = temp;
        }

        return;
    }

    drawCard = () => {
        let card = this.deck.splice(0, 1);
        this.hand.push(card[0]);

        if(this.deck.length === 0) {
            this.deck = this.discard;
            this.discard = [];
            this.shuffleDeck();
        }

        return;
    }

    discardCard = (name) => {
        let handIndex = this.hand.findIndex((c) => c.name === name);
        let removedCard = this.hand.splice(handIndex, 1);
        if(!(removedCard[0].type === type.UPGRADE)) this.discard.push(...removedCard);
    }

    getIncome = () => {
        this.cp++;
        this.drawCard();
    }

    rollDie = (dieNum) => {
        if(!this.dice[dieNum].locked) this.dice[dieNum].result = this.die[Math.floor(Math.random() * 6)];
        return this.dice[dieNum].result;
    }

    rollDice = () => {
        if(this.rolls === this.maxRolls) return;
        
        this.dice.map((d, index) => {
            return this.rollDie(index);
        });
        this.rolls++;
    }

    getNewDice = (num = 5) => {
        this.dice = [];
        for(let i = 0; i < num; i++){
            this.dice.push({result: this.die[0], locked: false});
        }
    }

    lockDie = (dieNum) => {
        this.dice[dieNum].locked = true;
    }

    unlockDie = (dieNum) => {
        this.dice[dieNum].locked = false;
    }

    getRollVals = () => {
        let rollTypes = [];
        for(let i = 0; i < this.diceTypes.length; i++){
            rollTypes[i] = 0;
        }

        let rollNums = [];
        for(let i = 0; i < 6; i++){
            rollNums[i] = 0;
        }

        //Find the number of each type rolled and put the count in an array corresponding to the diceTypes array
        this.dice.map((d, index) => {
            rollTypes[this.diceTypes.indexOf(d.result.type)]++;
            rollNums[d.result.value - 1]++;
            return;
        });

        return {types: rollTypes, nums: rollNums};
    }

    findMaxStraight = (nums) => {
        let max = 0;
        let straight = 0;
        for(let i = 0; i < nums.length; i++){
            if(nums[i] > 0){
                straight++;
                if(straight > max) max = straight;
            }else{
                straight = 0;
            }
        }
        return max;
    }

    findMaxSame = (nums) => {
        let max = 0;
        for(let i = 0; i < nums.length; i++){
            if(nums[i] > max) max = nums[i];
        }
        return max;
    }

    findValidAttacks = () => {
        let {types, nums} = this.getRollVals();

        //Return an array of attacks that meet the trigger conditions
        return this.attacks.filter((attack, index) => {
            if(attack.trigger === 'lgStraight'){
                if(this.findMaxStraight(nums) >= 5) return true;
                else return false;
            }else if(attack.trigger === 'smStraight'){
                if(this.findMaxStraight(nums) >= 4) return true;
                else return false;
            }else{
                for(let i = 0; i < this.diceTypes.length; i++){
                    if(attack.trigger[i] > types[i]) return false;
                }
                return true;
            }
        });
    }

    selectAttack = (index) => {
        let validAttacks = this.findValidAttacks();
        return validAttacks[index];
    }

    addStatus = (status) => {
        let statusName = status.constructor.name;
        let stackLimit = status.stackLimit;
        let stackCount = 0;

        for(let i = 0; i < this.statusEffects.length; i++) {
            if(statusName === this.statusEffects[i].constructor.name) stackCount++;
            if(stackCount >= stackLimit) return;
        }

        this.statusEffects.push(status);
        console.log(this.statusEffects);
    }

    removeStatus = (status) => {
        let statusIndex = this.statusEffects.findIndex((s) => s.constructor.name === status.constructor.name);
        if(statusIndex >= 0) return this.statusEffects.splice(statusIndex, 1);
        return null;
    }

    useStatus = (status) => {
        let event = new Event();
        
    }

    playUpgrade = (upgrade) => {
        let attack = this.attacks.find(attack => attack.name.includes(upgrade.replaces));
        attack.name = upgrade.name;
        attack.resolve = upgrade.resolve;

        if(upgrade.newAttack) this.attacks.push(upgrade.newAttack);
    }

    playCard = (card, params = []) => {
        let newEvent = new Event();

        if(card.cost > this.cp) {
            console.log('Not enough CP!');
            return;
        }

        this.cp = this.cp - card.cost;

        if(card.type === type.UPGRADE) {
            this.playUpgrade(card);
        }else{
            newEvent = card.resolve(...params);
        }

        this.discardCard(card.name);
        return newEvent;
    }
}