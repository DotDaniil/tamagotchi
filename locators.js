const characterExists = (tamagotchi) => tamagotchi.hasOwnProperty('gender');
const isIntervalZero = (key, character) => character[`${key}`] === 0;
const doesPropertyExists = (key, character) => character.hasOwnProperty(key)
const characterIsDying = (character) => character.food === 0 || character.water === 0;

const noHp = (character) => character.hasOwnProperty('hp') && character.hp === 0;
const hasFood = (character) => character.hasOwnProperty('food') && character.food !== 0;
const hasWater = (character) => character.hasOwnProperty('water') && character.water !== 0;

const isBuffering = (character) => character.hasOwnProperty('buffering') && !!character.buffering;

const isDebugging = (character) => character.hasOwnProperty('debugMode') && !!character.debugMode;

module.exports = {
    characterIsDying,
    characterExists,
    isIntervalZero,
    noHp,
    hasFood,
    hasWater,
    isBuffering,
    isDebugging,
    doesPropertyExists,
}