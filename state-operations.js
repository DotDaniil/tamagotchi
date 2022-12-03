const fs = require('fs');
const { generateRandomInteger } = require('./utils');

const characterRemoveMoney = (amount, character) => character.modifyField('money', character.money - amount)
const characterAddMoney = (amount, character) => character.modifyField('money', character.money + amount)
const characterDelete = (character) =>  {
    fs.writeFileSync('./data/character.json', '{}');
    for (const [key, _] of Object.entries(character)) {
        character.delField(key);
    }
}

const createHealth = (character) => character.modifyField('hp',10 + generateRandomInteger(0))
const createIntellect = (character) => character.modifyField('intellect', 90 + generateRandomInteger(10));
const createStrength = (character) => character.modifyField('strength', 1 + generateRandomInteger(2));
const createFood = (character) => character.modifyField('food', 10 + generateRandomInteger(0));
const createWater = (character) => character.modifyField('water', 50 + generateRandomInteger(50));
const createMoney = (character) => character.modifyField('money', 1 + generateRandomInteger(4));
const createItems = (character) => character.modifyField('items', {'item1': 'test', 'item2': 'test'})
const createDebugModeFlag = (character) => character.modifyField('debugMode', true);

const copyCharacterToState = (temporaryStateCharacter, stateCharacter) => {
    const temporaryStateCharacterCopy = JSON.parse(JSON.stringify(temporaryStateCharacter));
    for (const [key, _] of Object.entries(stateCharacter)) {
        stateCharacter.delField(key);
    }

    for (const [key, value] of Object.entries(temporaryStateCharacterCopy)) {
        stateCharacter.modifyField(key, value);
    }
}

const createRandomCharStateInterval = (key, character) => character.modifyField(key, 10 + generateRandomInteger(20));

const deleteCharStateInterval = (key, character) => character.delField(key);
const delOnePoint = (key, character) => character.modifyField(key, character[key] -= 1);

module.exports = {
    characterDelete,
    characterRemoveMoney,
    characterAddMoney,
    createHealth,
    createIntellect,
    createStrength,
    createFood,
    createWater,
    createMoney,
    createItems,
    createDebugModeFlag,
    copyCharacterToState,
    delOnePoint,
    createRandomCharStateInterval,
    deleteCharStateInterval
};