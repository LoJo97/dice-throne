import Character from './Character';
import Event from './../Event';
import Targeted from './../StatusEffects/Targeted';
import Evasive from './../StatusEffects/Evasive';
import Entangle from './../StatusEffects/Entangle';
import Blind from './../StatusEffects/Blind';

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
                    console.log(event);
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
                    this.rollDice(5);
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
                    this.rollDice(5);
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
        ]
    }    
}