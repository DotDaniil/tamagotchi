import { enemy, myTamagotchi } from "../../state.js";
import { createEnemy, fightMenu } from "./fight/fight-menu.js";
import { menuBack } from "../menu-back.js";
import { numberOf } from "./utils.js";
import { arenaShop } from "./arena-shop.js";
import { rl } from "../../main.js";
import { menuFunctions } from "../show-menu.js";


const arenaText = () => {
    console.clear()
    console.log(`Welcome to ARENA:\n \n
1. Start to fight!
2. Arena Shop \n\n 
-------------------------
MegaCrits: ${numberOf('MegaCrit')}
-------------------------
Type 'r' to return \n
`);}

export const arenaMenu = () => {
    arenaText();
    const stdinListener = (data) => {
            switch (data.toString()) {
                case '1':
                   process.stdin.off('data', stdinListener);
                    if (myTamagotchi.hp > 1) {
                        createEnemy(myTamagotchi, enemy);
                        fightMenu(arenaMenu)
                    } else {
                        menuBack(menuFunctions, `Enter is FORBIDDEN! Your hp is 1. YOU WILL DIE, IF YOU ENTER!!!`)
                    }
                    break;
                case '2':
                    process.stdin.off('data', stdinListener);
                    arenaShop();
                    break;
                case 'r':
                    process.stdin.off('data', stdinListener);
                    menuFunctions();
                    break;
                default:
                    arenaText();
            }
        }
   process.stdin.on('data', stdinListener);
}