import { myTamagotchi } from "../state.js";

import {characterExists} from "../locators.js";


export const startLvlGain = (temporaryCharacter) => {

        let lvl_gain_interval = setInterval(() => {

            if (characterExists(temporaryCharacter)) {
                myTamagotchi.lvlProcents = (0.1 * Math.sqrt(myTamagotchi.exp)).toFixed(2).split('.')[1];
                myTamagotchi.lvl = Math.floor(0.1 * Math.sqrt(myTamagotchi.exp));
            }

        },5000)
}

export const processLvlBar = (character) => {
    const lvlPoint = '█';
    const lostLvlPoint = '░';
    const lvlTimes = Math.round(character.lvlProcents / 4);
    const lostTimes = Math.round(25 - lvlTimes);
    return character.lvlProcents.toString() !== '00' ? `${lvlPoint.repeat(lvlTimes)}${lostLvlPoint.repeat(lostTimes)}` : `${lostLvlPoint.repeat(25)}`;
}
