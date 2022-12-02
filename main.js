const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

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

//

const saveGame = () => {
    fs.writeFileSync('./data/character.json', JSON.stringify(myTamagotchi));
}
const deleteCharacter = () =>  {
    fs.writeFileSync('./data/character.json', '{}');
    for (const [key, _] of Object.entries(myTamagotchi)) {
        myTamagotchi.delField(key);
    }
}

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
    const createHealth = () => myTamagotchi.modifyField('hp',2 + generateRandomInteger(0))
    const createIntellect = () => myTamagotchi.modifyField('intellect', 90 + generateRandomInteger(10));
    const createStrength = () => myTamagotchi.modifyField('strength', 1 + generateRandomInteger(2));
    const createFood = () => myTamagotchi.modifyField('food', 1 + generateRandomInteger(0));
    const createWater = () => myTamagotchi.modifyField('water', 50 + generateRandomInteger(50));
    const createMoney = () => myTamagotchi.modifyField('money', 1 + generateRandomInteger(4));
    const createItems = () => myTamagotchi.modifyField('items', {'item1': 'test', 'item2': 'test'})
    const createAliveFlag = () => myTamagotchi.modifyField('alive', true);

    const initiateCreation = () => {

        const createOtherAndReturnToMenu = () => {
            createHealth();
            createIntellect();
            createStrength();
            createFood();
            createWater();
            createItems();
            createMoney();
            createAliveFlag();

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

// runs tamagotchi starving and thirst!

const copyTamagotchiToState = (tamagotchy) => {
    const tamagotchiCopy = JSON.parse(JSON.stringify(tamagotchy));
    for (const [key, _] of Object.entries(myTamagotchi)) {
        myTamagotchi.delField(key);
    }

    for (const [key, value] of Object.entries(tamagotchiCopy)) {
        myTamagotchi.modifyField(key, value);
    }
}

const characterExists = (tamagotchi) => tamagotchi.hasOwnProperty('gender');
const createRandomCharStateInterval = (key, tamagotchi) => tamagotchi.modifyField(key, generateRandomInteger(100));
const doesIntervalRunning = (key, tamagotchi) => tamagotchi.hasOwnProperty(key) && tamagotchi.key !== 0;
const deleteCharStateInterval = (key, tamagotchi) => tamagotchi.delField(key);
const delOnePoint = (key, tamagotchi) => tamagotchi.modifyField(key, tamagotchi[key] -= 1);
const characterIsDying = (tamagotchi) => tamagotchi.food === 0 || tamagotchi.water === 0;
const noHp = (tamagotchi) => tamagotchi.hp === 0;
const hasFood = (tamagotchi) => tamagotchi.food !== 0;

const startDying = (myTamagotchiOwn) => {

    const dyingDelay = 10000

    if (characterExists(myTamagotchiOwn)) {
        if (characterIsDying(myTamagotchiOwn)) {
            let timer_1 = setInterval(() => {
                delOnePoint('hp', myTamagotchiOwn)
                console.log(`Tamagochi is dying... HP is ${myTamagotchiOwn.hp}!`)
                if (noHp(myTamagotchiOwn)) {
                    deleteCharacter()
                    clearInterval(timer_1)
                    console.log('\n Tamagotchi is dead T_T \n || "*" ... RIP ... "*" || \n');
                    process.exit()
                }
            },dyingDelay)
        }
    }
}

const startStarving = (myTamagotchiOwn) => {

    deleteCharStateInterval('starvingDelay', myTamagotchiOwn);
    console.log(characterExists(myTamagotchiOwn))
    let timer_1 = setInterval(() => {
        if (hasFood(myTamagotchiOwn)) {
            if (characterExists(myTamagotchiOwn)) {
                if (!doesIntervalRunning('starvingDelay', myTamagotchiOwn) && hasFood(myTamagotchiOwn)) {
                    createRandomCharStateInterval('starvingDelay', myTamagotchiOwn);
                    copyTamagotchiToState(myTamagotchiOwn);
                    let timer_2 = setInterval(() => {
                        delOnePoint('starvingDelay', myTamagotchiOwn)
                        copyTamagotchiToState(myTamagotchiOwn);
                        if (characterIsDying(myTamagotchiOwn)) {
                            clearInterval(timer_2)
                        }
                    },1000)
                }
                if (myTamagotchiOwn.starvingDelay === 0 && hasFood(myTamagotchiOwn)) {
                    delOnePoint('food', myTamagotchiOwn);
                    copyTamagotchiToState(myTamagotchiOwn);
                    deleteCharStateInterval('starvingDelay', myTamagotchiOwn);
                    copyTamagotchiToState(myTamagotchiOwn);
                    createRandomCharStateInterval('starvingDelay', myTamagotchiOwn)
                    copyTamagotchiToState(myTamagotchiOwn);
                    console.log(`starving... food is ${myTamagotchiOwn.food}`)
                }
                if (!hasFood(myTamagotchiOwn)) {
                    startDying(myTamagotchiOwn);
                }
            }
        } else {
            clearInterval(timer_1)
        }
    },1000)


}

//

const showMenu = () => {
    console.clear()
    readline.question(`Main Menu \n 
    1. My tamagotchi
    ${!!myTamagotchi.money ? '2. Save Game (1 coin)': ''}
    
    cheats: cheatmoney (add 5 money); delchar (deletes character)
      \n Type menu number... \n`,
        menuFunctions)
};

const startGame = () => showMenu()

loadGame()
startStarving(myTamagotchi);
startGame();


// use stages of game for avaluabily of buying things
// add thirst