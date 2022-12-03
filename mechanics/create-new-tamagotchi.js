const {
    createHealth,
    createIntellect,
    createStrength,
    createFood,
    createWater,
    createItems,
    createMoney,
    createAliveFlag
} = require("../state-operations");
const { isDebugging } = require("../locators");

const createNewTamagotchi = (readline, character, showMenu) => {
    (!isDebugging(character) && console.clear());

    const askName = (nextFunction) => readline.question('\n Enter tamagotchi name: \n', (name) => {
        character.modifyField('name', name);
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
            createWater(character);
            createItems(character);
            createMoney(character);
            createAliveFlag(character);

            showMenu();
        }

        askName(() => askGender(() => createOtherAndReturnToMenu()))
    }

    initiateCreation();

}

module.exports = { createNewTamagotchi }