import fs from 'fs';
import { generateRandomInteger } from './utils.js';

export const characterRemoveMoney = (amount, character) => character.modifyField('money', character.money - amount)
export const characterAddMoney = (amount, character) => character.modifyField('money', character.money + amount)
export const characterDelete = (character) =>  {
    fs.writeFileSync('./data/character.json', '{}');
    for (const [key, _] of Object.entries(character)) {
        character.delField(key);
    }
}

export const createHealth = (character) => character.modifyField('hp',10 + generateRandomInteger(0))
export const createIntellect = (character) => character.modifyField('intellect', 90 + generateRandomInteger(10));
export const createStrength = (character) => character.modifyField('strength', 1 + generateRandomInteger(2));
export const createFood = (character) => character.modifyField('food', 20 + generateRandomInteger(0));
export const createWater = (character) => character.modifyField('water', 12 + generateRandomInteger(0));
export const createMoney = (character) => character.modifyField('money', 1 + generateRandomInteger(4));
export const createItems = (character) => character.modifyField('items', {'item1': 'test', 'item2': 'test'})
export const createDebugModeFlag = (character) => character.modifyField('debugMode', true);

export const copyCharacterToState = (temporaryStateCharacter, stateCharacter) => {
    const temporaryStateCharacterCopy = JSON.parse(JSON.stringify(temporaryStateCharacter));
    for (const [key, _] of Object.entries(stateCharacter)) {
        stateCharacter.delField(key);
    }

    for (const [key, value] of Object.entries(temporaryStateCharacterCopy)) {
        stateCharacter.modifyField(key, value);
    }
}

export const createRandomCharStateInterval = (key, character) => character.modifyField(key, 10 + generateRandomInteger(20));

export const deleteCharStateInterval = (key, character) => character.delField(key);
export const delOnePoint = (key, character) => character.modifyField(key, character[key] -= 1);
export const addOnePoint = (key, character) => character.modifyField(key, character[key] += 1);
export const backToZeroPoint = (key, character) => character.modifyField(key, character[key] = 0);
