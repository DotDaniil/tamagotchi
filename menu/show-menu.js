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

import * as readline from 'node:readline';
// import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { inventory } from "./inventory/inventory.js";
import {arenaMenu} from "./arena/arena-menu.js";



const rl = readline.createInterface({ input, output });

const tamagotchiPic = `
    ()=() 
    (^;^) 
    C   C 
    ()_() 
`;


export const menuFunctions = (input, showMenu) => {
    const neverWillBeTyped = 'This Game Was Made By Daniil Tikhonov'
    const why_do_i_have_case_2 = `${!!myTamagotchi.money ? '2' : neverWillBeTyped}`;
    const why_do_i_have_case_3 = `${characterExists(myTamagotchi) ? '3' : neverWillBeTyped}`;
    const why_do_i_have_case_4 = `${characterExists(myTamagotchi) ? '4' : neverWillBeTyped}`;

        switch (input.trim()) {
            case '1':
                const menuPart = `Your tamagotchi: \n ${JSON.stringify(myTamagotchi)}`;
                setMainMenuIsClosed(myTamagotchi);
                if (!characterExists(myTamagotchi)) createNewTamagotchi(rl, myTamagotchi, showMenu);
                menuBack(rl, showMenu, characterExists(myTamagotchi) ? menuPart : '')
                break;
            case why_do_i_have_case_2:
                setMainMenuIsClosed(myTamagotchi);
                characterRemoveMoney(1, myTamagotchi);
                saveGame();
                menuBack(rl, showMenu, `Game saved! Money left: ${myTamagotchi.money} coins`)
                break;
            case why_do_i_have_case_3:
                setMainMenuIsClosed(myTamagotchi);
                inventory(rl, showMenu);
                break;
            case why_do_i_have_case_4:
                setMainMenuIsClosed(myTamagotchi);
                arenaMenu(rl, showMenu)
                break;
            case `money`:
                setMainMenuIsClosed(myTamagotchi);
                characterAddMoney(5, myTamagotchi);
                menuBack(rl, showMenu, 'Money Added!')
                break;
            case `delchar`:
                setMainMenuIsClosed(myTamagotchi);
                characterDelete(myTamagotchi);
                menuBack(rl, showMenu, 'Character deleted!')
                break;
            case `h+`:
                setMainMenuIsClosed(myTamagotchi);
                characterAddHp(10, myTamagotchi);
                menuBack(rl, showMenu, 'HP Added!')
                break;
            case `f+`:
                setMainMenuIsClosed(myTamagotchi);
                characterAddFood(10, myTamagotchi);
                menuBack(rl, showMenu, 'Food Added!')
                break;
            case `w+`:
                setMainMenuIsClosed(myTamagotchi);
                characterAddWater(10, myTamagotchi);
                menuBack(rl, showMenu, `Water Added!`)
                break;
            case `h-`:
                setMainMenuIsClosed(myTamagotchi);
                characterDelHp(10, myTamagotchi);
                menuBack(rl, showMenu, 'HP Deleted!')
                break;
            case `f-`:
                setMainMenuIsClosed(myTamagotchi);
                characterDelFood(10, myTamagotchi);
                menuBack(rl, showMenu, 'Food Deleted!')
                break;
            case `w-`:
                setMainMenuIsClosed(myTamagotchi);
                characterDelWater(10, myTamagotchi);
                menuBack(rl, showMenu, 'Water Deleted!')
                break;
            default:
                (() => {
                    setMainMenuIsClosed(myTamagotchi);
                    showMenu()
                })()
        }
}


export const showMenu = () => {
    console.clear();

    setMainMenuIsOpened(myTamagotchi);

    const setMenuTextWithStats = (temporaryCharacter) => {
        const { lvl, hp, food, water, name, money }  = temporaryCharacter;

        return `Main Menu \n 
    1. ${characterExists(myTamagotchi) ? `My tamagotchi: ${name}` : 'Create tamagotchi'}
    ${!!money ? '2. Save Game (1 coin)': ''}
    ${characterExists(myTamagotchi) ? '3. Inventory' : ''}
    ${characterExists(myTamagotchi) ? '4. Arena' : ''}
    ${characterExists(myTamagotchi) ?
            `___________
    | HEALTH${characterHasFullFood(myTamagotchi) ? '+' : ''}:${hp} ${characterIsDying(myTamagotchi) && !isPointZero('hp', myTamagotchi)? '<' : ''}
    | 🍏:${food} ${foodIntervalComing(myTamagotchi) && !isPointZero('food', myTamagotchi) ? '<': ''} ${(characterHasLittleWater(myTamagotchi)) ? 'X2<<' : ''}
    | 💧:${water} ${waterIntervalComing(myTamagotchi) && !isPointZero('water', myTamagotchi)? '<' : ''}  
    | 🪙:${money}
    | 🏆:${lvl}
    ___________`
            : ''}
    ${(characterHasLittleWater(myTamagotchi)) ? 'WATER IS LESS THEN 10, DOUBLE STARVING' : ''}
    ${characterIsDying(myTamagotchi) ? `${name} IS DYING!` : ''}
    
      \n Type menu number... \n`;
    }

    let menuText = setMenuTextWithStats(myTamagotchi);




    //update stats

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
                    console.log(setMenuTextWithStats(myTamagotchi))
                }

            }
        }, 1000)
    }

    //



    (!isDebugging(myTamagotchi) && console.clear());

    rl.question(menuText, (input) => menuFunctions(input, showMenu));

};

export const startGame = () => showMenu();

////     ()=()   ()-()   ()=()   ()-()
//      ('Y')   (':')   (^;^)   ('&')
//      q . p   d . b   C   C   c . c
// jgs  ()_()   ()_()   ()_()   ()=()


