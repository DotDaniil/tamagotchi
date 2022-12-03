import { createDebugModeFlag } from "./state-operations.js";

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

export const myTamagotchi = new State('tamagotchi');
//createDebugModeFlag(myTamagotchi);
