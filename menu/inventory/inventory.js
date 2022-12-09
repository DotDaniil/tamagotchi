import { isDebugging } from "../../locators.js";
import { myTamagotchi } from "../../state.js";
import { menuBack}  from "../menu-back.js";
import { inventoryItemsOperation } from "./inventory-items-operation.js";

export const inventory = (rl, prevMenu) => {
    const inventoryText = `Your inventory:\n \n 🍏: ${myTamagotchi.inventory[0].count} 🧃: ${myTamagotchi.inventory[1].count} 💊: ${myTamagotchi.inventory[2].count} \n \n ------------------------- \n Actions: eat, drink, heal \n ------------------------- \n \n Type 'r' to return \n`;
   (!isDebugging(myTamagotchi) && console.clear());
    rl.question(inventoryText, (menu) => {
        switch (menu.trim()) {
            case 'eat':
                if (myTamagotchi.inventory[0].count) {
                    inventoryItemsOperation('activate', 'food', myTamagotchi)
                    menuBack(rl, prevMenu, `You ate 1 🍏! Now food is:${myTamagotchi.food}`)
                } else {
                    menuBack(rl, prevMenu, `You don't have any 🍏 TˆT ...`)
                }
                break;
            case 'drink':
                if (myTamagotchi.inventory[1].count) {
                    inventoryItemsOperation('activate', 'water', myTamagotchi)
                    menuBack(rl, prevMenu, `You drink 1 🧃! Now water is:${myTamagotchi.water}`)
                } else {
                    menuBack(rl, prevMenu, `You don't have any 🧃 TˆT ...`)
                }
                break;
            case 'heal':
                if (myTamagotchi.inventory[2].count) {
                    inventoryItemsOperation('activate', 'hp', myTamagotchi)
                    menuBack(rl, prevMenu, `You healed with 1 💊 ! Now hp is:${myTamagotchi.hp}`)
                } else {
                    menuBack(rl, prevMenu, `You don't have any 💊 TˆT ...`)
                }
                break;
            case 'r':
                prevMenu()
                break;
            default: (() => {
                inventory(rl, prevMenu, inventoryText)
            })()
        }
    })
}