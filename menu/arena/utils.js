import { myTamagotchi } from "../../state.js";

export const numberOf = (itemName) => myTamagotchi.arenaItems.indexOf(itemName) !== -1 ?
    [].concat(...myTamagotchi.arenaItems).filter(item => item === itemName).length : 0;

export const hasItem = (itemName) => myTamagotchi.arenaItems.indexOf(itemName) !== -1;