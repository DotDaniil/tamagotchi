import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });

import fs from 'fs';

import { myTamagotchi } from './state.js';

import {
    characterRemoveMoney,
    characterAddMoney,
    characterDelete, copyCharacterToState, backToZeroPoint,
} from './state-operations.js';

import { createNewTamagotchi } from './mechanics/create-new-tamagotchi.js';
import { startStarving } from './mechanics/starving.js';
import {characterExists, isDebugging} from "./locators.js";
import {startThirsting} from "./mechanics/thirsting.js";
import {startDying} from "./mechanics/dying.js";

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
                const menuPart = `Your tamagotchi: \n ${JSON.stringify(myTamagotchi)}`;
                myTamagotchi.hasOwnProperty('name') ? console.log(menuPart) : createNewTamagotchi(rl, myTamagotchi, showMenu)
                menuBack(showMenu, menuPart)
                break;
            case why_do_i_have_case_2:
                characterRemoveMoney(1, myTamagotchi);
                saveGame();
                menuBack(showMenu,`Game saved! Money left: ${myTamagotchi.money} coins`)
                break;
            case `cheatmoney`:
                characterAddMoney(5, myTamagotchi);
                menuBack(showMenu, 'Money Added!')
                break;
            case `delchar`:
                characterDelete(myTamagotchi);
                menuBack(showMenu, 'Character deleted!')
                break;
            default: (() => {
                showMenu()
            })()
        }
}

const showMenu = () => {

    // refactor
    const copyCharParam = (temporaryCharacter, param) => temporaryCharacter[param];

    const hpToShow = copyCharParam(myTamagotchi, 'hp');
    const waterToShow = copyCharParam(myTamagotchi, 'water');
    const foodToShow = copyCharParam(myTamagotchi, 'food');

    //

    (!isDebugging(myTamagotchi) && console.clear());
    rl.question(`Main Menu \n 
    1. ${characterExists(myTamagotchi) ? `My tamagotchi: ${myTamagotchi.name}` : 'Create tamagotchi'}
    ${!!myTamagotchi.money ? '2. Save Game (1 coin)': ''}
    


    cheats: cheatmoney (add 5 money); delchar (deletes character)
      \n Type menu number... \n`,
        (input) => menuFunctions(input, showMenu))

    // ${characterExists(myTamagotchi) ? `|HP:${hpToShow} FOOD:${foodToShow} WATER:${waterToShow}|` : ''}
};

const startGame = () => showMenu()

loadGame();
startStarving(myTamagotchi);
startThirsting(myTamagotchi);
backToZeroPoint('dyingProcess', myTamagotchi);
startDying(myTamagotchi);

const startGameWithStatsUpdate = () => {

    console.clear();
    startGame();

    let tempFood,tempWater,tempHp
    const stats_update_timer = setInterval(() => {

        if (tempWater !== myTamagotchi.water || tempFood !== myTamagotchi.food || tempHp !== myTamagotchi.hp) {
            if (characterExists(myTamagotchi)) {
                tempWater = myTamagotchi.water;
                tempFood = myTamagotchi.food;
                tempHp = myTamagotchi.hp;
                console.clear();
                startGame();
            }
        }

    }, 1000)
}
startGame();
// startGameWithStatsUpdate()





// use stages of game for avaluabily of buying things
// killing process state handling
// restore delay after load char
// online stats
// delete duplicates of starving and thirsting func when restore func (items) wll be added