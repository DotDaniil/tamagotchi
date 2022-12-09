import { enemy, myTamagotchi } from "../../state.js";
import { isDebugging } from "../../locators.js";
import {createEnemy, fightMenu} from "./fight/fight-menu.js";

export const arenaMenu = (rl, prevMenu) => {
    const arenaText = `Welcome to ARENA:\n \n 1. Start to fight! \n \n Type 'r' to return \n`;
    (!isDebugging(myTamagotchi) && console.clear());
    rl.question(arenaText, (menu) => {
        switch (menu.trim()) {
            case '1':
                createEnemy(myTamagotchi, enemy);
                fightMenu(rl, () => arenaMenu(rl, prevMenu))
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