import { myTamagotchi } from "../../state.js";
import {addArenaItem, numberOf} from "./utils.js";
import {menuFunctions} from "../show-menu.js";



const showArenaShopText = () => {
    console.clear()
console.log(`Arena Shop:\n \n Press any number to buy...\n \n 
    
Money ====> ${myTamagotchi.money} <====
MegaCrits: ${numberOf('MegaCrit')}
AttackBonus: ${myTamagotchi.attackBonus}

-------------------------
1 - MegaCrit (cost 3)
2 - AttackBonus (+ 1 to attack) (cost 5)
-------------------------
Type 'r' to return \n
`);
}

export const arenaShop = () => {
    showArenaShopText();

    const stdinListener = (data) => {

        switch (data.toString()) {
            case '1':
                console.clear();
                if (myTamagotchi.money - 3 >= 0) {
                    myTamagotchi.modifyField('money', myTamagotchi.money - 3);
                    addArenaItem('MegaCrit');
                    showArenaShopText();
                    console.log('+ 1 MegaCrit');
                } else {
                    showArenaShopText();
                    console.log(`You don't have enough money!`);
                }
                break;
            case '2':
                console.clear()
                if (myTamagotchi.money - 5 >= 0) {
                    myTamagotchi.modifyField('money', myTamagotchi.money - 5);
                    myTamagotchi.modifyField('attackBonus', myTamagotchi.attackBonus + 1);
                    showArenaShopText();
                    console.log('+ 1 AttackBonus');
                } else {
                    showArenaShopText();
                    console.log(`You don't have enough money!`);
                }
                break;
            case 'r':
                process.stdin.off('data', stdinListener);
                menuFunctions();
                break;
            default:
                showArenaShopText();
        }
    }

   process.stdin.on('data', stdinListener);
}