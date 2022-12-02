const {myTamagotchi} = require("../state");

const {
    characterExists,
    characterIsDying,
    noHp} = require("../locators");

const {
    delOnePoint,
    characterDelete
} = require("../state-operations");

const startDying = (temporaryCharacter) => {

    const temporaryCharacterExists = characterExists(temporaryCharacter)
    const dyingDelay = 10000

    if (temporaryCharacterExists) {
        if (characterIsDying(temporaryCharacter)) {
            let timer_1 = setInterval(() => {
                delOnePoint('hp', temporaryCharacter)
                console.log(`Tamagochi is dying... HP is ${temporaryCharacter.hp}!`)
                if (noHp(temporaryCharacter)) {
                    characterDelete(myTamagotchi)
                    clearInterval(timer_1)
                    console.log('\n Tamagotchi is dead T_T \n || "*" ... RIP ... "*" || \n');
                    process.exit()
                }
            },dyingDelay)
        }
    }
}

module.exports = { startDying };