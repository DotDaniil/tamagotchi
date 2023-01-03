import {
    createFood,
    createLvl,
    createHealth,
    createIntellect,
    createItems,
    createMoney,
    createStrength,
    createWater,
    createIsMainMenuOpened, createArenaItems,
} from "../state-operations.js";
import { generateRandomName } from "../utils.js";
import { menuFunctions } from "../menu/show-menu.js";
import { rl } from "../main.js";



export const createNewTamagotchi = (character) => {

        rl.question('\n Enter tamagotchi name: \n', (name) => {
            character.modifyField('name', name !== '' ? name + 'tchi' : generateRandomName());
            if (!!character.name) {
                process.stdin.on('data', stdinListener);
                console.clear()
                console.log('\n Is tomagotchi male (m) or female (f)? : \n');
            }
        })

    const stdinListener = (data) => {
            if (data.toString() === 'f' || data.toString() === 'm') {
                character.modifyField('gender', data.toString());
                process.stdin.off('data', stdinListener);
                createHealth(character);
                createIntellect(character);
                createStrength(character);
                createFood(character);
                createLvl(character);
                createWater(character);
                createItems(character);
                createArenaItems(character);
                createMoney(character);
                createIsMainMenuOpened(character);
                menuFunctions()
            } else {
                console.clear()
                console.log('\n Please, type m or f: \n ');
            }
    }
}