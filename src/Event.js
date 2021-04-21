class Event {
    constructor() {
        //Damage
        this.damage = 0;
        this.damageType = 'none';
        this.returnDamage = 0;
        this.returnDamageType = 'none';
        //Heal/prevent
        this.heal = 0;
        this.prevent = 0;
        //Status
        this.inflict = [];
        this.gain = [];
        this.remove = [];
        //CP
        this.getCP = 0;
        this.loseCP = 0;
        this.destroyCP = 0;
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
        this.heal += newEvent.heal;
        this.prevent += newEvent.prevent;
        //Status
        this.inflict = newEvent.concat(newEvent.inflict);
        this.gain = newEvent.concat(newEvent.gain);
        this.remove = newEvent.concat(newEvent.remove);
        //CP
        this.getCP += newEvent.getCP;
        this.loseCP += newEvent.loseCP;
        this.destroyCP += newEvent.destroyCP;
        //Cards
        this.draw += newEvent.draw;
        this.discard += newEvent.discard;
    }
}

export default Event;