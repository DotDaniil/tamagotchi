const { myTamagotchi } = require('../state');

const { startDying } = require('./dying');

const {
    deleteCharStateInterval,
    createRandomCharStateInterval,
    copyCharacterToState,
    delOnePoint
} = require("../state-operations");
const {hasFood, characterExists, doesIntervalRunning, characterIsDying} = require("../locators");

const startStarving = (temporaryCharacter) => {

    deleteCharStateInterval('starvingDelay', temporaryCharacter);

    let timer_1 = setInterval(() => {
        if (hasFood(temporaryCharacter)) {
            if (characterExists(temporaryCharacter)) {
                if (!doesIntervalRunning('starvingDelay', temporaryCharacter) && hasFood(temporaryCharacter)) {
                    createRandomCharStateInterval('starvingDelay', temporaryCharacter);
                    copyCharacterToState(temporaryCharacter, myTamagotchi);
                    let timer_2 = setInterval(() => {
                        delOnePoint('starvingDelay', temporaryCharacter)
                        copyCharacterToState(temporaryCharacter, myTamagotchi);
                        if (characterIsDying(temporaryCharacter)) {
                            clearInterval(timer_2)
                        }
                    },1000)
                }
                if (temporaryCharacter.starvingDelay === 0 && hasFood(temporaryCharacter)) {
                    delOnePoint('food', temporaryCharacter);
                    copyCharacterToState(temporaryCharacter, myTamagotchi);
                    deleteCharStateInterval('starvingDelay', temporaryCharacter);
                    copyCharacterToState(temporaryCharacter, myTamagotchi);
                    createRandomCharStateInterval('starvingDelay', temporaryCharacter)
                    copyCharacterToState(temporaryCharacter, myTamagotchi);
                    console.log(`starving... food is ${temporaryCharacter.food}`)
                }
                if (!hasFood(temporaryCharacter)) {
                    deleteCharStateInterval('starvingDelay', temporaryCharacter);
                    startDying(temporaryCharacter);
                }
            }
        } else {
            clearInterval(timer_1)
        }
    },1000)
}

module.exports = { startStarving };
