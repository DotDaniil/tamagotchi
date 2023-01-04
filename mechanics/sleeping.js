import {characterExists, characterHasFullFood, characterIsSleeping} from "../locators.js";
import {copyCharacterToState} from "../state-operations.js";
import {myTamagotchi} from "../state.js";

export const sleepingImg = `
(。-ω-)💤 (。-ω-)💤 (。-ω-)💤 (。-ω-)💤 
    
    ⠀   ⠀⠀⠀⠀⠀⠀⠀⠀    ＿＿＿
    　   　　　　／＞　　  フ
    　   　　　　| 　_　 _ l
    　    　　　／\\\` ミ＿xノ
    　   　 　 /　　　 　 |
    　   　　 /　 ヽ　　 ﾉ
    　    　 │　　|　|　|
    　   ／￣|　　 |　|　|
       　| (￣ヽ＿_ヽ_)__)
         ＼二つ


(。-ω-)💤 (。-ω-)💤 (。-ω-)💤 (。-ω-)💤 
`;

export const startSleepingProcess = (temporaryCharacter) => {

        let sleeping_interval = setInterval(() => {

            if (characterExists(temporaryCharacter)) {
                if (characterIsSleeping(temporaryCharacter)) {
                    if (temporaryCharacter.hp < 100) {
                        temporaryCharacter.modifyField('hp', temporaryCharacter.hp += Math.round(Math.random()));
                        copyCharacterToState(temporaryCharacter, myTamagotchi);
                        console.clear();
                        console.log(sleepingImg);
                        console.log('\n Type `r` to return: \n');
                        console.log(`${myTamagotchi.name} is sleeping and restoring. Hp: ${myTamagotchi.hp}.💤 .💤 .💤 `);
                        console.log(`🍏: ${myTamagotchi.food}`);
                        console.log(`💧: ${myTamagotchi.water}`);
                    } else {
                        console.clear();
                        console.log(sleepingImg);
                        console.log('\n Type `r` to return: \n');
                        console.log(`${myTamagotchi.name} has fully restored! Hp:${myTamagotchi.hp}`);
                        console.log(`🍏: ${myTamagotchi.food}`);
                        console.log(`💧: ${myTamagotchi.water}`);
                    }
                }
            }


        },10000)
}