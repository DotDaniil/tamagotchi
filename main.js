import { myTamagotchi } from './state.js';

import { backToZeroPoint } from './state-operations.js';
import { startStarving } from './mechanics/starving.js';
import { startThirsting } from "./mechanics/thirsting.js";
import { startDying } from "./mechanics/dying.js";
import { startGame } from "./menu/show-menu.js";
import { loadGame } from "./menu/save-load.js";

loadGame();

startStarving(myTamagotchi);
startThirsting(myTamagotchi);
backToZeroPoint('dyingProcess', myTamagotchi);
backToZeroPoint('updateStatsProcess', myTamagotchi);
startDying(myTamagotchi);

startGame();






// use stages of game for avaluabily of buying things
// killing process state handling
// restore delay after load char ??
// delete duplicates of starving and thirsting func when restore func (items) wll be added
// fix menu bug ?? if menu is big it's good