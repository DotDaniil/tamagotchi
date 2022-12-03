const {myTamagotchi} = require("../state");

const {
    characterExists,
    characterIsDying,
    noHp} = require("../locators");

const {
    delOnePoint,
    characterDelete, copyCharacterToState
} = require("../state-operations");

const startDying = (temporaryCharacter) => {

    //TODO: удалить дубликат процесса функции, когда будет реализовано жажда

    copyCharacterToState(temporaryCharacter, myTamagotchi);

        let dying_interval = setInterval(() => {

            if (characterExists(temporaryCharacter)) {

                if (characterIsDying(temporaryCharacter)) {

                delOnePoint('hp', temporaryCharacter)
                copyCharacterToState(temporaryCharacter, myTamagotchi);

                console.log(`Tamagochi is dying... HP is ${temporaryCharacter.hp}!`)

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

module.exports = { startDying };