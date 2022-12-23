import { enemy, myTamagotchi } from "../../state.js";
import { isDebugging } from "../../locators.js";
import {createEnemy, fightMenu} from "./fight/fight-menu.js";
import {menuBack} from "../menu-back.js";

export const arenaMenu = (rl, prevMenu) => {
    const arenaText = `Welcome to ARENA:\n \n 1. Start to fight! \n \n Type 'r' to return \n`;
    (!isDebugging(myTamagotchi) && console.clear());
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
            case 'r':
                prevMenu()
                break;
            default: (() => {
                arenaMenu(rl, prevMenu, arenaText)
            })()
        }
    })
}