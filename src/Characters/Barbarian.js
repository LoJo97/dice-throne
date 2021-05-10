import Character from './Character';
import Event from './../Event';
import Concussion from './../StatusEffects/Concussion';
import Stun from './../StatusEffects/Stun';
import cards, {target, type} from './../cards';

import card19 from './../Media/Cards/Barbarian_19.png';
import card20 from './../Media/Cards/Barbarian_20.png';
import card21 from './../Media/Cards/Barbarian_21.png';
import card22 from './../Media/Cards/Barbarian_22.png';
import card23 from './../Media/Cards/Barbarian_23.png';
import card24 from './../Media/Cards/Barbarian_24.png';
import card25 from './../Media/Cards/Barbarian_25.png';
import card26 from './../Media/Cards/Barbarian_26.png';
import card27 from './../Media/Cards/Barbarian_27.png';
import card28 from './../Media/Cards/Barbarian_28.png';
import card29 from './../Media/Cards/Barbarian_29.png';
import card30 from './../Media/Cards/Barbarian_30.png';
import card31 from './../Media/Cards/Barbarian_31.png';
import card32 from './../Media/Cards/Barbarian_32.png';

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
    constructor(baseHP, baseCP) {
        super(baseHP, baseCP, DICE_TYPES, die);

        this.attacks = [
            {
                name: 'SMACK',
                trigger: [3, 0, 0],
                resolve: () => {
                    let {types} = this.getRollVals();
        
                    let damage = 4;
                    if(types[0] === 4) damage = 6;
                    else if(types[0] === 5) damage = 8;

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
                    this.dice.map((d) => {
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
                    event.damageType = 'normal';
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

        this.deck = [
            ...cards,
            {
                id: 19,
                name: 'SMACK II',
                replaces: 'SMACK',
                img: card19,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let {types, nums} = this.getRollVals();
                    let maxSame = this.findMaxSame(nums);
        
                    let damage = 5;
                    if(types[0] === 4) damage = 7;
                    else if(types[0] === 5) damage = 9;

                    let event = new Event();
                    event.damage = damage;
                    event.damageType = maxSame >= 4 ? 'undefendable' : 'normal';
                    
                    return event;
                }
            },
            {
                id: 20,
                name: 'SMACK III',
                replaces: 'SMACK',
                img: card20,
                cost: 3,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let {types, nums} = this.getRollVals();
                    let maxSame = this.findMaxSame(nums);
        
                    let damage = 6;
                    if(types[0] === 4) damage = 8;
                    else if(types[0] === 5) damage = 10;

                    let event = new Event();
                    event.damage = damage;
                    event.damageType = maxSame >= 4 ? 'undefendable' : 'normal';
                    
                    return event;
                }
            },
            {
                id: 21,
                name: 'STURDY BLOW II',
                replaces: 'STURDY BLOW',
                img: card21,
                cost: 1,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 5;
                    event.damageType = 'undefendable';

                    return event;
                }
            },
            {
                id: 22,
                name: 'STURDY BLOW III',
                replaces: 'STURDY BLOW',
                img: card22,
                cost: 1,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 6;
                    event.damageType = 'undefendable';

                    return event;
                }
            },
            {
                id: 23,
                name: 'MIGHTY BLOW II',
                replaces: 'MIGHTY BLOW',
                img: card23,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 8;
                    event.damageType = 'undefendable';
                    return event;
                }
            },
            {
                id: 24,
                name: 'CRIT BASH II',
                replaces: 'CRIT BASH',
                img: card24,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 57;
                    event.damageType = 'undefendable';
                    event.inflict = [new Stun()];
                    return event;
                },
                newAttack: {
                    name: 'CRIT SMASH',
                    trigger: [0, 0, 3],
                    resolve: () => {    
                        let event = new Event();
                        event.damage = 2;
                        event.damageType = 'undefendable';
                        event.inflict = [new Concussion()];
    
                        return event;
                    }
                }
            },
            {
                id: 25,
                name: 'FORTITUDE II',
                replaces: 'FORTITUDE',
                img: card25,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let {types, nums} = this.getRollVals();
                    let maxSame = this.findMaxSame(nums);
        
                    let heal = 5;
                    if(types[1] === 4) heal = 6;
                    else if(types[1] === 5) heal = 7;

                    let event = new Event();
                    event.healPlayer = heal;
                    event.remove = maxSame >= 3 ? [] : [];
                    
                    return event;
                }
            },
            {
                id: 26,
                name: 'OVERPOWER II',
                replaces: 'OVERPOWER',
                img: card26,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
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
                    event.inflict = damage >= 10 ? [new Concussion()] : [];

                    return event;
                },
                newAttack: {
                    name: 'WAR CRY',
                    trigger: [2, 2, 0],
                    resolve: () => {    
                        let event = new Event();
                        event.damage = 2;
                        event.damageType = 'undefendable';
                        event.heal = 2;
    
                        return event;
                    }
                }
            },
            {
                id: 27,
                name: 'RECKLESS II',
                replaces: 'RECKLESS',
                img: card27,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.returnDamage = 5;
                    event.returnDamageType = 'undefendable';
                    event.damage = 20;
                    event.damageType = 'normal';

                    return event;
                }
            },
            {
                id: 28,
                name: 'THICK SKIN II',
                replaces: 'THICK SKIN',
                img: card28,
                cost: 3,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let heal = 0;
                    this.rollDice(3);
                    let {types} = this.getRollVals();
                    heal = types[1] * 2;

                    let event = new Event();
                    event.healTarget = heal;
                    event.inflict = types[1] >= 2 ? [] : event.inflcit;
                    
                    return event;
                }
            },
            {
                id: 29,
                name: 'Concuss!',
                img: card29,
                cost: 1,
                description: 'Inflict Concussion on a chosen opponent.',
                type: type.MAIN,
                target: target.OPPONENT,
                attributes: [
                    'inflict',
                    'Concussion'
                ]
            },
            {
                id: 30,
                name: 'Head Bash!',
                img: card30,
                cost: 0,
                description: 'If you successfully dealt at least 8 dmg to an opponent after their defense concluded, play this card to inflict Concussion.',
                type: type.ROLL,
                target: target.OPPONENT,
                attributes: [
                    'damage>7',
                    'inflict',
                    'Concussion'
                ]
            },
            {
                id: 31,
                name: 'Get Some!',
                img: card31,
                cost: 2,
                description: 'Roll 5 dice: Add 1 x swords dmg. Inflict Concussion.',
                type: type.ROLL,
                target: target.OPPONENT,
                attributes: [
                    'roll::5d::damage::0+1xsword',
                    'inflict',
                    'Concussion'
                ]
            },
            {
                id: 32,
                name: 'Feelin\' Good!',
                img: card32,
                cost: 0,
                description: 'Roll 3 dice: Heal 1 + 2 x hearts',
                type: type.INSTANT,
                target: target.SELF,
                attributes: [
                    'roll::3d::heal::1+2xhearts'
                ]
            },
        ];
    }
}