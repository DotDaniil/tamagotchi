export const characterExists = (character) => character.hasOwnProperty('gender');
export const isIntervalZero = (key, character) => character[`${key}`] === 0;
export const doesPropertyExists = (key, character) => character.hasOwnProperty(key)
export const characterIsDying = (character) => character.food === 0 || character.water === 0;

export const noHp = (character) => character.hasOwnProperty('hp') && character.hp === 0;
//export const hasFood = (character) => character.hasOwnProperty('food') && character.food !== 0;
//export const hasWater = (character) => character.hasOwnProperty('water') && character.water !== 0;

export const isDebugging = (character) => character.hasOwnProperty('debugMode') && !!character.debugMode;
