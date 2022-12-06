import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });

import fs from 'fs';

import { myTamagotchi } from './state.js';

import {
    characterRemoveMoney,
    characterAddMoney,
    characterDelete,
    backToZeroPoint,
    addOnePoint,
    setMainMenuIsOpened,
} from './state-operations.js';

import { createNewTamagotchi } from './mechanics/create-new-tamagotchi.js';
import { startStarving } from './mechanics/starving.js';
import {
    characterExists, characterHasLittleWater, characterIsDying, foodIntervalComing,
    isDebugging,
    isMainMenuOpened, waterIntervalComing,
    withoutUpdateStatsDuplicate
} from "./locators.js";
import { startThirsting } from "./mechanics/thirsting.js";
import { startDying } from "./mechanics/dying.js";

const loadGame = () => {
    const loadedData = JSON.parse(fs.readFileSync('./data/character.json'));
    for (const [key, value] of Object.entries(loadedData)) {
        myTamagotchi.modifyField(key, value);
    }
}

const saveGame = () => {
    fs.writeFileSync('./data/character.json', JSON.stringify(myTamagotchi));
}

const menuBack = (prevMenu, prevText) => {
    (!isDebugging(myTamagotchi) && console.clear());
    console.log(prevText)
    rl.question('\n Type `r` to return: \n', (menu) => {
        switch (menu.trim()) {
            case 'r':
                prevMenu()
                break;
            default: (() => {
                menuBack(prevMenu, prevText)
            })()
        }
    })
}

const menuFunctions = (input, showMenu) => {
    const neverWillBeTyped = 'This Game Was Made By Daniil Tikhonov'
    const why_do_i_have_case_2 = `${!!myTamagotchi.money ? '2' : neverWillBeTyped}`;

        switch (input.trim()) {
            case '1':
                setMainMenuIsOpened(myTamagotchi);
                const menuPart = `Your tamagotchi: \n ${JSON.stringify(myTamagotchi)}`;
                myTamagotchi.hasOwnProperty('name') ? console.log(menuPart) : createNewTamagotchi(rl, myTamagotchi, showMenu)
                menuBack(showMenu, menuPart)
                break;
            case why_do_i_have_case_2:
                setMainMenuIsOpened(myTamagotchi);
                characterRemoveMoney(1, myTamagotchi);
                saveGame();
                menuBack(showMenu,`Game saved! Money left: ${myTamagotchi.money} coins`)
                break;
            case `cheatmoney`:
                setMainMenuIsOpened(myTamagotchi);
                characterAddMoney(5, myTamagotchi);
                menuBack(showMenu, 'Money Added!')
                break;
            case `delchar`:
                setMainMenuIsOpened(myTamagotchi);
                characterDelete(myTamagotchi);
                menuBack(showMenu, 'Character deleted!')
                break;
            default: (() => {
                setMainMenuIsOpened(myTamagotchi);
                showMenu()
            })()
        }
}

const showMenu = () => {
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

    rl.question(menuText,
        (input) => menuFunctions(input, showMenu));

};

const startGame = () => showMenu()

loadGame();
startStarving(myTamagotchi);
startThirsting(myTamagotchi);
backToZeroPoint('dyingProcess', myTamagotchi);
backToZeroPoint('updateStatsProcess', myTamagotchi);
startDying(myTamagotchi);


startGame();






// use stages of game for avaluabily of buying things
// killing process state handling
// restore delay after load char ??
// delete duplicates of starving and thirsting func when restore func (items) wll be added
// fix menu bug