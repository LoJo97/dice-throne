class Event {
    constructor() {
        //Damage
        this.damage = 0;
        this.damageType = 'none';
        this.returnDamage = 0;
        this.returnDamageType = 'none';
        //Heal/prevent
        this.healPlayer = 0;
        this.preventPlayer = 0;
        this.healTarget = 0;
        this.preventTarget = 0;
        //Status
        this.inflict = [];
        this.gain = [];
        this.remove = [];
        //CP
        this.getCP = 0;
        this.loseCP = 0;
        this.destroyCP = 0;
        this.stealCP = 0;
        //Cards
        this.draw = 0;
        this.discard = 0;
    }

    reconcile = (newEvent) => {
        //Damage
        this.damage += newEvent.damage;
            //this.damageType = 'none';
        this.returnDamage += newEvent.returnDamage;
            //this.returnDamageType = 'none';
        //Heal/prevent
        this.healPlayer += newEvent.healPlayer;
        this.preventPlayer += newEvent.preventPlayer;
        this.healTarget += newEvent.healTarget;
        this.preventTarget += newEvent.preventTarget;
        //Status
        this.inflict = this.inflict.concat(...newEvent.inflict);
        this.gain = this.gain.concat(...newEvent.gain);
        this.remove = this.remove.concat(...newEvent.remove);
        //CP
        this.getCP += newEvent.getCP;
        this.loseCP += newEvent.loseCP;
        this.destroyCP += newEvent.destroyCP;
        this.stealCP += newEvent.stealCP;
        //Cards
        this.draw += newEvent.draw;
        this.discard += newEvent.discard;
    }

    calculateDamage = () => {
        //Player damage
        let playerDamage = this.returnDamage;

        if(this.preventPlayer < 1 && this.preventPlayer > 0) this.playerDamage *= this.preventPlayer;
        else if(playerDamage < this.preventPlayer) playerDamage = 0;
        else playerDamage -= this.preventPlayer;
        playerDamage -= this.healPlayer;

        //Target damage
        let targetDamage = this.damage;
        if(this.preventTarget < 1 && this.preventTarget > 0) this.targetDamage *= this.preventTarget;
        else if(targetDamage < this.preventTarget) targetDamage = 0;
        else targetDamage -= this.preventTarget;
        targetDamage -= this.healTarget;

        return {playerDamage, targetDamage};
    }

    calculateCP = () => {
        let playerCP = this.getCP;
        playerCP -= this.loseCP;

        let targetCP = 0 - this.destroyCP;

        let stealCP = this.stealCP;

        return {playerCP, targetCP, stealCP};
    }

    resolve = () => {
        const e = {
            ...this.calculateDamage(),
            ...this.calculateCP(),
            playerDamageType: this.damageType,
            targetDamageType: this.damageType,
            inflict: this.inflict,
            gain: this.gain,
            remove: this.remove,
            draw: this.draw,
            discard: this.discard
        };
        console.log(e);
        return e;
    }
}

export default Event;