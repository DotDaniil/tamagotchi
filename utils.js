const generateRandomInteger = (max) => {
    return Math.floor(Math.random() * max) + 1;
}

module.exports = { generateRandomInteger };

//-1 to state because float number generating