import { isDebugging } from "../../locators.js";
import { myTamagotchi } from "../../state.js";
import { menuBack}  from "../menu-back.js";
import { inventoryItemsOperation } from "./inventory-items-operation.js";
import { rl } from "../../main.js";
import {menuFunctions} from "../show-menu.js";

const inventoryText = () => {
    console.clear();
    console.log(`Your inventory:\n \n 🍏: ${myTamagotchi.inventory[0].count} 🧃: ${myTamagotchi.inventory[1].count} 💊: ${myTamagotchi.inventory[2].count} \n \n ------------------------- \n Actions: e-eat, d-drink, h-heal \n ------------------------- \n \n Type 'r' to return \n`);
}


export const inventory = (prevMenu) => {
    inventoryText()
    rl.question('', (menu) => {
        switch (menu.trim()) {
            case 'e':
                if (myTamagotchi.inventory[0].count) {
                    inventoryItemsOperation('activate', 'food', myTamagotchi);
                    inventory(menuFunctions);
                    console.log(`You drink 1 🍏! Now food is:${myTamagotchi.food}`);
                } else {
                    inventory(menuFunctions);
                    console.log(`You don't have any 🍏 TˆT ...`);
                }
                break;
            case 'd':
                if (myTamagotchi.inventory[1].count) {
                    inventoryItemsOperation('activate', 'water', myTamagotchi);
                    inventory(menuFunctions);
                    console.log(`You drink 1 🧃! Now water is:${myTamagotchi.water}`);
                } else {
                    inventory(menuFunctions);
                    console.log(`You don't have any 🧃 TˆT ...`);
                }
                break;
            case 'h':
                if (myTamagotchi.inventory[2].count) {
                    inventoryItemsOperation('activate', 'hp', myTamagotchi);
                    inventory(menuFunctions);
                    console.log(`You heal with 1 💊! Now hp is:${myTamagotchi.hp}`);
                } else {
                    inventory(menuFunctions);
                    console.log(`You don't have any 💊 TˆT ...`);
                }
                break;
            case 'r':
                prevMenu()
                break;
            default:
                inventory(menuFunctions);
        }
    })
}