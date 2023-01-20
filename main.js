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

const logo = `
___________                                     __         .__    .__ 
\\__    ___/____    _____ _____     ____   _____/  |_  ____ |  |__ |__|
  |    |  \\__  \\  /     \\\\__  \\   / ___\\ /  _ \\   __\\/ ___\\|  |  \\|  |
  |    |   / __ \\|  Y Y  \\/ __ \\_/ /_/  >  <_> )  | \\  \\___|   Y  \\  |
  |____|  (____  /__|_|  (____  /\\___  / \\____/|__|  \\___  >___|  /__|
               \\/      \\/     \\//_____/                  \\/     \\/    
⣿⣿⣷⡁⢆⠈⠕⢕⢂⢕⢂⢕⢂⢔⢂⢕⢄⠂⣂⠂⠆⢂⢕⢂⢕⢂⢕⢂⢕⢂
⣿⣿⣿⡷⠊⡢⡹⣦⡑⢂⢕⢂⢕⢂⢕⢂⠕⠔⠌⠝⠛⠶⠶⢶⣦⣄⢂⢕⢂⢕
⣿⣿⠏⣠⣾⣦⡐⢌⢿⣷⣦⣅⡑⠕⠡⠐⢿⠿⣛⠟⠛⠛⠛⠛⠡⢷⡈⢂⢕⢂
⠟⣡⣾⣿⣿⣿⣿⣦⣑⠝⢿⣿⣿⣿⣿⣿⡵⢁⣤⣶⣶⣿⢿⢿⢿⡟⢻⣤⢑⢂
⣾⣿⣿⡿⢟⣛⣻⣿⣿⣿⣦⣬⣙⣻⣿⣿⣷⣿⣿⢟⢝⢕⢕⢕⢕⢽⣿⣿⣷⣔
⣿⣿⠵⠚⠉⢀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⢕⢕⢕⢕⢕⢕⣽⣿⣿⣿⣿
⢷⣂⣠⣴⣾⡿⡿⡻⡻⣿⣿⣴⣿⣿⣿⣿⣿⣿⣷⣵⣵⣵⣷⣿⣿⣿⣿⣿⣿⡿
⢌⠻⣿⡿⡫⡪⡪⡪⡪⣺⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⠣⡁⠹⡪⡪⡪⡪⣪⣾⣿⣿⣿⣿⠋⠐⢉⢍⢄⢌⠻⣿⣿⣿⣿⣿⣿⣿⣿⠏⠈
⡣⡘⢄⠙⣾⣾⣾⣿⣿⣿⣿⣿⣿⡀⢐⢕⢕⢕⢕⢕⡘⣿⣿⣿⣿⣿⣿⠏⠠⠈
⠌⢊⢂⢣⠹⣿⣿⣿⣿⣿⣿⣿⣿⣧⢐⢕⢕⢕⢕⢕⢅⣿⣿⣿⣿⡿⢋⢜⠠⠈
⠄⠁⠕⢝⡢⠈⠻⣿⣿⣿⣿⣿⣿⣿⣷⣕⣑⣑⣑⣵⣿⣿⣿⡿⢋⢔⢕⣿⠠⠈
⠨⡂⡀⢑⢕⡅⠂⠄⠉⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⢔⢕⢕⣿⣿⠠⠈
⠄⠪⣂⠁⢕⠆⠄⠂⠄⠁⡀⠂⡀⠄⢈⠉⢍⢛⢛⢛⢋⢔⢕⢕⢕⣽⣿⣿⠠⠈
                                ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠉⠉⠛⠻⢿⣿⠿⠛⠋⠁⠈⠙
                                ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠴⣿⠟⠉⠀⠀⠈⡀⠀⠀⠀⠀⠀⠀
                                ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⣾⣿⣿⣿⣿⣿⠿⠿⠿⠛⠛⠉⠉⠀⠀⠀⠀⠀⠀⠀⠉⢁⠀⠀⠈⠀⠀⠀⠀⢀⡇⠀⠀⠀⠀⠀⠀
                                ⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⣀⣿⠿⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡀⠀⠀⠀⢀⣠⣾⣿⠀⠀⠐⢦⡀⠀
                                ⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⣠⡾⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⠿⠿⠟⠛⠋⢷⣄⠀⠀⠹⣦
                                ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠛⠛⠛⠛⠯⠶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣷⣤⡀⠘
                                ⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠉⠑⠢⣀⠈⠢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣷
                                ⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠀⠀⡇⠀⠀⠀⣀⠄⠒⠀⠀⠀⠀⠀⠑⠢⡙⡳⣄⠀⠀⠀⠈⠀⠀⠀⠀⠈⠻⣿
                                ⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡆⠀⠃⢀⡴⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠱⠈⠳⡄⠀⠀⠀⢂⠀⠀⠀⠀⠘
                                ⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣾⡀⢐⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣴⡀⠁⠀⠙⢦⠀⠀⠈⣧⡀⠀⠀⠀
                                ⣿⣿⣿⠃⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⠳⡈⡀⠀⠀⠀⠀⠀⢀⣤⣶⣿⡿⠿⠽⠿⠿⣿⣷⣶⣌⡳⡀⠀⢹⣷⡄⠀⠀
                                ⣿⡟⠁⠀⠀⠀⠀⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠑⢥⠀⠀⡾⠋⣰⡿⡟⠊⠀⠚⣿⣿⣿⣶⣄⠀⠉⢹⠀⢳⠀⢸⣿⣿⡄⠀
                                ⣿⠇⠀⠀⠀⠀⠀⢹⣇⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠘⡄⠀⠈⠀⠈⠀⠰⢻⠋⠀⣀⣀⣠⣿⣿⣿⣿⣿⣇⠀⠈⠀⠀⢃⢘⡏⢿⣿⡄
                                ⡿⠀⠀⠀⠀⠀⠀⣿⠈⠣⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢃⠀⠀⠀⠀⠀⠀⠋⠀⠀⢿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠘⣼⡇⠈⢿⣿
                                ⡇⠀⠀⠀⠀⡆⠀⣿⠀⠀⡨⠂⠄⡀⠀⠀⠀⠠⣀⠀⠀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠈⣿
                                ⡇⠀⠀⠀⠀⠀⠀⢸⠀⣐⠊⠀⠀⠀⢉⠶⠶⢂⠈⠙⠒⠂⠠⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⠀⠸
                                ⠀⣀⠂⢣⡀⠀⠀⠘⣠⠃⠀⠀⠀⠀⣠⣴⣾⠷⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                ⡀⡙⠀⠈⢧⠀⠡⡀⢉⠀⠀⠀⠀⣴⣿⡫⣋⣥⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                ⡗⠃⠐⠀⠈⣷⡀⢳⡄⠂⠀⠀⣸⣿⡛⠑⠛⢿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                ⡇⡀⠂⡀⠀⣸⢱⡈⠇⠐⠄⡠⣿⡟⠁⠀⠀⣸⣿⣿⣿⡟⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                ⣿⡐⡀⠀⢠⠏⠀⢳⡘⡄⠈⠀⢿⡿⠀⢻⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                ⣿⣧⠐⢀⡏⠀⠀⠀⢳⡴⡀⠀⢸⣿⡄⠀⠉⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣶⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                ⣿⣿⣆⠀⠐⡀⠀⠀⠀⢻⣷⡀⠀⠃⠙⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
                                ⣿⣿⣿⣆⠀⠙⣄⠀⠀⠀⠱⣕⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴
                                ⣿⣿⣿⣿⣧⡀⠘⢦⡀⠀⠀⠈⢢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿
                                ⣿⣿⣿⣿⣿⣷⢄⠈⠻⣆⠀⠀⠀⠑⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⣿
`;

loadGame();

startStarving (myTamagotchi);
startThirsting(myTamagotchi);
startSleepingProcess(myTamagotchi);
backToZeroPoint('dyingProcess', myTamagotchi);
backToZeroPoint('updateStatsProcess', myTamagotchi);
startDying(myTamagotchi);
startLvlGain(myTamagotchi);
console.log(logo);

setTimeout(() => {
    startGame();
}, 3000)
// startGame();