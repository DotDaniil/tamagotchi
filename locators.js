//character
export const characterIsDying = (character) => character.food === 0;
export const characterHasFullFood = (character) => character.food === 100;
export const characterHasLittleWater = (character) => character.water < 20;
export const foodIntervalComing = (character) => character.starvingDelay <= 3;
export const waterIntervalComing = (character) => character.thirstingDelay <= 3;
export const noHp = (character) => character.hasOwnProperty('hp') && character.hp <= 0;
export const foodIsNotOne = (character) => character.hasOwnProperty('food') && character.food > 1;
export const hasWater = (character) => character.hasOwnProperty('water') && character.water !== 0;


// system
export const isDebugging = (character) => character.hasOwnProperty('debugMode') && !!character.debugMode;
export const withoutDyingDuplicate = (character) => character.dyingProcess === 1;
export const withoutUpdateStatsDuplicate = (character) => character.updateStatsProcess === 1;
export const isMainMenuOpened = (character) => !!character.isMainMenuOpened;
export const characterExists = (character) => character.hasOwnProperty('gender');
export const isPointZero = (key, character) => character[`${key}`] === 0;
export const doesPropertyExists = (key, character) => character.hasOwnProperty(key);
