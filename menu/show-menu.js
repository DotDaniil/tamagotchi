import {
    addOnePoint,
    characterAddMoney,
    characterDelete,
    characterRemoveMoney,
    setMainMenuIsOpened
} from "../state-operations.js";
import { myTamagotchi } from "../state.js";
import {
    characterExists,
    characterHasLittleWater,
    characterIsDying,
    foodIntervalComing,
    isDebugging,
    isMainMenuOpened,
    waterIntervalComing,
    withoutUpdateStatsDuplicate
} from "../locators.js";
import { createNewTamagotchi } from "../mechanics/create-new-tamagotchi.js";
import { menuBack } from "./menu-back.js";
import { saveGame } from "./save-load.js";

// import * as readline from 'node:readline';
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";



const rl = readline.createInterface({ input, output });


export const menuFunctions = (input, showMenu) => {
    const neverWillBeTyped = 'This Game Was Made By Daniil Tikhonov'
    const why_do_i_have_case_2 = `${!!myTamagotchi.money ? '2' : neverWillBeTyped}`;

    switch (input.trim()) {
        case '1':
            setMainMenuIsOpened(myTamagotchi);
            const menuPart = `Your tamagotchi: \n ${JSON.stringify(myTamagotchi)}`;
            myTamagotchi.hasOwnProperty('name') ? console.log(menuPart) : createNewTamagotchi(rl, myTamagotchi, showMenu)
            menuBack(rl, () => showMenu(menuFunctions), menuPart)
            break;
        case why_do_i_have_case_2:
            setMainMenuIsOpened(myTamagotchi);
            characterRemoveMoney(1, myTamagotchi);
            saveGame();
            menuBack(rl, () => showMenu(menuFunctions),`Game saved! Money left: ${myTamagotchi.money} coins`)
            break;
        case `cheatmoney`:
            setMainMenuIsOpened(myTamagotchi);
            characterAddMoney(5, myTamagotchi);
            menuBack(rl, () => showMenu(menuFunctions), 'Money Added!')
            break;
        case `delchar`:
            setMainMenuIsOpened(myTamagotchi);
            characterDelete(myTamagotchi);
            menuBack(rl, () => showMenu(menuFunctions), 'Character deleted!')
            break;
        default: (() => {
            setMainMenuIsOpened(myTamagotchi);
            showMenu(menuFunctions)
        })()
    }
}


export const showMenu = () => {
    console.clear();

    setMainMenuIsOpened(myTamagotchi);

    const setMenuTextWithStats = (temporaryCharacter) => {
        const { hp, food, water, name, money }  = temporaryCharacter;

        return `Main Menu \n 
    1. ${characterExists(myTamagotchi) ? `My tamagotchi: ${name}` : 'Create tamagotchi'}
    ${!!money ? '2. Save Game (1 coin)': ''}
    
    ${characterExists(myTamagotchi) ?
            `___________
    | HP:${hp} ${characterIsDying(myTamagotchi) ? '<' : ''}
    | FOOD:${food} ${foodIntervalComing(myTamagotchi) ? '<': ''} ${(characterHasLittleWater(myTamagotchi)) ? 'X2<<' : ''}
    | WATER:${water} ${waterIntervalComing(myTamagotchi) ? '<' : ''}  
    | MONEY:${money}
    ___________`
            : ''}
    
    ${(characterHasLittleWater(myTamagotchi)) ? 'WATER IS LESS THEN 10, DOUBLE STARVING' : ''}
    ${characterIsDying(myTamagotchi) ? `${name} IS DYING!` : ''}

    cheats: cheatmoney (add 5 money); delchar (deletes character)
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