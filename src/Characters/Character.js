export default class Character {
    hp = 0;
    cp = 0;
    diceTypes = [];
    die = [];
    attacks = [];

    constructor(baseHP, baseCP, diceTypes, die) {
        this.hp = baseHP;
        this.cp = baseCP;
        this.statusEffects = [];
        this.diceTypes = diceTypes;
        this.die = die;

        this.dice = [
            {result: this.die[0], locked: false},
            {result: this.die[0], locked: false},
            {result: this.die[0], locked: false},
            {result: this.die[0], locked: false},
            {result: this.die[0], locked: false},
        ];
    }

    rollDie = (dieNum) => {
        if(!this.dice[dieNum].locked) this.dice[dieNum].result = this.die[Math.floor(Math.random() * 6)];
    }

    rollDice = (num = 5) => {
        this.dice.map((d, index) => {
            if(index < num) return this.rollDie(index);
        });
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
}