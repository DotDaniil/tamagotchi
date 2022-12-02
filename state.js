class State {
    constructor(state) {
        this.state = state;
    }
    modifyField(label, value) {
        this[`${label}`] = value;
    }
    delField(label) {
        delete this[`${label}`]
    }
}

let myTamagotchi = new State('tamagotchi');

module.exports = { myTamagotchi };