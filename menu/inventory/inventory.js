import { myTamagotchi } from "../../state.js";
import { inventoryItemsOperation } from "./inventory-items-operation.js";
import {menuFunctions} from "../show-menu.js";
import {characterHasFull} from "../../locators.js";

const inventoryText = () => {
    console.clear();
    console.log(`Your inventory:\n \n 🍏: ${myTamagotchi.inventory[0].count} 🧃: ${myTamagotchi.inventory[1].count} 💊: ${myTamagotchi.inventory[2].count} \n \n ------------------------- \n Actions: e-eat, d-drink, h-heal \n ------------------------- \n \n Type 'r' to return \n`);
}


export const inventory = (prevMenu) => {
    inventoryText()
    // rl.question('', (menu) => {
        const stdinListener = (data) => {
        const inventoryItem = (num) => myTamagotchi.inventory[num].count;
            switch (data.toString()) {
                case 'e':
                    if (inventoryItem(0)) {
                        if (characterHasFull('food', myTamagotchi)) {
                            inventoryText();
                            console.log(`You don't need 🍏 ;)`);
                        } else {
                            inventoryItemsOperation('activate', 'food', myTamagotchi);
                            inventoryText();
                            console.log(`You eat 1 🍏! Now food is:${myTamagotchi.food}`);
                        }

                    } else {
                        inventoryText();
                        console.log(`You don't have any 🍏 TˆT ...`);
                    }
                    break;
                case 'd':
                    if (inventoryItem(1)) {
                        if (characterHasFull('water', myTamagotchi)) {
                            inventoryText();
                            console.log(`You don't need 🧃 ;)`);
                        } else {
                            inventoryItemsOperation('activate', 'water', myTamagotchi);
                            inventoryText();
                            console.log(`You drink 1 🧃! Now water is:${myTamagotchi.water}`);
                        }
                    } else {
                        inventoryText();
                        console.log(`You don't have any 🧃 TˆT ...`);
                    }
                    break;
                case 'h':
                    if (inventoryItem(2)) {
                        if (characterHasFull('hp', myTamagotchi)) {
                            inventoryText();
                            console.log(`You don't need 💊 ;)`);
                        } else {
                            inventoryItemsOperation('activate', 'hp', myTamagotchi);
                            inventoryText();
                            console.log(`You heal with 1 💊! Now hp is:${myTamagotchi.hp}`);
                        }
                    } else {
                       inventoryText();
                       console.log(`You don't have any 💊 TˆT ...`);
                    }
                    break;
                case 'r':
                    process.stdin.off('data', stdinListener);
                    prevMenu()
                    break;
                default:
                    inventoryText();
            }
        }
    process.stdin.on('data', stdinListener);
    // })
}