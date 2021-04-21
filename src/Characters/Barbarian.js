import Character from './Character';

const DICE_TYPES = ['Sword', 'Life', 'Pow'];
const die = [
    {value: 1, type: DICE_TYPES[0]},
    {value: 2, type: DICE_TYPES[0]},
    {value: 3, type: DICE_TYPES[0]},
    {value: 4, type: DICE_TYPES[1]},
    {value: 5, type: DICE_TYPES[1]},
    {value: 6, type: DICE_TYPES[2]},
];

export default class Barbarian extends Character {
    constructor(baseHP, baseCP, setDice, setAttacks) {
        super(baseHP, baseCP, DICE_TYPES, die, setDice, setAttacks);

        this.attacks = [
            {
                name: 'SMACK',
                trigger: [3, 0, 0],
                resolve: () => {
                    let numSwords = 0;
                    this.dice.map((d, index) => {
                        if(d.result.type === DICE_TYPES[0]) numSwords++;
                    });
        
                    let damage = 4;
                    if(numSwords === 4) damage = 6;
                    else if(numSwords === 5) damage = 8;
                    
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
                name: 'STURDY BLOW',
                trigger: [2, 0, 2],
                resolve: () => {
                    return {
                        damage: 4,
                        damageType: 'undefendable',
                        inflict: [],
                        gain: [],
                        heal: 0
                    };
                }
            },
            {
                name: 'MIGHTY BLOW',
                trigger: 'smStraight',
                resolve: () => {
                    return {
                        damage: 9,
                        damageType: 'normal',
                        inflict: [],
                        gain: [],
                        heal: 0
                    }
                }
            },
            {
                name: 'CRIT BASH',
                trigger: [0, 0, 4],
                resolve: () => {
                    return {
                        damage: 5,
                        damageType: 'undefendable',
                        inflict: ['Stun'],
                        gain: [],
                        heal: 0
                    };
                }
            },
            {
                name: 'FORTITUDE',
                trigger: [0, 3, 0],
                resolve: () => {
                    let numHearts = 0;
                    this.dice.map((d, index) => {
                        if(d.result.type === DICE_TYPES[1]) numHearts++;
                    });
        
                    let heal = 4;
                    if(numHearts === 4) heal = 5;
                    else if(numHearts === 5) heal = 6;
                    
                    return {
                        damage: 0,
                        damageType: 'none',
                        inflict: [],
                        gain: [],
                        heal: heal
                    };
                }
            },
            {
                name: 'OVERPOWER',
                trigger: [3, 0, 2],
                resolve: () => {
                    //Roll 3 dice, deal damage = roll value
                    let damage = 0;
                    this.rollDice(3);
                    for(let i = 0; i < 3; i++) {
                        damage += this.dice[i].result.value;
                    }

                    return {
                        damage: damage,
                        damageType: 'undefendable',
                        inflict: damage >= 14 ? ['Concussion'] : [],
                        gain: [],
                        heal: 0
                    };
                }
            },
            {
                name: 'RECKLESS',
                trigger: 'lgStraight',
                resolve: () => {
                    return {
                        returnDamage: 4,
                        damage: 15,
                        damageType: 'normal',
                        inflict: [],
                        gain: [],
                        heal: 0
                    };
                }
            },
            {
                name: 'RAGE',
                trigger: [0, 0, 5],
                resolve: () => {
                    return {
                        damage: 15,
                        damageType: 'ultimate',
                        inflict: ['Stun'],
                        gain: [],
                        heal: 0
                    };
                }
            }
        ];

        this.defense = [
            {
                name: 'THICK SKIN',
                dice: 3,
                resolve: () => {
                    let heal = 0;
                    this.rollDice(3);
                    for(let i = 0; i < 3; i++) {
                        if(this.dice[i].result.type === DICE_TYPES[1]) heal += 2;
                    }
                    return {
                        returnDamage: 0,
                        prevent: 0,
                        inflict: [],
                        gain: [],
                        heal: heal
                    };
                }
            }
        ];
    }
}