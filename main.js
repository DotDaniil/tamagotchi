const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

const rawCharacterData = fs.readFileSync('./data/character.json');
const characterData = JSON.parse(rawCharacterData)

class State {
    constructor(state) {
        this.state = state;
    }
    modifyField(label, value) {
        this[`${label}`] = value;
    }
    delField(label) {
        delete this[`${label}`]
    }
}

let myTamagotchi = new State('tamagotchi');


//state operations

const deleteMoney = (amount) => myTamagotchi.modifyField('money', myTamagotchi.money - amount)
const addMoney = (amount) => myTamagotchi.modifyField('money', myTamagotchi.money + amount)
const loadGame = () => {
    const loadedData = JSON.parse(fs.readFileSync('./data/character.json'));
    for (const [key, value] of Object.entries(loadedData)) {
        myTamagotchi.modifyField(key, value);
    }
}
const saveGame = () => fs.writeFileSync('./data/character.json', JSON.stringify(myTamagotchi));
const deleteCharacter = () =>  {
    fs.writeFileSync('./data/character.json', '{}');
    for (const [key, value] of Object.entries(myTamagotchi)) {
        myTamagotchi.delField(key);
    }
}

//
loadGame()

const menuBack = (prevMenu, prevText) => {
    console.clear();
    console.log(prevText)
    readline.question('\n Type `r` to return: \n', (menu) => {
        switch (menu.trim()) {
            case 'r':
                prevMenu()
                break;
            default: (() => {
                menuBack(prevMenu, prevText)
            })()
        }
    })
}

const createNewTamagotchi = () => {
    console.clear();
    function generateRandomInteger(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    const askName = (nextFunction) => readline.question('\n Enter tamagotchi name: \n', (name) => {
        myTamagotchi.modifyField('name', name);
        nextFunction()
    })

    const askGender = (nextFunction, failed) => readline.question(failed ? ('\n Please, type m or f: \n ') : ('\n Is tomagotchi male (m) or female (f)? : \n'), (gender) => {
        if (gender === 'f' || gender === 'm') {
            myTamagotchi.modifyField('gender', gender);
        } else {
            askGender(() => nextFunction(() => nextFunction),true);
        }
        nextFunction()
    })
    const createHealth = () => myTamagotchi.modifyField('hp',90 + generateRandomInteger(10))
    const createIntellect = () => myTamagotchi.modifyField('intellect', 90 + generateRandomInteger(10));
    const createStrength = () => myTamagotchi.modifyField('strength', 1 + generateRandomInteger(2));
    const createFood = () => myTamagotchi.modifyField('food', 50 + generateRandomInteger(50));
    const createWater = () => myTamagotchi.modifyField('water', 50 + generateRandomInteger(50));
    const createMoney = () => myTamagotchi.modifyField('money', 1 + generateRandomInteger(4));
    const createItems = () => myTamagotchi.modifyField('items', {'item1': 'test', 'item2': 'test'})

    const initiateCreation = () => {

        const createOtherAndReturnToMenu = () => {
            createHealth();
            createIntellect();
            createStrength();
            createFood();
            createWater();
            createItems();
            createMoney();

            showMenu();
        }

        askName(() => askGender(() => createOtherAndReturnToMenu()))
    }

    initiateCreation();

}


const menuFunctions = (input) => {
    const neverWillBeTyped = 'This Game Was Made By Daniil Tikhonov'
    const why_do_i_have_case_2 = `${!!myTamagotchi.money ? '2' : neverWillBeTyped}`;

        switch (input.trim()) {
            case '1':
                const menuPart = `Your tamagotchi: \n ${JSON.stringify(myTamagotchi)}`;
                myTamagotchi.hasOwnProperty('name') ? console.log(menuPart) : createNewTamagotchi()
                menuBack(showMenu, menuPart)
                break;
            case why_do_i_have_case_2:
                deleteMoney(1);
                saveGame();
                menuBack(showMenu,`Game saved! Money left: ${myTamagotchi.money} coins`)
                break;
            case `cheatmoney`:
                addMoney(5);
                menuBack(showMenu, 'Money Added!')
                break;
            case `delchar`:
                deleteCharacter();
                menuBack(showMenu, 'Character deleted!')
                break;
            default: (() => {
                showMenu()
            })()
        }
}

const showMenu = () => {
    console.clear()
    readline.question(`Main Menu \n 
    1. My tamagotchi
    ${!!myTamagotchi.money ? '2. Save Game (1 coin)': ''}
    
    cheats: cheatmoney (add 5 money); delchar (deletes character)
      \n Type menu number... \n`,
        menuFunctions)
};

startGame = () => showMenu()

startGame();


// save in data json with readline exit
// timers at the top of whole this functional that r gonna to count - water - food;
// use stages of game for avaluabily of buying things