import { myTamagotchi } from "../../state.js";

export const numberOf = (itemName) => myTamagotchi.arenaItems.indexOf(itemName) !== -1 ?
    [].concat(...myTamagotchi.arenaItems).filter(item => item === itemName).length : 0;

export const hasItem = (itemName) => myTamagotchi.arenaItems.indexOf(itemName) !== -1;

export const addArenaItem = (itemName) => {
    const { arenaItems } = myTamagotchi;
    arenaItems.push(itemName);
};

export const givePrise = (myPrise, myPriseQuantity, myExp) => {
    switch (myPrise) {
        case 'money':
            myTamagotchi.money += myPriseQuantity;
            break;
        case 'MegaCrit':
            addArenaItem(myPrise);
            break;
        default:
            // fairPrise if > 10
            myTamagotchi.inventory.forEach((item) => {
                if (item.type === myPrise) {
                    if (item.count + myPriseQuantity > 10) {
                        item.count = 10
                    } else {
                        item.count += myPriseQuantity
                    }
                }
            })
    }
    myTamagotchi.modifyField('exp', myTamagotchi.exp + myExp)
}