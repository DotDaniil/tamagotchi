import { myTamagotchi } from '../state.js';

import { startDying } from './dying.js';

import {
    deleteCharStateInterval,
    createRandomCharStateInterval,
    copyCharacterToState,
    delOnePoint
} from "../state-operations.js";

import {
    isDebugging,
    characterExists,
    isIntervalZero,
    characterIsDying,
    doesPropertyExists,
    characterHasLittleWater,
    foodIsNotZero,
} from "../locators.js";

export const startStarving = (temporaryCharacter) => {
    copyCharacterToState(temporaryCharacter, myTamagotchi);

    (isDebugging(temporaryCharacter) && console.log('start_starving...'));

    createRandomCharStateInterval('starvingDelay', temporaryCharacter);
    copyCharacterToState(temporaryCharacter, myTamagotchi);

    let starving_interval = setInterval(() => {
        (isDebugging(temporaryCharacter) && console.log('starving_interval_is_running'));

            if (characterExists(temporaryCharacter)) {
                (isDebugging(temporaryCharacter) && console.log('character_found!'));

                if(characterIsDying(temporaryCharacter)) {
                    (isDebugging(temporaryCharacter) && console.log('character_is_dying!!!'));

                    deleteCharStateInterval('starvingDelay', temporaryCharacter);
                    copyCharacterToState(temporaryCharacter, myTamagotchi);

                    clearInterval(starving_interval);

                    startDying(temporaryCharacter)
                }

                if (doesPropertyExists('starvingDelay', temporaryCharacter)) {


                    delOnePoint('starvingDelay', temporaryCharacter)
                   if (isDebugging(temporaryCharacter)) console.log('starvingDelay', temporaryCharacter.starvingDelay);
                    copyCharacterToState(temporaryCharacter, myTamagotchi);

                    if (isIntervalZero('starvingDelay', temporaryCharacter)) {

                        delOnePoint('food', temporaryCharacter);
                        copyCharacterToState(temporaryCharacter, myTamagotchi);

                        console.log(`starving... food is ${temporaryCharacter.food}`)

                        if (characterHasLittleWater(temporaryCharacter) && foodIsNotZero(temporaryCharacter)) {
                            delOnePoint('food', temporaryCharacter);
                            console.log(`NO WATER, DOUBLE STARVING... food is ${temporaryCharacter.food}`)
                            copyCharacterToState(temporaryCharacter, myTamagotchi);
                        }

                        deleteCharStateInterval('starvingDelay', temporaryCharacter);
                        copyCharacterToState(temporaryCharacter, myTamagotchi);

                        createRandomCharStateInterval('starvingDelay', temporaryCharacter);
                        copyCharacterToState(temporaryCharacter, myTamagotchi);
                    }

                }

            }

    },1000)
}
