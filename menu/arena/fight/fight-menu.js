import { myTamagotchi } from "../../../state.js";
import { enemy } from '../../../state.js';
import { backToZeroPoint, createAbilities, createHealth } from "../../../state-operations.js";
import { generateRandomInteger, generateRandomName } from "../../../utils.js";
import { menuBack } from "../../menu-back.js";
import { showMenu } from "../../show-menu.js";
import { hasItem, numberOf } from "../utils.js";


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

const resolveHpAfterHit = (myCharacter, enemyCharacter, buff) => {
    const myHpAfterHit = (character) => character.hp - generateRandomInteger(20);
    const enemyHpAfterHit = (character) => character.hp - (generateRandomInteger(20) + buff);
    enemyCharacter.modifyField('hp', enemyHpAfterHit(enemyCharacter));

    // last hit don't kill my tamagotchi
    if (enemy.hp > 0) {
        myCharacter.modifyField('hp', myHpAfterHit(myCharacter));
    }
}

const givePrise = (myPrise, myPriseQuantity) => {
    if (myPrise !== 'money') {

        // fairPrise if > 10
        myTamagotchi.inventory.forEach((item) => {

            if (item.type === myPrise) {
                if (item.count + myPriseQuantity > 10) {
                    item.count = 10
                } else {
                    item.count += myPriseQuantity
                }
            }
        })

    } else {
        myTamagotchi.money += myPriseQuantity;
    }
}

const looseFight = (character, enemy, stdinListener) => {
    character.modifyField('hp', 1);
    character.delField('prevHp');
    enemy.delField('prevHp');

    process.stdin.off('data', stdinListener);
    console.clear();
}

const winFight = (character, enemy, stdinListener) => {
    character.modifyField('lvl', myTamagotchi.lvl += 1);
    character.delField('prevHp');
    enemy.delField('prevHp');

    process.stdin.off('data', stdinListener);
    console.clear();
}

const imbalanceWinCondition = (character) => {
    const nextWater = generateRandomInteger(20);
    if (character.hp < 50) character.hp = 50 + generateRandomInteger(50);

    if (character.water > nextWater) {
        character.modifyField('water', character.water - nextWater)
    }
}

const createPrevHpField = (character, enemy) => {
    character.modifyField('prevHp', character.hp)
    enemy.modifyField('prevHp', enemy.hp)
}

const returnLetterIfItemExist = (itemName, letter) => hasItem(itemName) ? letter : 'Hello World!'

const delArenaItem = (itemName) => {
    const { arenaItems } = myTamagotchi;
    const itemIdx = arenaItems.indexOf(itemName);
    const newItems = arenaItems.splice(itemIdx + 1, arenaItems.length);
    myTamagotchi.modifyField('arenaItems', newItems);
};

const resolveFight = (character, enemy, rl, prevMenu, stdinListener) => {
    const prises = ['hp', 'food', 'water', 'money'];
    const myPrise = prises[Math.floor(Math.random() * prises.length)];
    const myPriseQuantity = 1 + generateRandomInteger(4)

    if (enemy.hp <= 0) {
        imbalanceWinCondition(myTamagotchi);
        givePrise(myPrise, myPriseQuantity);
        winFight(myTamagotchi, enemy, stdinListener);
        menuBack(rl, prevMenu, `YOU WON, CONGRATULATIONS!
                ${myTamagotchi[`${myPrise}`] + myPriseQuantity > 10 ? `\nYour prise is ${myPrise} ${myPriseQuantity}`: '' }
                `);
    } else {
        showFightScreen()
    }

    if (myTamagotchi.hp <= 0) {
        looseFight(myTamagotchi, enemy, stdinListener)
        menuBack(rl, prevMenu, `YOU LOST THE FIGHT!`)
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
Actions: 
h - for hit
m - for MegaCrit:${numberOf('MegaCrit')}
-------------------------


     ${myTamagotchi.prevHp !== 0 ? hitMeText : ''}
     ${enemy.prevHp !== 0 ? hitEnemyText : ''}
     
     
     
Type 'r' to run away! \n \n
`)
}



export const fightMenu = (rl, prevMenu) => {
    console.clear();
    backToZeroPoint('prevHp', myTamagotchi);
    backToZeroPoint('prevHp', enemy);

    showFightScreen()

    const stdinListener = (data) => {

        switch (data.toString()) {
            case "h":
                console.clear();

                createPrevHpField(myTamagotchi, enemy);

                resolveHpAfterHit(myTamagotchi, enemy, 0);

                resolveFight(myTamagotchi, enemy, rl, prevMenu, stdinListener)

                break;
            case returnLetterIfItemExist('MegaCrit', 'm'):
                console.clear();

                createPrevHpField(myTamagotchi, enemy);

                delArenaItem('MegaCrit');

                resolveHpAfterHit(myTamagotchi, enemy, 30);

                resolveFight(myTamagotchi, enemy, rl, prevMenu, stdinListener)

                break;
            case 'r' :
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

