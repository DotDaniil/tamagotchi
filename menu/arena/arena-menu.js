import { enemy, myTamagotchi } from "../../state.js";
import { isDebugging } from "../../locators.js";
import { createEnemy, fightMenu } from "./fight/fight-menu.js";
import { menuBack } from "../menu-back.js";
import { numberOf } from "./utils.js";
import { arenaShop } from "./arena-shop.js";

export const arenaMenu = (rl, prevMenu) => {
    console.clear()
    const arenaText = `Welcome to ARENA:\n \n
    1. Start to fight!
    2. Arena Shop \n\n 
-------------------------
MegaCrits: ${numberOf('MegaCrit')}
-------------------------
Type 'r' to return \n
`;

    rl.question(arenaText, (menu) => {
        switch (menu.trim()) {
            case '1':
                createEnemy(myTamagotchi, enemy);
                if (myTamagotchi.hp > 1) {
                    fightMenu(rl, () => arenaMenu(rl, prevMenu))
                } else {
                    menuBack(rl, prevMenu, `Enter is FORBIDDEN! Your hp is 1. YOU WILL DIE, IF YOU ENTER!!!`)
                }
                break;
            case '2':
                arenaShop(prevMenu)
                break;
            case 'r':
                prevMenu();
                break;
            default:
                arenaMenu(rl, prevMenu, arenaText);
        }
    })
}