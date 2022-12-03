const { myTamagotchi } = require('../state');

const { startDying } = require('./dying');

const {
    deleteCharStateInterval,
    createRandomCharStateInterval,
    copyCharacterToState,
    delOnePoint
} = require("../state-operations");
const {
    isDebugging,
    characterExists,
    isIntervalZero,
    characterIsDying,
    doesPropertyExists,
} = require("../locators");

const startStarving = (temporaryCharacter) => {
    // copyCharacterToState(temporaryCharacter, myTamagotchi);
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
                        // console.log(temporaryCharacter);
                   if (isDebugging(temporaryCharacter)) console.log('delay', temporaryCharacter.starvingDelay);
                    copyCharacterToState(temporaryCharacter, myTamagotchi);

                    if (isIntervalZero('starvingDelay', temporaryCharacter)) {

                        delOnePoint('food', temporaryCharacter);
                        copyCharacterToState(temporaryCharacter, myTamagotchi);

                        console.log(`starving... food is ${temporaryCharacter.food}`)

                        deleteCharStateInterval('starvingDelay', temporaryCharacter);
                        copyCharacterToState(temporaryCharacter, myTamagotchi);

                        createRandomCharStateInterval('starvingDelay', temporaryCharacter);
                        copyCharacterToState(temporaryCharacter, myTamagotchi);
                    }
                }

            }

    },1000)
}

module.exports = { startStarving };
