import {
    addOnePoint,
    characterAddFood,
    characterAddHp,
    characterAddMoney,
    characterAddWater,
    characterDelete, characterDelFood, characterDelHp, characterDelWater,
    characterRemoveMoney, setMainMenuIsClosed,
    setMainMenuIsOpened
} from "../state-operations.js";
import { myTamagotchi } from "../state.js";
import {
    characterExists, characterHasFullFood,
    characterHasLittleWater,
    characterIsDying,
    foodIntervalComing,
    isDebugging,
    isMainMenuOpened, isPointZero,
    waterIntervalComing,
    withoutUpdateStatsDuplicate
} from "../locators.js";
import { createNewTamagotchi } from "../mechanics/create-new-tamagotchi.js";
import { menuBack } from "./menu-back.js";
import { saveGame } from "./save-load.js";
import { inventory } from "./inventory/inventory.js";
import { arenaMenu } from "./arena/arena-menu.js";
import {cheatMenu} from "./cheat-menu.js";
import {processLvlBar} from "../mechanics/lvl-gaing.js";
import {sleepingImg} from "../mechanics/sleeping.js";
import {earnSomethingGame} from "./earn-something.js";

const tamagotchiPic = `
    ()=() 
    (^;^) 
    C   C 
    ()_() 
`;

const showMenuText = () => {
    const { lvlProcents, lvl, wins, hp, food, water, name, money }  = myTamagotchi;

    console.log(`Main Menu \n 
1. ${characterExists(myTamagotchi) ? `My tamagotchi: ${name}` : 'Create tamagotchi'}
${!!money ? '2. Save Game (1 coin)': ''}
${characterExists(myTamagotchi) ? '3. Inventory' : ''}
${characterExists(myTamagotchi) ? '4. Arena' : ''}
${!characterHasLittleWater(myTamagotchi) ? '5. Search for resources (20 water)' : ''}
${characterExists(myTamagotchi) ? '6. Go to sleep💤 ' : ''}
${characterExists(myTamagotchi) ?
        `___________
| HEALTH${characterHasFullFood(myTamagotchi) ? '+' : ''}:${hp} ${characterIsDying(myTamagotchi) && !isPointZero('hp', myTamagotchi)? '<' : ''}
| 🍏:${food} ${foodIntervalComing(myTamagotchi) && !isPointZero('food', myTamagotchi) ? '<': ''} ${(characterHasLittleWater(myTamagotchi)) ? 'X2<<' : ''}
| 💧:${water} ${waterIntervalComing(myTamagotchi) && !isPointZero('water', myTamagotchi)? '<' : ''}  
| 🪙:${money}
| 🏆:${wins}
|
| LEVEL: ${myTamagotchi.lvlProcents ? lvl + '|'+ processLvlBar(myTamagotchi) + '|' + (lvl + 1): 'Loading...'}
___________`
        : ''}
${(characterHasLittleWater(myTamagotchi)) ? 'WATER IS LESS THEN 20, DOUBLE STARVING' : ''}
${characterIsDying(myTamagotchi) ? `${name} IS DYING!` : ''}

  \n Type menu number... \n
`)
}




export const menuFunctions = () => {
    console.clear()
    const { lvlProcents, lvl, wins, hp, food, water, name, money }  = myTamagotchi;

    const neverWillBeTyped = 'This Game Was Made By Daniil Tikhonov'
    const why_do_i_have_case_2 = `${!!money ? '2' : neverWillBeTyped}`;
    const why_do_i_have_case_3 = `${characterExists(myTamagotchi) ? '3' : neverWillBeTyped}`;
    const why_do_i_have_case_4 = `${characterExists(myTamagotchi) ? '4' : neverWillBeTyped}`;
    const why_do_i_have_case_5 = `${!characterHasLittleWater(myTamagotchi) ? '5' : neverWillBeTyped}`;
    const why_do_i_have_case_6 = `${characterExists(myTamagotchi) ? '6' : neverWillBeTyped}`;

    setMainMenuIsOpened(myTamagotchi);

    if (!characterExists(myTamagotchi)) {

        createNewTamagotchi(myTamagotchi);

    } else {

        statsUpdate();
        myTamagotchi.modifyField('isSleeping', false)

        const stdinListener = (data) => {

            const dataString = data.toString();

            switch (dataString) {
                case '1':
                    process.stdin.off('data', stdinListener);
                    const menuPart = `Your tamagotchi: \n ${JSON.stringify(myTamagotchi)}`;
                    setMainMenuIsClosed(myTamagotchi);
                    menuBack(menuFunctions, menuPart)
                    break;
                case why_do_i_have_case_2:
                    process.stdin.off('data', stdinListener);
                    setMainMenuIsClosed(myTamagotchi);
                    characterRemoveMoney(1, myTamagotchi);
                    saveGame();
                    menuBack(menuFunctions, `Game saved! Money left: ${myTamagotchi.money} coins`)
                    break;
                case why_do_i_have_case_3:
                    process.stdin.off('data', stdinListener);
                    setMainMenuIsClosed(myTamagotchi);
                    inventory(menuFunctions);
                    break;
                case why_do_i_have_case_4:
                    process.stdin.off('data', stdinListener);
                    setMainMenuIsClosed(myTamagotchi);
                    arenaMenu(menuFunctions)
                    break;
                case why_do_i_have_case_5:
                    process.stdin.off('data', stdinListener);
                    setMainMenuIsClosed(myTamagotchi);
                    myTamagotchi.modifyField('water', myTamagotchi.water - 20);
                    earnSomethingGame(menuFunctions);
                    break;
                case why_do_i_have_case_6:
                    process.stdin.off('data', stdinListener);
                    setMainMenuIsClosed(myTamagotchi);
                    myTamagotchi.modifyField('isSleeping', true)
                    menuBack(menuFunctions, sleepingImg);
                    break;
                case `c`:
                    process.stdin.off('data', stdinListener);
                    setMainMenuIsClosed(myTamagotchi);
                    cheatMenu(menuFunctions)
                    break;
                default:
                    console.clear()
                    showMenuText();
            }
        }
            process.stdin.on('data', stdinListener);
    }
}

export const statsUpdate = () => {
    console.clear();
    showMenuText();

    addOnePoint('updateStatsProcess', myTamagotchi);

    if (withoutUpdateStatsDuplicate(myTamagotchi)) {

        let tempFood,tempWater,tempHp;

        const update_stats_interval = setInterval(() => {

            if (characterExists(myTamagotchi) && isMainMenuOpened(myTamagotchi)) {

                if (
                    tempWater !== myTamagotchi.water ||
                    tempFood !== myTamagotchi.food ||
                    tempHp !== myTamagotchi.hp ||
                    foodIntervalComing(myTamagotchi) ||
                    waterIntervalComing(myTamagotchi)
                ) {
                    tempWater = myTamagotchi.water;
                    tempFood = myTamagotchi.food;
                    tempHp = myTamagotchi.hp;

                    console.clear();
                    showMenuText()
                }

            }
        }, 1000)
    }
};

export const startGame = () => menuFunctions();


////     ()=()   ()-()   ()=()   ()-()
//      ('Y')   (':')   (^;^)   ('&')
//      q . p   d . b   C   C   c . c
// jgs  ()_()   ()_()   ()_()   ()=()


