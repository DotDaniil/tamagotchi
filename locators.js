const characterExists = (tamagotchi) => tamagotchi.hasOwnProperty('gender');
const doesIntervalRunning = (key, tamagotchi) => tamagotchi.hasOwnProperty(key) && tamagotchi.key !== 0;
const characterIsDying = (tamagotchi) => tamagotchi.food === 0 || tamagotchi.water === 0;
const noHp = (tamagotchi) => tamagotchi.hp === 0;
const hasFood = (tamagotchi) => tamagotchi.food !== 0;

module.exports = {
    characterIsDying,
    characterExists,
    doesIntervalRunning,
    noHp,
    hasFood,
}