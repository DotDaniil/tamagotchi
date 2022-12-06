import fs from "fs";
import { myTamagotchi } from "../state.js";

export const loadGame = () => {
    const loadedData = JSON.parse(fs.readFileSync('./data/character.json'));
    for (const [key, value] of Object.entries(loadedData)) {
        myTamagotchi.modifyField(key, value);
    }
}

export const saveGame = () => {
    fs.writeFileSync('./data/character.json', JSON.stringify(myTamagotchi));
}