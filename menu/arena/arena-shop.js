import { myTamagotchi } from "../../state.js";
import { numberOf } from "./utils.js";

const addArenaItem = (itemName) => {
    const { arenaItems } = myTamagotchi;
    arenaItems.push(itemName);
};

const showArenaShopText = () => {
console.log(`Arena Shop:\n \n Press any number to buy...\n \n 
    
Money ====> ${myTamagotchi.money} <====
MegaCrits: ${numberOf('MegaCrit')}

-------------------------
1 - MegaCrit (cost 5)
-------------------------
Type 'r' to return \n
`);
}

export const arenaShop = (prevMenu) => {
    console.clear()
    showArenaShopText()

    const stdinListener = (data) => {

        switch (data.toString()) {
            case '1':
                console.clear()

                if (myTamagotchi.money - 5 >= 0) {
                    myTamagotchi.modifyField('money', myTamagotchi.money - 5)
                    addArenaItem('MegaCrit');
                    showArenaShopText()
                    console.log('+ 1 MegaCrit')
                } else {
                    showArenaShopText()
                    console.log(`You don't have enough money!`)
                }
                break;
            case 'r':
                process.stdin.off('data', stdinListener);
                prevMenu();

                break;
            default:
                console.clear();
                showArenaShopText();
        }
    }

    process.stdin.on('data', stdinListener);
}