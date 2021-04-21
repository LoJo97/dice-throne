import {useState} from 'react';
import _ from 'lodash';

const Player = (props) => {
    const roll = () => {
        let p = _.clone(props.player);
        p.rollDice();
        props.setPlayer(p);
    }

    const lockDie = (i) => {
        let p = _.clone(props.player);
        if(p.dice[i].locked) p.unlockDie(i);
        else p.lockDie(i);
        props.setPlayer(p);
    }

    const selectAttack = (attackIndex) => {
        console.log({target: props.target});
        let attacker = _.clone(props.player);
        let defender = _.clone(props.target);
        
        let attack = attacker.findValidAttacks()[attackIndex].resolve();
        console.log({attack: attack});

        let defense = {
            returnDamage: 0,
            prevent: 0,
            inflict: [],
            gain: [],
            heal: 0
        };
        if(attack.damageType === 'normal') defense = defender.defense[0].resolve();
        console.log({defense: defense});

        let final = {
            damage: attack.damage - ((defense.prevent > 0 && defense.prevent < 1) ? Math.ceil(attack.damage * defense.prevent) : defense.prevent),
            returnDamage: (attack.returnDamage ? attack.returnDamage : 0) + defense.returnDamage,
            attackerHeal: attack.heal,
            defenderHeal: defense.heal,
            inflict: attack.inflict.concat(defense.gain),
            gain: attack.gain.concat(defense.inflict),
        }

        console.log({final});

        attacker.hp = attacker.hp + final.attackerHeal - final.returnDamage;
        defender.hp = defender.hp + final.defenderHeal - final.damage;

        props.setPlayer(attacker);
        props.setTarget(defender);

        return final;
    }

    return(
        <div>
            <h2>{props.player.constructor.name} - HP: {props.player.hp} CP: {props.player.cp}</h2>
            {props.player.dice.map((d, index) => {
            return (
                <div style={d.locked ? {color: 'red'} : {}} key={index}>
                <b>{index + 1}</b>: {d.result.value}, {d.result.type} <button onClick={() => lockDie(index)}>{d.locked ? 'Unlock' : 'Lock' }</button>
                </div>
            );
            })}
            <button onClick={() => roll()}>Roll Dice</button>
            {props.player.findValidAttacks().map((a, index) => {
                return (
                    <div key={index} onClick={() => props.target ? selectAttack(index) : null}>
                    <b>{a.name}</b>
                    </div>
                );
            })}
        </div>
    );
}

export default Player;