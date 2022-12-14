import {characterExists, characterHasFullFood, characterIsSleeping} from "../locators.js";
import {copyCharacterToState} from "../state-operations.js";
import {myTamagotchi} from "../state.js";

export const sleepingImg = `
(γ-Ο-)π€ (γ-Ο-)π€ (γ-Ο-)π€ (γ-Ο-)π€ 
    
    β    β β β β β β β β     οΌΏοΌΏοΌΏ
    γ   γγγγοΌοΌγγ  γ
    γ   γγγγ| γ_γ _ l
    γ    γγγοΌ\\\` γοΌΏxγ
    γ   γ γ /γγγ γ |
    γ   γγ /γ γ½γγ οΎ
    γ    γ βγγ|γ|γ|
    γ   οΌοΏ£|γγ |γ|γ|
       γ| (οΏ£γ½οΌΏ_γ½_)__)
         οΌΌδΊγ€


(γ-Ο-)π€ (γ-Ο-)π€ (γ-Ο-)π€ (γ-Ο-)π€ 
`;

export const startSleepingProcess = (temporaryCharacter) => {

        let sleeping_interval = setInterval(() => {

            if (characterExists(temporaryCharacter)) {
                if (characterIsSleeping(temporaryCharacter)) {
                    if (temporaryCharacter.food < 2) {
                        temporaryCharacter.modifyField('food', 1)
                        copyCharacterToState(temporaryCharacter, myTamagotchi);
                    }
                    if (temporaryCharacter.hp < 100) {
                        temporaryCharacter.modifyField('hp', temporaryCharacter.hp += Math.round(Math.random()));
                        copyCharacterToState(temporaryCharacter, myTamagotchi);
                        console.clear();
                        console.log(sleepingImg);
                        console.log('\n Type `r` to return: \n');
                        console.log(`${myTamagotchi.name} is sleeping and restoring. Hp: ${myTamagotchi.hp}.π€ .π€ .π€ `);
                        console.log(`π: ${myTamagotchi.food}`);
                        console.log(`π§: ${myTamagotchi.water}`);
                    } else {
                        console.clear();
                        console.log(sleepingImg);
                        console.log('\n Type `r` to return: \n');
                        console.log(`${myTamagotchi.name} has fully restored! Hp:${myTamagotchi.hp}`);
                        console.log(`π: ${myTamagotchi.food}`);
                        console.log(`π§: ${myTamagotchi.water}`);
                    }
                }
            }


        },10000)
}