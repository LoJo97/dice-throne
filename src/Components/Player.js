import _ from 'lodash';
import Event from './../Event';

const Player = (props) => {
    let player = props.game.players[props.playerNum];
    let target = props.game.players[props.targetNum];

    const roll = () => {
        player.rollDice();
        props.setGame(props.game);
    }

    const lockDie = (i) => {
        if(player.dice[i].locked) player.unlockDie(i);
        else player.lockDie(i);
        props.setGame(props.game);
    }

    const selectAttack = (attackIndex) => {
        let attacker = _.clone(player);
        let defender = _.clone(target);
        
        let attack = attacker.findValidAttacks()[attackIndex].resolve();

        let defense = new Event();
        if(attack.damageType === 'normal') defense.reconcile(defender.defense[0].resolve());

        let game = props.game;
        attack.reconcile(defense);
        game.resolveEvent(attack, props.playerNum, props.targetNum);

        props.setGame(_.clone(game));
        
        return;
    }

    return(
        <div>
            <h2>{player.constructor.name} - HP: {player.hp} CP: {player.cp}</h2>
            {player.dice.map((d, index) => {
            return (
                <div style={d.locked ? {color: 'red'} : {}} key={index}>
                <b>{index + 1}</b>: {d.result.value}, {d.result.type} <button onClick={() => lockDie(index)}>{d.locked ? 'Unlock' : 'Lock' }</button>
                </div>
            );
            })}
            <button onClick={() => roll()}>Roll Dice</button>
            <br/>
            <b>ATTACKS:</b>
            {player.findValidAttacks().map((a, index) => {
                return (
                    <div key={index} onClick={() => props.targetNum !== null ? selectAttack(index) : null}>
                        {a.name}
                    </div>
                );
            })}
            <br/>
            <b>STATUS EFFECTS:</b>
            {player.statusEffects.map((status, index) => {
                console.log(status);
                return (
                    <div key={index}>
                        {status.constructor.name}
                    </div>
                );
            })}
            <br/>
            <b>HAND:</b>
            {player.hand.map((card, index) => {
                console.log(player.hand)
                return (
                    <div key={index}>
                        {card.id}
                    </div>
                );
            })}
        </div>
    );
}

export default Player;