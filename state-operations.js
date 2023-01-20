import fs from 'fs';
import { generateRandomInteger } from './utils.js';
import { myTamagotchi } from "./state.js";
import { characterExists } from "./locators.js";

export const characterRemoveMoney = (amount, character) => character.modifyField('money', character.money - amount);
export const characterAddMoney = (amount, character) => character.modifyField('money', character.money + amount);
export const characterAddHp = (amount, character) => character.modifyField('hp', character.hp + amount);
export const characterAddFood = (amount, character) => character.modifyField('food', character.food + amount);
export const characterAddWater = (amount, character) => character.modifyField('water', character.water + amount);
export const characterDelHp = (amount, character) => character.modifyField('hp', character.hp - amount);
export const characterDelFood = (amount, character) => character.modifyField('food', character.food - amount);
export const characterDelWater = (amount, character) => character.modifyField('water', character.water - amount);
export const characterDelete = (character) =>  {
    fs.writeFileSync('./data/character.json', '{}');
    for (const [key, _] of Object.entries(character)) {
        character.delField(key);
    }
}

const abilities = [{hit: {power: 1, lvl: 0}}]
const ballanceHpAndLvl = (character) => !!character.lvl ? 80 + character.lvl : 80;

export const createHealth = (character) => character.modifyField('hp',!!character.gender ? 80 + generateRandomInteger(20) : ballanceHpAndLvl(character) + generateRandomInteger(100 - ballanceHpAndLvl(character)));
export const createIntellect = (character) => character.modifyField('intellect', 1 + generateRandomInteger(2));
export const createStrength = (character) => character.modifyField('strength', 1 + generateRandomInteger(2));
export const createWins = (character) => character.modifyField('wins', 0);
export const createLvl = (character) => character.modifyField('lvl', 0);
export const createExp = (character) => character.modifyField('exp', 0);
export const createFood = (character) => character.modifyField('food', 20 + generateRandomInteger(30));
export const createAttackBonus = (character) => character.modifyField('attackBonus', 0);
export const createWater = (character) => character.modifyField('water', 20 + generateRandomInteger(30));
export const createMoney = (character) => character.modifyField('money', 1);
export const createItems = (character) => character.modifyField('inventory', [ {type: 'food', count: 0}, {type: 'water', count: 0}, {type: 'hp', count: 0} ]);
export const createArenaItems = (character) => character.modifyField('arenaItems', []);
export const createAbilities = (character) => character.modifyField('abilities', abilities );

export const createIsMainMenuOpened = (character) => character.modifyField('isMainMenuOpened', false);
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

export const createRandomCharStateInterval = (key, character) => character.modifyField(key, 10 + generateRandomInteger(40));
export const createRandomCharStateIntervalFaster = (key, character) => character.modifyField(key, 5 + generateRandomInteger(20));
export const setMainMenuIsOpened = (character) => character.modifyField('isMainMenuOpened', character.isMainMenuOpened = true);
export const setMainMenuIsClosed = (character) => character.modifyField('isMainMenuOpened', character.isMainMenuOpened = false);
export const deleteCharStateInterval = (key, character) => character.delField(key);
export const delOnePoint = (key, character) => character.modifyField(key, character[key] -= 1);
export const addOnePoint = (key, character) => character.modifyField(key, character[key] += 1);
export const backToZeroPoint = (key, character) => character.modifyField(key, character[key] = 0);
