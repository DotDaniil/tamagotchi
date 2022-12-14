import { myTamagotchi } from '../state.js';

import { startDying } from './dying.js';

import {
    deleteCharStateInterval,
    createRandomCharStateInterval,
    copyCharacterToState,
    delOnePoint, createRandomCharStateIntervalFaster
} from "../state-operations.js";

import {
    isDebugging,
    characterExists,
    isPointZero,
    characterIsDying,
    hasWater,
    doesPropertyExists,
} from "../locators.js";

export const startThirsting = (temporaryCharacter) => {
    copyCharacterToState(temporaryCharacter, myTamagotchi);

    (isDebugging(temporaryCharacter) && console.log('start_thirsting...'));

    createRandomCharStateIntervalFaster('thirstingDelay', temporaryCharacter);
    copyCharacterToState(temporaryCharacter, myTamagotchi);

    let thirsting_interval = setInterval(() => {
        (isDebugging(temporaryCharacter) && console.log('thirsting_interval_is_running'));

        if (characterExists(temporaryCharacter)) {
            (isDebugging(temporaryCharacter) && console.log('character_found!'));

            // if(!hasWater(temporaryCharacter)) {
            //   //  (isDebugging(temporaryCharacter) && console.log('character_is_dying!!!'));
            //
            //    deleteCharStateInterval('thirstingDelay', temporaryCharacter);
            //    copyCharacterToState(temporaryCharacter, myTamagotchi);
            //
            //    // clearInterval(thirsting_interval);
            //
            //    // startDying(temporaryCharacter)
            // }

            if (doesPropertyExists('thirstingDelay', temporaryCharacter)) {

                delOnePoint('thirstingDelay', temporaryCharacter)
                if (isDebugging(temporaryCharacter)) console.log('thirstingDelay', temporaryCharacter.thirstingDelay);
                copyCharacterToState(temporaryCharacter, myTamagotchi);

            } else {
                createRandomCharStateIntervalFaster('thirstingDelay', temporaryCharacter);
                copyCharacterToState(temporaryCharacter, myTamagotchi);
            }

            if (isPointZero('thirstingDelay', temporaryCharacter)) {

                if (!isPointZero('water', temporaryCharacter)) {
                    delOnePoint('water', temporaryCharacter);
                    copyCharacterToState(temporaryCharacter, myTamagotchi);

                    console.log(`thirsting... water is ${temporaryCharacter.water}`)

                }

                deleteCharStateInterval('thirstingDelay', temporaryCharacter);
                copyCharacterToState(temporaryCharacter, myTamagotchi);
            }

        }

    },1000)
}
