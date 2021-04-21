import Character from './Character';

const DICE_TYPES = ['Arrow', 'Foot', 'Moon'];
const die = [
    {value: 1, type: DICE_TYPES[0]},
    {value: 2, type: DICE_TYPES[0]},
    {value: 3, type: DICE_TYPES[0]},
    {value: 4, type: DICE_TYPES[1]},
    {value: 5, type: DICE_TYPES[1]},
    {value: 6, type: DICE_TYPES[2]},
];

export default class MoonElf extends Character {
    constructor(baseHP, baseCP) {
        super(baseHP, baseCP, DICE_TYPES, die);
        
        this.attacks = [
            {
                name: 'LONGBOW',
                trigger: [3, 0, 0],
                resolve: () => {
                    let numArrows = 0;
                    this.dice.map((d, index) => {
                        if(d.result.type === DICE_TYPES[0]) numArrows++;
                    });

                    let damage = 4;
                    if(numArrows === 4) damage = 5;
                    else if(numArrows === 5) damage = 7;
                    
                    return {
                        damage: damage,
                        damageType: 'normal',
                        inflict: [],
                        gain: [],
                        heal: 0
                    };
                }
            },
            {
                name: 'DEMISING SHOT',
                trigger: [3, 0, 2],
                resolve: () => {
                    return {
                        damage: 4,
                        damageType: 'normal',
                        inflict: ['Targeted'],
                        gain: [],
                        heal: 0
                    };
                }
            },
            {
                name: 'ENTANGLING SHOT',
                trigger: 'smStraight',
                resolve: () => {
                    return {
                        damage: 7,
                        damageType: 'normal',
                        inflict: ['Entangle'],
                        gain: [],
                        heal: 0
                    };
                }
            },
            {
                name: 'ECLIPSE',
                trigger: [0, 0, 4],
                resolve: () => {
                    return{
                        damage: 7,
                        damageType: 'normal',
                        inflict: ['Blind', 'Entangle', 'Targeted'],
                        gain: [],
                        heal: 0
                    }
                }
            },
            {
                name: 'COVERED SHOT',
                trigger: [2, 3, 0],
                resolve: () => {
                    return {
                        damage: 7,
                        damageType: 'normal',
                        inflict: [],
                        gain: ['Evasive'],
                        heal: 0
                    };
                }
            },
            {
                name: 'EXPLODING ARROW',
                trigger: [1, 0, 3],
                resolve: () => {
                    this.rollDice(5);
                    let damage = 3;
                    let cp = 0;
                    for(let i = 0; i < 5; i++) {
                        let type = this.dice[i].result.type;
                        if(type === DICE_TYPES[0] || type === DICE_TYPES[1]) damage++;
                        else cp++;
                    }
                    return {
                        damage: damage,
                        damageType: 'normal',
                        inflict: ['Blind'],
                        gain: [],
                        heal: 0,
                        negCP: cp
                    }
                }
            },
            {
                name: 'BLINDING SHOT',
                trigger: 'lgStraight',
                resolve: (roll) => {
                    return {
                        damage: 8,
                        damageType: 'normal',
                        inflict: ['Blind'],
                        gain: ['Evasive'],
                        heal: 0
                    }
                }
            },
            {
                name: 'LUNAR ECLIPSE',
                trigger: [0, 0, 5],
                resolve: (roll) => {
                    return {
                        damage: 12,
                        damageType: 'ultimate',
                        inflict: ['Blind', 'Entangle', 'Targeted'],
                        gain: ['Evasive'],
                        heal: 0
                    }
                }
            }
        ]
        
        this.defense = [
            {
                name: 'MISSED ME',
                dice: 5,
                resolve: () => {
                    this.rollDice(5);
                    let {types} = this.getRollVals();

                    let prevent = 0;
                    if(types[1] >= 2) prevent = 0.5;
                    
                    let damage = 0;
                    damage = Math.floor(types[0] / 2);

                    return {
                        returnDamage: damage,
                        prevent: prevent,
                        inflict: [],
                        gain: [],
                        heal: 0
                    }
                }
            }
        ]
    }    
}