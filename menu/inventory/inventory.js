import { isDebugging } from "../../locators.js";
import { myTamagotchi } from "../../state.js";
import { menuBack}  from "../menu-back.js";
import { inventoryItemsOperation } from "./inventory-items-operation.js";

export const inventory = (rl, prevMenu) => {
    const inventoryText = `Your inventory:\n \n ${'Apple pie: (testAmount) Water bottle: (testAmount) Healing poison: (testAmount)'} \n \n Actions: eat, drink, heal \n Type 'r' to return \n`;
   (!isDebugging(myTamagotchi) && console.clear());
    rl.question(inventoryText, (menu) => {
        switch (menu.trim()) {
            case 'eat':
                inventoryItemsOperation('activate', 'food', myTamagotchi)
                menuBack(rl, prevMenu, `You ate 1 Apple pie! Now food is:${myTamagotchi.food}`)
                break;
            case 'drink':
                inventoryItemsOperation('activate', 'water', myTamagotchi)
                menuBack(rl, prevMenu, `You drink 1 Water bottle! Now water is:${myTamagotchi.water}`)
                break;
            case 'heal':
                inventoryItemsOperation('activate', 'hp', myTamagotchi)
                menuBack(rl, prevMenu, `You healed with 1 Healing poison ! Now hp is:${myTamagotchi.hp}`)
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