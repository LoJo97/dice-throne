import Character from './Character';
import Event from './../Event';
import Concussion from './../StatusEffects/Concussion';
import Stun from './../StatusEffects/Stun';

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
    constructor(baseHP, baseCP, setDice) {
        super(baseHP, baseCP, DICE_TYPES, die, setDice);

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

                    let event = new Event();
                    event.damage = damage;
                    event.damageType = 'normal';
                    
                    return event;     
                }
            },
            {
                name: 'STURDY BLOW',
                trigger: [2, 0, 2],
                resolve: () => {
                    let event = new Event();
                    event.damage = 4;
                    event.damageType = 'undefendable';

                    return event;
                }
            },
            {
                name: 'MIGHTY BLOW',
                trigger: 'smStraight',
                resolve: () => {
                    let event = new Event();
                    event.damage = 9;
                    event.damageType = 'normal';
                    return event;
                }
            },
            {
                name: 'CRIT BASH',
                trigger: [0, 0, 4],
                resolve: () => {
                    let event = new Event();
                    event.damage = 5;
                    event.damageType = 'undefendable';
                    event.inflict = [new Stun()];
                    return event;
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

                    let event = new Event();
                    event.healPlayer = heal;
                    
                    return event;
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

                    let event = new Event();
                    event.damage = damage;
                    event.damageType = 'undefendable';
                    event.inflict = damage >= 14 ? [new Concussion()] : [];

                    return event;
                }
            },
            {
                name: 'RECKLESS',
                trigger: 'lgStraight',
                resolve: () => {
                    let event = new Event();
                    event.returnDamage = 4;
                    event.returnDamageType = 'undefendable';
                    event.damage = 15;
                    event.damageType = 'normal';

                    return event;
                }
            },
            {
                name: 'RAGE',
                trigger: [0, 0, 5],
                resolve: () => {
                    let event = new Event();
                    event.damage = 15;
                    event.damageType = 'ultimate';
                    event.inflict = [new Stun()];

                    return event;
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

                    let event = new Event();
                    event.healTarget = heal;
                    
                    return event;
                }
            }
        ];
    }
}