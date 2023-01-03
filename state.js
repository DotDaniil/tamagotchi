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
export const enemy = new State('enemy')
export const cheatMenuState = new State('cheatMenuState');
//createDebugModeFlag(myTamagotchi);
