import { myTamagotchi } from "../state.js";

import {
    characterExists,
    characterIsDying,
    noHp,
    withoutDyingDuplicate,
} from "../locators.js";

import {
    delOnePoint,
    characterDelete,
    copyCharacterToState,
    addOnePoint
} from "../state-operations.js";

export const startDying = (temporaryCharacter) => {

    //deletes duplicates of dying process

    addOnePoint('dyingProcess', temporaryCharacter);
    copyCharacterToState(temporaryCharacter, myTamagotchi);

    if (withoutDyingDuplicate(temporaryCharacter)) {

    //

        let dying_interval = setInterval(() => {

            if (characterExists(temporaryCharacter)) {

                if (characterIsDying(temporaryCharacter)) {

                    delOnePoint('hp', temporaryCharacter)
                    copyCharacterToState(temporaryCharacter, myTamagotchi);

                   // console.log(`Tamagochi is dying... HP is ${temporaryCharacter.hp}!`)

                }

                if (noHp(temporaryCharacter)) {
                    characterDelete(myTamagotchi)
                    clearInterval(dying_interval)
                    console.log('\n Tamagotchi is dead T_T \n || "*" ... RIP ... "*" || \n');
                    process.exit()
                }
            }

        },10000)
    }
}