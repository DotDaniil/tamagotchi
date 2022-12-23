import { myTamagotchi } from "../../../state.js";
import { isDebugging } from "../../../locators.js";

import { enemy } from '../../../state.js';
import {backToZeroPoint, createAbilities, createHealth} from "../../../state-operations.js";
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
    const hpPoint = '♥';
    const lostHpPoint = '♡';
    const hpTimes = Math.round(character.hp / 5);
    const lostTimes = Math.round(20 - hpTimes);
    return character.hp >= 2 ? `${hpPoint.repeat(hpTimes)}${lostHpPoint.repeat(lostTimes)}` : 'Last breath.........';
}

const resolveHpAfterHit = (myCharacter, enemyCharacter) => {
    const hpAfterHit = (character) => character.hp - generateRandomInteger(20);
    enemyCharacter.modifyField('hp', hpAfterHit(enemyCharacter));

    // last hit don't kill my tamagotchi
    if (enemy.hp > 0) {
        myCharacter.modifyField('hp', hpAfterHit(myCharacter));
    }
}

const givePrise = (myPrise, myPriseQuantity) => {
    if (myPrise !== 'money') {

        // fairPrise if > 10
        myTamagotchi.inventory.forEach((item) => {
            if (item.type === myPrise && item.count + myPriseQuantity > 10) {
                item.count = 10
            } else {
                item.count += myPriseQuantity
            }
        })

    } else {
        myTamagotchi.money += myPriseQuantity;
    }
}

const showFightScreen = () => {

    const critMe = (myTamagotchi.prevHp - myTamagotchi.hp) >= 15;
    const critE = (enemy.prevHp - enemy.hp) >= 15;

    const hitMeText = `${enemy.name} hit you for: ${myTamagotchi.prevHp - myTamagotchi.hp} HP! ${critMe ? '⚡CRITICAL HIT⚡' : ''}`;
    const hitEnemyText = `You hit ${enemy.name} for: ${enemy.prevHp - enemy.hp} HP! ${critE ? '⚡CRITICAL HIT⚡' : ''}`;

console.log(`
MY TAMAGOTCHI: ${myTamagotchi.name} 
|${processHpBar(myTamagotchi)}| ${myTamagotchi.hp}%

          vs

|${processHpBar(enemy)}| ${enemy.hp}%
YOUR ENEMY:${enemy.name} 



-------------------------
Actions: h - for hit
-------------------------


     ${myTamagotchi.prevHp !== 0 ? hitMeText : ''}
     ${enemy.prevHp !== 0 ? hitEnemyText : ''}
     
     
     
Type 'r' to run away! \n \n
`)
}


export const fightMenu = (rl, prevMenu) => {
    backToZeroPoint('prevHp', myTamagotchi);
    backToZeroPoint('prevHp', enemy);
    const prises = ['hp', 'food', 'water', 'money'];
    const myPrise = prises[Math.floor(Math.random() * prises.length)];
    const myPriseQuantity = 1 + generateRandomInteger(4)
    const nextWater = generateRandomInteger(20);

    (!isDebugging(myTamagotchi) && console.clear());

    showFightScreen()

    const stdinListener = (data) => {

        switch (data.toString()) {
            case 'h':
                console.clear();

                myTamagotchi.modifyField('prevHp', myTamagotchi.hp)
                enemy.modifyField('prevHp', enemy.hp)

                resolveHpAfterHit(myTamagotchi, enemy);

                if (enemy.hp <= 0) {

                    if (myTamagotchi.hp < 50) myTamagotchi.hp = 50 + generateRandomInteger(50);

                    givePrise(myPrise, myPriseQuantity);

                    if (myTamagotchi.water > nextWater) {
                        myTamagotchi.modifyField('water', myTamagotchi.water - nextWater)
                    }

                    myTamagotchi.modifyField('lvl', myTamagotchi.lvl += 1);
                    myTamagotchi.delField('prevHp');
                    enemy.delField('prevHp');

                    process.stdin.off('data', stdinListener);
                    console.clear();
                    menuBack(rl, prevMenu, `YOU WON, CONGRATULATIONS!
                    ${myTamagotchi[`${myPrise}`] + myPriseQuantity > 10 ? `\nYour prise is ${myPrise} ${myPriseQuantity}`: '' }
                    `);

                } else {
                    showFightScreen()
                }

                if (myTamagotchi.hp <= 0) {
                    myTamagotchi.modifyField('hp', 1);
                    myTamagotchi.delField('prevHp');
                    enemy.delField('prevHp');

                    process.stdin.off('data', stdinListener);
                    console.clear();
                    menuBack(rl, prevMenu, `YOU LOST THE FIGHT!`)
                }

                break;
            case 'r':
                myTamagotchi.delField('prevHp');
                enemy.delField('prevHp');
                process.stdin.off('data', stdinListener);
                showMenu()
                break;
            default:
                console.clear()
                showFightScreen()
        }
    }
        process.stdin.on('data', stdinListener);
}

