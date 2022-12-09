import { myTamagotchi } from "../../../state.js";
import { isDebugging } from "../../../locators.js";

import { enemy } from '../../../state.js';
import { createAbilities, createHealth } from "../../../state-operations.js";
import { generateRandomInteger, generateRandomName } from "../../../utils.js";
import {menuBack} from "../../menu-back.js";
import {showMenu} from "../../show-menu.js";
import {inventoryItemsOperation} from "../../inventory/inventory-items-operation.js";


export const createEnemy = (myCharacter, enemyCharacter) => {
    enemyCharacter.name = generateRandomName();
    createHealth(enemyCharacter);
    createAbilities(enemyCharacter);
}

const processHpBar = (character) => {
    const hpPoint = '#';
    const lostHpPoint = '/';
    const littleHp = '!';
    const hpTimes = Math.round(character.hp / 5);
    const lostTimes = Math.round(20 - hpTimes);
    return character.hp >= 0 ? `${hpPoint < 1 ? littleHp : hpPoint.repeat(hpTimes)}${lostHpPoint.repeat(lostTimes)}` : 'Last breath........';
}

const resolveHpAfterHit = (myCharacter, enemyCharacter) => {
    const hpAfterHit = (character) => character.hp - generateRandomInteger(20);
    enemyCharacter.modifyField('hp', hpAfterHit(enemyCharacter));

    // last hit don't kill my tamagotchi
    if (enemy.hp > 0) {
        myCharacter.modifyField('hp', hpAfterHit(myCharacter));
    }
}


export const fightMenu = (rl, prevMenu) => {
    const prises = ['hp', 'food', 'water', 'money'];
    const myPrise = prises[generateRandomInteger(prises.length - 1)];
    const myPriseQuantity = 1 + generateRandomInteger(4)
    const nextWater = generateRandomInteger(20);
    //const hitText = `${myTamagotchi.name.toUpperCase()} HITS FOR: ${}`
    const fightText = `MY TAMAGOTCHI: ${myTamagotchi.name} |${processHpBar(myTamagotchi)}|
    
        _____________________vs_____________________
                         
YOUR ENEMY:${enemy.name} |${processHpBar(enemy)}| \n \n

-------------------------
Actions: hit
-------------------------

     Type 'r' to run away! \n
    `;
    (!isDebugging(myTamagotchi) && console.clear());
    rl.question(fightText, (menu) => {
        switch (menu.trim()) {
            case 'hit':
                resolveHpAfterHit(myTamagotchi, enemy);
                if (enemy.hp <= 0) {
                    if (myTamagotchi.hp < 50) myTamagotchi.hp = 50 + generateRandomInteger(50);
                    if (myPrise !== 'money') {
                        inventoryItemsOperation('add', myPrise, myTamagotchi, 1 + generateRandomInteger(4))
                    } else {
                        myTamagotchi.money += myPriseQuantity;
                    }
                    if (myTamagotchi.water > nextWater) {
                        myTamagotchi.modifyField('water', myTamagotchi.water - nextWater)
                    }

                    myTamagotchi.modifyField('lvl', myTamagotchi.lvl += 1);
                    menuBack(rl, prevMenu, `YOU WON ${myPrise}:${myPriseQuantity}, CONGRATULATIONS!`)
                } else {
                    fightMenu(rl, prevMenu, fightText)
                }
                break;
            case 'r':
                showMenu()
                break;
            default:
                fightMenu(rl, prevMenu, fightText);
        }
    })
}

