import {isDebugging} from "../locators.js";
import {myTamagotchi} from "../state.js";
import {menuBack} from "./menu-back.js";

export const inventory = (rl, prevMenu, prevText) => {
   (!isDebugging(myTamagotchi) && console.clear());
    rl.question(prevText, (menu) => {
        switch (menu.trim()) {

            case '1':
                menuBack(rl, prevMenu, 'Test item activated!')
                break;

            case 'r':
                prevMenu()
                break;
            default: (() => {
                inventory(rl, prevMenu, prevText)
            })()
        }
    })
}