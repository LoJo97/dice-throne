import Character from './Character';
import Event from './../Event';
import Targeted from './../StatusEffects/Targeted';
import Evasive from './../StatusEffects/Evasive';
import Entangle from './../StatusEffects/Entangle';
import Blind from './../StatusEffects/Blind';
import cards, {type, target} from './../cards';

import card19 from './../Media/Cards/MoonElf_19.png';
import card20 from './../Media/Cards/MoonElf_20.png';
import card21 from './../Media/Cards/MoonElf_21.png';
import card22 from './../Media/Cards/MoonElf_22.png';
import card23 from './../Media/Cards/MoonElf_23.png';
import card24 from './../Media/Cards/MoonElf_24.png';
import card25 from './../Media/Cards/MoonElf_25.png';
import card26 from './../Media/Cards/MoonElf_26.png';
import card27 from './../Media/Cards/MoonElf_27.png';
import card28 from './../Media/Cards/MoonElf_28.png';
import card29 from './../Media/Cards/MoonElf_29.png';
import card30 from './../Media/Cards/MoonElf_30.png';
import card31 from './../Media/Cards/MoonElf_31.png';
import card32 from './../Media/Cards/MoonElf_32.png';

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

                    let event = new Event();
                    event.damage = damage;
                    event.damageType = 'normal';
                    
                    return event;
                }
            },
            {
                name: 'DEMISING SHOT',
                trigger: [3, 0, 2],
                resolve: () => {
                    let event = new Event();
                    event.damage = 4;
                    event.damageType = 'normal';
                    event.inflict = [new Targeted()];

                    return event;
                }
            },
            {
                name: 'ENTANGLING SHOT',
                trigger: 'smStraight',
                resolve: () => {
                    let event = new Event();
                    event.damage = 7;
                    event.damageType = 'normal';
                    event.inflict = [new Entangle()];
                    return event;
                }
            },
            {
                name: 'ECLIPSE',
                trigger: [0, 0, 4],
                resolve: () => {
                    let event = new Event();
                    event.damage = 7;
                    event.damageType = 'normal';
                    event.inflict = [new Blind(), new Entangle(), new Targeted()];

                    return event;
                }
            },
            {
                name: 'COVERED SHOT',
                trigger: [2, 3, 0],
                resolve: () => {
                    let event = new Event();
                    event.damage = 7;
                    event.damageType = 'normal';
                    event.gain = [new Evasive()];

                    return event;
                }
            },
            {
                name: 'EXPLODING ARROW',
                trigger: [1, 0, 3],
                resolve: () => {
                    this.getNewDice(5);
                    this.rollDice();
                    let damage = 3;
                    let cp = 0;
                    for(let i = 0; i < 5; i++) {
                        let type = this.dice[i].result.type;
                        if(type === DICE_TYPES[0] || type === DICE_TYPES[1]) damage++;
                        else cp++;
                    }
                    
                    let event = new Event();
                    event.damage = damage;
                    event.damageType = 'normal';
                    event.inflict = [new Blind()];
                    event.destroyCP = cp;

                    return event;
                }
            },
            {
                name: 'BLINDING SHOT',
                trigger: 'lgStraight',
                resolve: () => {
                    let event = new Event();
                    event.damage = 8;
                    event.damageType = 'normal';
                    event.inflict = [new Blind()];
                    event.gain = [new Evasive()];
                    
                    return event;
                }
            },
            {
                name: 'LUNAR ECLIPSE',
                trigger: [0, 0, 5],
                resolve: () => {
                    let event = new Event();
                    event.damage = 12;
                    event.damageType = 'ultimate';
                    event.inflict = [new Blind(), new Entangle(), new Targeted()];
                    event.gain = [new Evasive()];

                    return event;
                }
            }
        ]
        
        this.defense = [
            {
                name: 'MISSED ME',
                dice: 5,
                resolve: () => {
                    this.getNewDice(5);
                    this.rollDice();
                    let {types} = this.getRollVals();

                    let prevent = 0;
                    if(types[1] >= 2) prevent = 0.5;
                    
                    let damage = 0;
                    damage = Math.floor(types[0] / 2);

                    let event = new Event();
                    event.returnDamage = damage;
                    event.returnDamageType = 'normal';
                    event.preventTarget = prevent;

                    return event;
                }
            }
        ];

        this.deck = [
            ...cards,
            {
                id: 19,
                name: 'LONGBOW II',
                replaces: 'LONGBOW',
                img: card19,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let {types, nums} = this.getRollVals();
                    let numArrows = types[0];
                    let maxSame = Math.max(...nums);

                    let damage = 4;
                    if(numArrows === 4) damage = 6;
                    else if(numArrows === 5) damage = 8;

                    let event = new Event();
                    event.damage = damage;
                    event.damageType = 'normal';
                    if(maxSame >= 4) event.inflict = [new Entangle()];
                    
                    return event;
                }
            },
            {
                id: 20,
                name: 'LONGBOW III',
                replaces: 'LONGBOW',
                img: card20,
                cost: 3,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let {types, nums} = this.getRollVals();
                    let numArrows = types[0];
                    let maxSame = Math.max(...nums);

                    let damage = 5;
                    if(numArrows === 4) damage = 7;
                    else if(numArrows === 5) damage = 9;

                    let event = new Event();
                    event.damage = damage;
                    event.damageType = 'normal';
                    if(maxSame >= 3) event.inflict = [new Entangle()];
                    
                    return event;
                }
            },
            {
                id: 21,
                name: 'DEMISING SHOT II',
                replaces: 'DEMISING SHOT',
                img: card21,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 6;
                    event.damageType = 'normal';
                    event.inflict = [new Targeted()];

                    return event;
                },
                newAttack: {
                    name: 'FOCUS',
                    trigger: [2, 0, 1],
                    resolve: () => {    
                        let event = new Event();
                        event.inflict = [new Targeted(), new Entangle()];
    
                        return event;
                    }
                }
            },
            {
                id: 22,
                name: 'COVERED SHOT II',
                replaces: 'COVERED SHOT',
                img: card22,
                cost: 1,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 9;
                    event.damageType = 'normal';
                    event.gain = [new Evasive()];

                    return event;
                },
                newAttack: {
                    name: 'EVASIVE ACTION',
                    trigger: [0, 3, 0],
                    resolve: () => {    
                        let event = new Event();
                        //Figure out how to give a CHOSEN player evasive...
                        event.damage = 2;
                        event.damageType = 'undefendable';
    
                        return event;
                    }
                }
            },
            {
                id: 23,
                name: 'EXPLODING ARROW II',
                replaces: 'EXPLODING ARROW',
                img: card23,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    this.getNewDice(5);
                    this.rollDice();
                    let damage = 3;
                    let cp = 0;
                    for(let i = 0; i < 5; i++) {
                        let type = this.dice[i].result.type;
                        if(type === DICE_TYPES[0]) damage += 2;
                        else if(type === DICE_TYPES[1]) damage++;
                        else cp++;
                    }
                    
                    let event = new Event();
                    event.damage = damage;
                    event.damageType = 'normal';
                    event.inflict = [new Blind()];
                    event.destroyCP = cp;

                    return event;
                }
            },
            {
                id: 24,
                name: 'EXPLODING ARROW III',
                replaces: 'EXPLODING ARROW',
                img: card24,
                cost: 3,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    this.getNewDice(5);
                    this.rollDice();
                    let damage = 3;
                    let cp = 0;
                    for(let i = 0; i < 5; i++) {
                        let type = this.dice[i].result.type;
                        if(type === DICE_TYPES[0]) damage += 2;
                        else if(type === DICE_TYPES[1]) damage++;
                        else cp++;
                    }
                    
                    let event = new Event();
                    event.damage = damage;
                    event.damageType = 'normal';
                    event.inflict = [new Blind(), new Entangle()];
                    event.destroyCP = cp;

                    return event;
                }
            },
            {
                id: 25,
                name: 'ENTANGLING SHOT II',
                replaces: 'ENTANGLING SHOT',
                img: card25,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 9;
                    event.damageType = 'normal';
                    event.inflict = [new Entangle()];
                    return event;
                }
            },
            {
                id: 26,
                name: 'BLINDING SHOT II',
                replaces: 'BLINDING SHOT',
                img: card26,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 10;
                    event.damageType = 'normal';
                    event.inflict = [new Blind()];
                    event.gain = [new Evasive()];
                    
                    return event;
                },
                newAttack: {
                    name: 'LUNAR BLESSING',
                    trigger: [1, 2, 1],
                    resolve: () => {    
                        let event = new Event();
                        event.gain = [new Evasive(), new Evasive(), new Evasive()];
                        event.inflict = [new Entangle()];
    
                        return event;
                    }
                }
            },
            {
                id: 27,
                name: 'ECLIPSE II',
                replaces: 'ECLIPSE',
                img: card27,
                cost: 2,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    let event = new Event();
                    event.damage = 9;
                    event.damageType = 'normal';
                    event.inflict = [new Blind(), new Entangle(), new Targeted()];

                    return event;
                },
                newAttack: {
                    name: 'MOON SHADOW',
                    trigger: [0, 0, 3],
                    resolve: () => {    
                        let event = new Event();
                        event.gain = [new Evasive()];
                        event.inflict = [new Blind(), new Entangle(), new Targeted()];
    
                        return event;
                    }
                }
            },
            {
                id: 28,
                name: 'MISSED ME II',
                replaces: 'MISSED ME',
                img: card28,
                cost: 3,
                description: '',
                type: type.UPGRADE,
                target: target.SELF,
                resolve: () => {
                    this.getNewDice(5)
                    this.rollDice();
                    let {types} = this.getRollVals();

                    let prevent = 0;
                    if(types[1] >= 2) prevent = 0.5;
                    
                    let damage = 0;
                    damage = Math.floor(types[0] / 2);

                    let event = new Event();
                    event.returnDamage = damage;
                    event.returnDamageType = 'normal';
                    event.preventTarget = prevent;

                    return event;
                }
            },
            {
                id: 29,
                name: 'Moon Magic!',
                img: card29,
                cost: 4,
                description: 'Gain evasive. Inflict Blind, Entangle, & Targeted on a chosen opponent.',
                type: type.MAIN,
                target: target.OPPONENT,
                paramTypes: ['self', 'target'],
                resolve: (self, target) => {
                    let newEvent = new Event();
                    newEvent.user = self;
                    newEvent.target = target;
                    newEvent.gain = [new Evasive()];
                    newEvent.target = [new Blind(), new Entangle(), new Targeted()];
                }
            },
            {
                id: 30,
                name: 'Take That!',
                img: card30,
                cost: 0,
                description: 'Roll 1 die. On arrow, add 2 dmg. On foot, inflict Entangle. On moon, inflict Blind.',
                type: type.ROLL,
                target: target.OPPONENT,
                paramTypes: ['self', 'attack'],
                resolve: (self, attack) => {
                    self.getNewDice(1);
                    self.rollDice();

                    if(self.dice[0].result.type === DICE_TYPES[0]) attack.damage += 2;
                    else if(self.dice[0].result.type === DICE_TYPES[1]) attack.inflict.push(new Entangle());
                    else attack.inflict.push(new Blind());

                    return attack;
                }
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