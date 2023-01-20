import {generateRandomInteger, randomInteger} from "../utils.js";
import {menuBack} from "./menu-back.js";
import {myTamagotchi} from "../state.js";
import {givePrise} from "./arena/utils.js";

const earnSomethingText = (stringGameState, stringGameCursos) => {
    console.clear()
    console.log('Choose a box:')
    console.log(stringGameState.join(''));
    console.log(stringGameCursos);
    console.log('\n Type `r` to return: \n');
}


export const earnSomethingGame = (prevMenu) => {

    const prises = ['hp', 'food', 'water', 'money', 'MegaCrit'];
    const myPrise = prises[Math.floor(Math.random() * prises.length)];
    const myExp = generateRandomInteger(20);
    const myPriseQuantity = 1 + generateRandomInteger(4)
    const arr = ['ㅤ','ㅤ','ㅤ','ㅤ','ㅤ','ㅤ','ㅤ','ㅤ','ㅤ','ㅤ'];
    const atPosition = randomInteger(0, 9);
    const newArr = [...arr.slice(0, atPosition), "🍎", ...arr.slice(atPosition, 9)]
    let emojiString = ['📦','📦','📦','📦','📦','📦','📦','📦','📦','📦'];
    const gameStateString = (pos) => [...emojiString.slice(0, pos), newArr[pos], ...emojiString.slice(pos + 1, 10)];

    let startGameCounter = 0;
    let lives = 3;
    let win = false;
    let posCounter = 0;
    const emptyEmoji = 'ㅤ'
    const cursorString = (pos) => emptyEmoji.repeat(emojiString.slice(0, pos).length) + `⬆` + emptyEmoji.repeat(emojiString.slice(pos, 9).length);
    earnSomethingText(emojiString, cursorString(0));
    console.log('🗡️',' X',lives);

    const stdinListener = (data) => {
        switch (data.toString()) {
            case 'a':
                if (posCounter !== 0) {
                    posCounter--;
                }
                earnSomethingText(emojiString, cursorString(posCounter));
                console.log('🗡️',' X',lives)
                break;
            case 'd':
                if (posCounter !== 9) {
                    posCounter++;
                }
                earnSomethingText(emojiString, cursorString(posCounter));
                console.log('🗡️',' X',lives);
                break;
            case 'w':
                startGameCounter++;
                if (newArr[posCounter] === "🍎") {
                    emojiString = gameStateString(posCounter);
                    earnSomethingText(emojiString, cursorString(posCounter));
                    console.log('🗡️',' X',lives);
                    if (!!win) {
                        givePrise(myPrise, myPriseQuantity, myExp + 80);
                        process.stdin.off('data', stdinListener);
                        prevMenu();
                    }
                    console.log(`YOU WON ${myExp + 80}xp ${myPrise !== 'MegaCrit' ? `and ${myPriseQuantity} ${myPrise}`: `1 ${myPrise}`}, TAP "W" TO GRAB!`);
                    win = true;
                    break;
                }
                if (lives !== 1) {
                    lives--;
                    emojiString = gameStateString(posCounter);
                    earnSomethingText(emojiString, cursorString(posCounter));
                    console.log('🗡️',' X',lives);
                } else {
                    myTamagotchi.modifyField('exp',myTamagotchi.exp + myExp)
                    process.stdin.off('data', stdinListener);
                    prevMenu();
                    break;
                }
                break;
            case 'r':
                process.stdin.off('data', stdinListener);
                prevMenu();
                break;
            default:
                earnSomethingText(emojiString, cursorString(posCounter));
                console.log('🗡️',' X',lives);
        }
    }
    process.stdin.on('data', stdinListener);
}