const {createDebugModeFlag} = require("./state-operations");

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
//createDebugModeFlag(myTamagotchi);

module.exports = { myTamagotchi };