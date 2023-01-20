import { namesList} from "./data/names-list.js";

export const generateRandomInteger = (max) => {
    return Math.floor(Math.random() * max) + 1;
}

export function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
}

export const generateRandomName = () => namesList[generateRandomInteger(namesList.length - 1)];


//-1 to state because float number generating

const castle = `                           o                    
                       _---|         _ _ _ _ _ 
                    o   ---|     o   ]-I-I-I-[ 
   _ _ _ _ _ _  _---|      | _---|    \\ \` ' / 
   ]-I-I-I-I-[   ---|      |  ---|    |.   | 
    \\ \`   '_/       |     / \\    |    | /^\\| 
     [*]  __|       ^    / ^ \\   ^    | |*|| 
     |__   ,|      / \\  /    \`\\ / \\   | ===| 
  ___| ___ ,|__   /    /=_=_=_=\\   \\  |,  _|
  I_I__I_I__I_I  (====(_________)___|_|____|____
  \\-\\--|-|--/-/  |     I  [ ]__I I_I__|____I_I_| 
   |[]      '|   | []  |\`__  . [  \\-\\--|-|--/-/  
   |.   | |' |___|_____I___|___I___|---------| 
  / \\| []   .|_|-|_|-|-|_|-|_|-|_|-| []   [] | 
 <===>  |   .|-=-=-=-=-=-=-=-=-=-=-|   |    / \\  
 ] []|\`   [] ||.|.|.|.|.|.|.|.|.|.||-      <===> 
 ] []| \` |   |/////////\\\\\\\\\\\\\\\\\\\\.||__.  | |[] [ 
 <===>     ' ||||| |   |   | ||||.||  []   <===>
  \\T/  | |-- ||||| | O | O | ||||.|| . |'   \\T/ 
   |      . _||||| |   |   | ||||.|| |     | |
../|' v . | .|||||/____|____\\|||| /|. . | . ./
.|//\\............/...........\\........../../\\\\\\
`
