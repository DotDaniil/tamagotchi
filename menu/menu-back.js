import {isDebugging} from "../locators.js";
import {myTamagotchi} from "../state.js";

export const menuBack = (rl, prevMenu, prevText) => {
    console.clear()
    console.log(prevText)
    rl.question('\n Type `r` to return: \n', (menu) => {
        switch (menu.trim()) {
            case 'r':
                prevMenu()
                break;
            default:
                menuBack(rl, prevMenu, prevText)
        }
    })
}