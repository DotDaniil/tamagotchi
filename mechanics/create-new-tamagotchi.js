import {
    createFood,
    createLvl,
    createHealth,
    createIntellect,
    createItems,
    createMoney,
    createStrength,
    createWater,
    createIsMainMenuOpened,
} from "../state-operations.js";

import { isDebugging } from "../locators.js";
import { generateRandomName } from "../utils.js";

export const createNewTamagotchi = (readline, character, showMenu) => {
    (!isDebugging(character) && console.clear());

    const askName = (nextFunction) => readline.question('\n Enter tamagotchi name: \n', (name) => {
        character.modifyField('name', name !== '' ? name + 'tchi' : generateRandomName());
        nextFunction()
    })

    const askGender = (nextFunction, failed) => readline.question(failed ? ('\n Please, type m or f: \n ') : ('\n Is tomagotchi male (m) or female (f)? : \n'), (gender) => {
        if (gender === 'f' || gender === 'm') {
            character.modifyField('gender', gender);
        } else {
            askGender(() => nextFunction(() => nextFunction),true);
        }
        nextFunction()
    })


    const initiateCreation = () => {

        const createOtherAndReturnToMenu = () => {
            createHealth(character);
            createIntellect(character);
            createStrength(character);
            createFood(character);
            createLvl(character);
            createWater(character);
            createItems(character);
            createMoney(character);
            createIsMainMenuOpened(character);

            showMenu();
        }

        askName(() => askGender(() => createOtherAndReturnToMenu()))
    }

    initiateCreation();

}