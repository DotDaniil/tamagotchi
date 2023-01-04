import { myTamagotchi } from './state.js';

import { backToZeroPoint } from './state-operations.js';
import { startStarving } from './mechanics/starving.js';
import { startThirsting } from "./mechanics/thirsting.js";
import { startDying } from "./mechanics/dying.js";
import { startGame } from "./menu/show-menu.js";
import { loadGame } from "./menu/save-load.js";
import readline from "readline";
import { stdin as input, stdout as output } from "node:process";
import {startLvlGain} from "./mechanics/lvl-gaing.js";
import {startSleepingProcess} from "./mechanics/sleeping.js";
export const rl = readline.createInterface({ input, output });


loadGame();

startStarving (myTamagotchi);
startThirsting(myTamagotchi);
startSleepingProcess(myTamagotchi);
backToZeroPoint('dyingProcess', myTamagotchi);
backToZeroPoint('updateStatsProcess', myTamagotchi);
startDying(myTamagotchi);
startLvlGain(myTamagotchi);
startGame();






// use stages of game for avaluabily of buying things
// restore delay after load char ??
// change the menu for smiles as a shop item
// tamagotchi can't die of starving or thirsting when fighting!
// -1 points food, hp, money, when character