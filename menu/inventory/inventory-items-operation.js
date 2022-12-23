import { generateRandomInteger } from "../../utils.js";
export const inventoryItemsOperation = (action, itemType, character, numberToAdd) => {
    const pointToAdd = 10 + generateRandomInteger(20)

    switch (action) {
        case 'activate':
            character.inventory.forEach((item) => {
                if (item.type === itemType && item.count > 0) {
                    item.count -= 1
                }
            })
            if (character[`${itemType}`] + pointToAdd < 100) {
                character.modifyField(itemType, character[`${itemType}`] + pointToAdd)
            } else {
                character.modifyField(itemType, 100)
            }

            break;
        case 'add':
            character.inventory.forEach((item) => {
                if (item.type === itemType) {
                    item.count += numberToAdd
                }
            })
            break;
        case 'fairItem':
            character.inventory.forEach((item) => {
                if (item.type === itemType) {
                    item.count = 10
                }
            })
            break;
    }
}