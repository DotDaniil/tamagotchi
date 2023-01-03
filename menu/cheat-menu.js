import { characterDelete } from "../state-operations.js";
import {myTamagotchi, cheatMenuState } from "../state.js";
import {menuBack} from "./menu-back.js";
import {menuFunctions} from "./show-menu.js";
import {rl} from "../main.js";

const cheatText = () => {
    console.log('m,h,f,w,delchar');
    console.log('\n Type `r` to return: \n');
}

export const cheatMenu = (prevMenu) => {
    console.clear()
    cheatText()

    rl.question('\nEnter cheat:\n', (cheat) => {
        switch (cheat.trim()) {
            case 'r':
                prevMenu();
                break;
            case `delchar`:
                characterDelete(myTamagotchi);
                menuBack(menuFunctions, 'Character deleted!')
                break;
            case `h`:
                cheatMenuState.modifyField('on', true)
                additionalMenu('hp');
                break;
            case `f`:
                cheatMenuState.modifyField('on', true)
                additionalMenu('food');
                break;
            case `w`:
                cheatMenuState.modifyField('on', true)
                additionalMenu('water');
                break;
            case `m`:
                cheatMenuState.modifyField('on', true)
                additionalMenu('money');
                break;
            default:
                cheatMenu(menuFunctions);
        }
    })

}

const additionalText = (charLabel) => {
    console.clear()
    console.log(charLabel, '+ or -')
    console.log('\n Type `r` to return: \n');
}

const additionalMenu = (charLabel) => {
    additionalText(charLabel);
    const stdinListener = (data) => {
        switch (data.toString()) {
            case 'r':
                process.stdin.off('data', stdinListener);
                cheatMenuState.modifyField('on', false)
                cheatMenu(menuFunctions)
                break;
            case '+':
                console.clear();
                additionalText(charLabel);
                myTamagotchi[`${charLabel}`] = myTamagotchi[`${charLabel}`] + 1
                console.log(charLabel, myTamagotchi[`${charLabel}`], '+')
                break;
            case '-':
                console.clear();
                additionalText(charLabel);
                myTamagotchi[`${charLabel}`] = myTamagotchi[`${charLabel}`] - 1
                console.log(charLabel, myTamagotchi[`${charLabel}`], '-')
                break;
            default:
                additionalText(charLabel);
        }
    }
    if (!!cheatMenuState.on) {
        process.stdin.on('data', stdinListener);
    }
}
