import { generateRandomInteger } from "../../utils.js";
import { characterAddFood } from "../../state-operations.js";
//'inventory', [ {type: 'food', count: 5}, {type: 'water', count: 5}, {type: 'hp', count: 5} ]
export const inventoryItemsOperation = (action, itemType, character, numberToDel) => {
    const pointToAdd = 10 + generateRandomInteger(20)

    switch (action) {
        case 'activate':
            let exists = false;
            character.inventory.forEach((item) => {
                if (item.type === itemType) {
                    item.count -= 1
                    exists = true;
                }
            })
            if (exists) character.modifyField(itemType, character[`${itemType}`] + pointToAdd)
            break;
        case 'add':
            character.inventory.forEach((item) => {
                if (item.type === itemType) {
                    item.count += numberToDel
                }
            })
            break;
    }
}